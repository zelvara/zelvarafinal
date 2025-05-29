import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CartItemComponent from '../components/cart/CartItem';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setPromoApplied(false);
    }
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { redirect: '/checkout' } });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/shop">
              <Button variant="primary">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 pb-4 border-b">
                  Cart Items ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                </h2>
                
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <CartItemComponent key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`} item={item} />
                  ))}
                </div>

                <div className="mt-6 flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  
                  <Link to="/shop">
                    <Button variant="outline">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 pb-4 border-b">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      Including taxes
                    </p>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-6">
                  <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-1">
                    Promo Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      id="promo-code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <Button 
                      variant="outline"
                      onClick={handleApplyPromoCode}
                      disabled={!promoCode.trim()}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoError && <p className="mt-1 text-sm text-red-600">{promoError}</p>}
                  {promoApplied && <p className="mt-1 text-sm text-green-600">Promo code applied successfully!</p>}
                  <p className="text-gray-500 text-sm mt-2">
                    Try "WELCOME10" for 10% off your order
                  </p>
                </div>

                {/* Checkout Button */}
                <div className="mt-6">
                  <Button 
                    variant="primary" 
                    fullWidth
                    onClick={handleCheckout}
                    className="flex items-center justify-center"
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-sm flex justify-center items-center">
                    <svg className="h-4 w-4 text-gray-400 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;