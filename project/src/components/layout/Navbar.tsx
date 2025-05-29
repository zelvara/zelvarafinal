import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          ZELVARA
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-800 hover:text-black transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-gray-800 hover:text-black transition-colors">
            Shop
          </Link>
          <Link to="/collections" className="text-gray-800 hover:text-black transition-colors">
            Collections
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-black transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-gray-800 hover:text-black transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors" 
            aria-label="Search"
          >
            <Search size={20} className="text-gray-800" />
          </button>
          
          <Link 
            to="/wishlist" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart size={20} className="text-gray-800" />
          </Link>
          
          <Link 
            to="/cart" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} className="text-gray-800" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
          
          <Link 
            to={isAuthenticated ? "/account" : "/login"} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isAuthenticated ? "My Account" : "Login"}
          >
            <User size={20} className="text-gray-800" />
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-gray-800" />
            ) : (
              <Menu size={24} className="text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-gray-800 text-xl py-2 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="text-gray-800 text-xl py-2 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              Shop
            </Link>
            <Link 
              to="/collections" 
              className="text-gray-800 text-xl py-2 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              Collections
            </Link>
            <Link 
              to="/about" 
              className="text-gray-800 text-xl py-2 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-800 text-xl py-2 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;