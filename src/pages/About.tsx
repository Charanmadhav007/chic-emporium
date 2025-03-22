
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="content-container py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-display font-bold mb-8">About Us</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                Men Fashion represents the pinnacle of luxury menswear, offering a curated collection of premium clothing designed for the modern gentleman who values quality, sophistication, and timeless style.
              </p>
              
              <div className="my-12 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                  alt="Our showroom" 
                  className="w-full h-auto"
                />
              </div>
              
              <h2 className="text-2xl font-display font-bold mb-4">Our Story</h2>
              <p className="mb-6">
                Founded in 2010, Men Fashion was born from a passion for exceptional craftsmanship and a desire to create menswear that strikes the perfect balance between classic elegance and contemporary design.
              </p>
              <p className="mb-6">
                Our founder, Alexander Mitchell, spent years learning from master tailors in Milan and London before establishing Men Fashion with a clear vision: to create a brand that embodies the highest standards of quality, style, and ethical production.
              </p>
              
              <h2 className="text-2xl font-display font-bold mb-4 mt-10">Our Philosophy</h2>
              <p className="mb-6">
                At Men Fashion, we believe that true luxury lies in the details. Each garment we create is the result of meticulous attention to material, fit, and construction. We source the finest fabrics from renowned mills around the world, and partner with skilled artisans who share our commitment to excellence.
              </p>
              
              <h2 className="text-2xl font-display font-bold mb-4 mt-10" id="sustainability">Commitment to Sustainability</h2>
              <p className="mb-6">
                We are deeply committed to responsible fashion. This means ethical manufacturing practices, sustainable material sourcing, and a dedication to reducing our environmental footprint. We believe that luxury and responsibility can and should coexist.
              </p>
              
              <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1606041008023-472dfb5b530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Crafting process" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Quality materials" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              
              <h2 className="text-2xl font-display font-bold mb-4 mt-10">Join Us</h2>
              <p className="mb-6">
                We invite you to experience the Men Fashion difference. Whether you're shopping for everyday essentials or statement pieces for special occasions, we're dedicated to helping you look and feel your best.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
