import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import UserMenu from './UserMenu';

const navLinks = [
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-sm border-b border-border">
      <div className="content-container flex items-center h-16 md:h-20">
        {/* Logo and mobile menu */}
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display font-bold text-xl">MenFashion</span>
          </Link>
        </div>
        
        {/* Navigation Links */}
        <nav 
          className={`absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-background md:bg-transparent border-b md:border-0 border-border ${
            isMenuOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <ul className="flex flex-col md:flex-row gap-0 md:gap-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink 
                  to={link.path} 
                  className="block py-3 md:py-0 px-8 md:px-0 hover:bg-accent/50 md:hover:bg-transparent hover:text-primary md:hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Actions */}
        <div className="ml-auto flex items-center gap-4">
          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </Link>
          
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
