
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, User, Home, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomButton from '@/components/ui/CustomButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Navigate } from 'react-router-dom';

// This is a demo cart for now
const cartItems = [
  {
    id: 1,
    name: "Classic Oxford Shirt",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quantity: 1
  },
  {
    id: 6,
    name: "Chelsea Boots",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quantity: 1
  }
];

const Checkout: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 15.00;
  const total = subtotal + shipping;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('card')) {
      setPaymentInfo(prev => ({ ...prev, [name]: value }));
    } else {
      setBillingInfo(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      try {
        // Create order in database
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user.id,
            total: total,
            billing_address: `${billingInfo.address}, ${billingInfo.city}, ${billingInfo.state}, ${billingInfo.zipCode}`,
            shipping_address: `${billingInfo.address}, ${billingInfo.city}, ${billingInfo.state}, ${billingInfo.zipCode}`,
          })
          .select()
          .single();
          
        if (orderError) throw orderError;
        
        // Add order items
        const orderItems = cartItems.map(item => ({
          order_id: order.id,
          product_id: item.id,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity,
        }));
        
        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);
          
        if (itemsError) throw itemsError;
        
        // Generate PDF invoice
        const { error: invoiceError } = await supabase.functions.invoke('generate-invoice', {
          body: {
            orderId: order.id,
            email: user.email,
          },
        });
        
        if (invoiceError) throw invoiceError;
        
        toast({
          title: "Payment successful!",
          description: "Your order has been placed and an invoice has been sent to your email.",
        });
        
        navigate('/order-confirmation', { state: { orderId: order.id } });
      } catch (error: any) {
        console.error('Error processing order:', error);
        toast({
          title: "Error processing payment",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="content-container py-12">
          <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Billing Information */}
                <div className="glass-morphism rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <User className="h-5 w-5 mr-2 text-primary" />
                    <h2 className="text-xl font-medium">Billing Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={billingInfo.name} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={billingInfo.email} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={billingInfo.address} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        value={billingInfo.city} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          name="state" 
                          value={billingInfo.state} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input 
                          id="zipCode" 
                          name="zipCode" 
                          value={billingInfo.zipCode} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Information */}
                <div className="glass-morphism rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    <h2 className="text-xl font-medium">Payment Method</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        name="cardNumber" 
                        value={paymentInfo.cardNumber} 
                        onChange={handleChange} 
                        placeholder="1234 5678 9012 3456" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input 
                        id="cardName" 
                        name="cardName" 
                        value={paymentInfo.cardName} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input 
                          id="expiryDate" 
                          name="expiryDate" 
                          value={paymentInfo.expiryDate} 
                          onChange={handleChange} 
                          placeholder="MM/YY" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          name="cvv" 
                          value={paymentInfo.cvv} 
                          onChange={handleChange} 
                          placeholder="123" 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <CustomButton 
                  type="submit" 
                  className="w-full md:w-auto" 
                  size="lg"
                  isLoading={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Complete Payment'}
                </CustomButton>
              </form>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="glass-morphism rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                <div className="divide-y divide-border">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-3 flex gap-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-muted">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                          <span>Rs {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>Rs {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Rs {shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>Rs {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
