
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-muted">
      <div className="content-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand section */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-display font-bold text-gradient">
              Men Fashion
            </Link>
            <p className="mt-3 text-muted-foreground">
              Premium clothing for the modern gentleman. Quality, style, and elegance.
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=shirts" className="text-muted-foreground hover:text-primary transition-colors">
                  Shirts
                </Link>
              </li>
              <li>
                <Link to="/shop?category=pants" className="text-muted-foreground hover:text-primary transition-colors">
                  Pants
                </Link>
              </li>
              <li>
                <Link to="/shop?category=outerwear" className="text-muted-foreground hover:text-primary transition-colors">
                  Outerwear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="text-muted-foreground hover:text-primary transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Information</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about#sustainability" className="text-muted-foreground hover:text-primary transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">123 Fashion St, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+12125551234" className="text-muted-foreground hover:text-primary transition-colors">
                  +1 (212) 555-1234
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@menfashion.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@menfashion.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Men Fashion. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="MasterCard" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="https://cdn-icons-png.flaticon.com/512/349/349230.png" alt="American Express" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="https://cdn-icons-png.flaticon.com/512/349/349220.png" alt="PayPal" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
