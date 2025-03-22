
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, Minus, Plus, Heart } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomButton from '@/components/ui/CustomButton';
import { getProductById } from '@/lib/data';
import { toast } from '@/hooks/use-toast';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(Number(id));
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 content-container flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you are looking for doesn't exist or has been removed.</p>
            <Link 
              to="/shop" 
              className="inline-flex items-center text-primary hover:text-primary/80"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.inventory) {
      setQuantity(quantity + 1);
    } else {
      toast({
        title: "Maximum quantity reached",
        description: "You've reached the maximum available quantity for this product.",
        variant: "destructive",
      });
    }
  };
  
  const handleAddToCart = () => {
    // Here we would add the product to cart
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="content-container py-12">
          <Link 
            to="/shop" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Shop
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="rounded-lg overflow-hidden glass-morphism aspect-square">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover object-center animate-blur-in"
              />
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-display font-bold">{product.name}</h1>
              <div className="mt-4 text-2xl font-semibold text-accent">${product.price.toFixed(2)}</div>
              
              <div className="my-8 text-muted-foreground">
                <p>{product.description}</p>
              </div>
              
              <div className="mt-auto space-y-6">
                {/* Quantity Selector */}
                <div className="flex items-center">
                  <span className="mr-4 font-medium">Quantity:</span>
                  <div className="flex items-center border border-border rounded-md">
                    <button 
                      onClick={decreaseQuantity}
                      className="px-3 py-2 hover:bg-secondary transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-6 py-2 border-x border-border">{quantity}</span>
                    <button 
                      onClick={increaseQuantity}
                      className="px-3 py-2 hover:bg-secondary transition-colors"
                      disabled={quantity >= product.inventory}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="ml-4 text-sm text-muted-foreground">
                    {product.inventory} available
                  </span>
                </div>
                
                {/* Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <CustomButton 
                    onClick={handleAddToCart}
                    className="flex-1 w-full"
                    size="lg"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </CustomButton>
                  <CustomButton 
                    variant="outline"
                    className="flex-none"
                    size="lg"
                  >
                    <Heart className="h-5 w-5" />
                  </CustomButton>
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

export default ProductDetails;
