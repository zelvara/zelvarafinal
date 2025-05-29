import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <h2 className="text-2xl font-bold mb-6">ZELVARA</h2>
            <p className="text-gray-400 mb-6">
              Elevate your wardrobe with our premium clothing collection.
              Designed for the modern individual who values quality and style.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop/mens" className="text-gray-400 hover:text-white transition-colors">
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link to="/shop/womens" className="text-gray-400 hover:text-white transition-colors">
                  Women's Clothing
                </Link>
              </li>
              <li>
                <Link to="/shop/accessories" className="text-gray-400 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/shop/new-arrivals" className="text-gray-400 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop/sale" className="text-gray-400 hover:text-white transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-400 hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/stores" className="text-gray-400 hover:text-white transition-colors">
                  Store Locator
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-400 hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 pt-8 pb-4">
          <div className="max-w-lg mx-auto text-center mb-8">
            <h3 className="text-xl font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-400 mb-6">
              Stay updated with the latest collections, promotions, and styling tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <button className="px-6 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright and Terms */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p className="mb-4">© {new Date().getFullYear()} ZELVARA. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="hover:text-gray-300 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;