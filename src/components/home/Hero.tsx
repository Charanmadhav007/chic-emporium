
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen max-h-[800px] overflow-hidden">
      {/* Hero background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550995694-92c3c3e61954?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Hero background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full content-container">
        <div className="max-w-2xl animate-slide-up">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase bg-primary/20 text-primary rounded-full">
            New Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight text-gradient mb-6">
            Elevate Your Style with Premium Men's Fashion
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            Discover our curated collection of premium clothing designed for the modern gentleman who values quality, style, and sophistication.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" as={Link} to="/shop">
              Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" as={Link} to="/about">
              Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
