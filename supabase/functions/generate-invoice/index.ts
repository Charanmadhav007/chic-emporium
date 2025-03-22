
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.1';
import PDFDocument from 'npm:pdfkit@0.14.0';
import { Readable } from 'npm:stream';
import { Resend } from 'npm:resend@3.1.0';

// Initialize Resend
const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function generatePDF(orderId: string): Promise<Uint8Array> {
  // Get order details
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();
    
  if (orderError) throw orderError;
  
  // Get order items
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);
    
  if (itemsError) throw itemsError;
  
  // Get user details
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', order.user_id)
    .single();
    
  if (profileError) throw profileError;
  
  // Generate PDF
  const doc = new PDFDocument({
    margin: 50,
    size: 'A4',
  });
  
  // Collect PDF chunks
  const chunks: Uint8Array[] = [];
  doc.on('data', (chunk) => chunks.push(chunk));
  
  // Add invoice content
  // Header
  doc.fontSize(25).text('INVOICE', { align: 'center' });
  doc.moveDown();
  
  // Invoice info
  const date = new Date(order.created_at);
  const formattedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  doc.fontSize(12);
  doc.text(`Invoice Number: INV-${orderId.substring(0, 8)}`, { align: 'right' });
  doc.text(`Date: ${formattedDate}`, { align: 'right' });
  doc.moveDown(2);
  
  // Customer info
  doc.text('Bill To:', { underline: true });
  doc.text(profile.full_name || 'Customer');
  doc.text(profile.email);
  if (profile.address) doc.text(profile.address);
  doc.moveDown(2);
  
  // Items table
  doc.text('Items', { underline: true });
  doc.moveDown();
  
  // Table headers
  const tableTop = doc.y;
  const itemX = 50;
  const descriptionX = 150;
  const quantityX = 280;
  const priceX = 350;
  const amountX = 450;
  
  doc.text('Item', itemX, tableTop);
  doc.text('Description', descriptionX, tableTop);
  doc.text('Qty', quantityX, tableTop);
  doc.text('Price', priceX, tableTop);
  doc.text('Amount', amountX, tableTop);
  
  doc.moveDown();
  let tableY = doc.y;
  
  // Table rows
  items.forEach((item, i) => {
    const y = tableY + (i * 20);
    doc.text(`#${i + 1}`, itemX, y);
    doc.text(item.product_name, descriptionX, y);
    doc.text(item.quantity.toString(), quantityX, y);
    doc.text(`Rs ${item.price.toFixed(2)}`, priceX, y);
    doc.text(`Rs ${(item.price * item.quantity).toFixed(2)}`, amountX, y);
  });
  
  doc.moveDown(items.length + 2);
  
  // Summary
  const summaryY = doc.y;
  doc.text('Subtotal:', 350, summaryY);
  
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  doc.text(`Rs ${subtotal.toFixed(2)}`, 450, summaryY);
  
  doc.text('Shipping:', 350, summaryY + 20);
  doc.text(`Rs 15.00`, 450, summaryY + 20);
  
  doc.text('Total:', 350, summaryY + 40, { bold: true });
  doc.text(`Rs ${order.total.toFixed(2)}`, 450, summaryY + 40, { bold: true });
  
  // Footer
  doc.moveDown(5);
  doc.fontSize(10).text('Thank you for your business!', { align: 'center' });
  
  // End the document
  doc.end();
  
  // Wait for all chunks and concat them
  return new Promise((resolve) => {
    doc.on('end', () => {
      const pdfBuffer = new Uint8Array(Buffer.concat(chunks));
      resolve(pdfBuffer);
    });
  });
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { orderId, email } = await req.json();
    
    if (!orderId || !email) {
      return new Response(
        JSON.stringify({ error: 'Order ID and email are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
    
    // Generate PDF invoice
    const pdfBuffer = await generatePDF(orderId);
    
    // Convert to base64
    const pdfBase64 = btoa(
      Array.from(pdfBuffer)
        .map(byte => String.fromCharCode(byte))
        .join('')
    );
    
    // Send email with PDF attachment
    const { data, error } = await resend.emails.send({
      from: 'MenFashion <onboarding@resend.dev>',
      to: [email],
      subject: 'Your Order Invoice',
      html: `
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been successfully processed. Please find your invoice attached.</p>
        <p>Order ID: ${orderId.substring(0, 8)}</p>
        <p>If you have any questions, please contact our customer support.</p>
      `,
      attachments: [
        {
          filename: `invoice-${orderId.substring(0, 8)}.pdf`,
          content: pdfBase64,
        },
      ],
    });
    
    if (error) throw error;
    
    return new Response(
      JSON.stringify({ success: true, message: 'Invoice generated and sent' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
});
