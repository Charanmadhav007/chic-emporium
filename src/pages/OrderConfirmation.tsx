
import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomButton from '@/components/ui/CustomButton';
import { useAuth } from '@/contexts/AuthContext';

const OrderConfirmation: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const orderId = location.state?.orderId;
  
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
  
  if (!orderId) {
    return <Navigate to="/shop" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="content-container py-12">
          <div className="max-w-2xl mx-auto glass-morphism rounded-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-display font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">Thank you for your purchase. Your order has been processed successfully.</p>
            
            <div className="border border-border rounded-md p-4 mb-6">
              <div className="font-medium">Order Details</div>
              <p className="text-muted-foreground">Order ID: #{orderId.substring(0, 8)}</p>
              <p className="text-muted-foreground mt-1">A confirmation email with your invoice has been sent to your email address.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <CustomButton variant="outline">
                  <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
                </CustomButton>
              </Link>
              <Link to="/profile">
                <CustomButton>
                  View Profile
                </CustomButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
