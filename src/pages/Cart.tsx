
import React from 'react';
import { ShoppingBag, ChevronLeft, Trash, Plus, Minus } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import LinkButton from '@/components/ui/LinkButton';
import { toast } from '@/hooks/use-toast';

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

const Cart: React.FC = () => {
  const handleRemoveItem = (id: number) => {
    // Would normally remove the item from cart state
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart."
    });
  };
  
  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    // Would normally update the cart state
    if (newQuantity < 1) return;
    toast({
      title: "Quantity updated",
      description: "The item quantity has been updated."
    });
  };
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 15.00;
  const total = subtotal + shipping;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="content-container py-12">
          <h1 className="text-3xl font-display font-bold mb-8">Shopping Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="glass-morphism rounded-lg p-4 flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-24 overflow-hidden rounded-md bg-muted">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <LinkButton to={`/product/${item.id}`} className="font-medium hover:text-primary transition-colors">
                          {item.name}
                        </LinkButton>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center border border-border rounded-md">
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 hover:bg-secondary transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-4 py-1 text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-secondary transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-8">
                  <LinkButton 
                    to="/shop" 
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                    variant="ghost"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Continue Shopping
                  </LinkButton>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-morphism rounded-lg p-6">
                  <h2 className="text-xl font-display font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-white/10 pt-4 mt-4">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <LinkButton 
                    className="w-full mt-6"
                    size="lg"
                    to="/checkout"
                  >
                    Proceed to Checkout
                  </LinkButton>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-morphism rounded-lg p-10 text-center">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-display font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
              <LinkButton to="/shop">
                Start Shopping
              </LinkButton>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
