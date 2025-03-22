
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ui/ProductCard';
import { getFeaturedProducts } from '@/lib/data';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16">
      <div className="content-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-display font-bold mb-4">Featured Collection</h2>
            <p className="text-muted-foreground">
              Discover our carefully selected premium pieces that combine timeless elegance with contemporary design.
            </p>
          </div>
          <Link 
            to="/shop" 
            className="inline-flex items-center text-primary hover:text-primary/80 mt-4 md:mt-0 group transition-colors"
          >
            View All Products 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
