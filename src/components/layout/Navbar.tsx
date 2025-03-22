
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-morphism py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="content-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-display text-gradient font-bold">
            Men Fashion
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link 
              to="/cart" 
              className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link 
              to="/login" 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="User Account"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden neo-blur fixed inset-0 top-16 z-50 animate-fade-in">
          <div className="flex flex-col p-6 h-full">
            <nav className="flex flex-col space-y-6 text-lg">
              <NavLinks mobile />
            </nav>
            <div className="mt-auto border-t border-white/10 pt-6 pb-8 flex justify-between">
              <Link 
                to="/cart" 
                className="flex items-center space-x-2"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Cart (0)</span>
              </Link>
              <Link 
                to="/login" 
                className="flex items-center space-x-2"
                aria-label="User Account"
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLinks: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  const location = useLocation();
  const links = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      {links.map(link => {
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`
              ${mobile ? 'text-xl py-2' : 'text-sm'} 
              relative transition-colors hover:text-primary
              ${isActive ? 'text-primary' : 'text-foreground'}
            `}
          >
            {link.label}
            {isActive && (
              <span 
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" 
                style={{ transform: 'scaleX(0.8)', transformOrigin: 'center' }}
              />
            )}
          </Link>
        );
      })}
    </>
  );
};

export default Navbar;
