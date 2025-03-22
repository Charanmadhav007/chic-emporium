
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import CustomButton from '@/components/ui/CustomButton';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Here we would normally add the product to cart state
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-lg glass-morphism p-1 transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        {/* Image with lazy loading and blur effect */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-pulse" />
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105 animate-blur-in"
          loading="lazy"
        />
        
        {/* Add to cart overlay button */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
          <CustomButton
            onClick={handleAddToCart}
            className="w-full animate-fade-in"
            variant="primary"
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </CustomButton>
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-medium tracking-tight text-foreground truncate group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xl font-semibold mt-1 text-accent">${product.price.toFixed(2)}</p>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
