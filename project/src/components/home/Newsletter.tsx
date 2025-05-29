import React, { useState } from 'react';
import Button from '../ui/Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
              <p className="text-gray-600 mb-6">
                Join our community and be the first to know about new products, exclusive offers, and styling tips.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                  fullWidth
                >
                  Subscribe
                </Button>

                {isSuccess && (
                  <p className="text-sm text-green-600 mt-2">
                    Thank you for subscribing to our newsletter!
                  </p>
                )}

                <p className="text-xs text-gray-500 mt-4">
                  By subscribing, you agree to our Privacy Policy and consent to receive marketing communications.
                </p>
              </form>
            </div>
            <div className="md:w-1/2 bg-gray-900 p-8 md:p-12 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-xl font-semibold mb-4">Why Subscribe?</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Exclusive early access to new collections</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Special subscriber-only discounts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Fashion tips and styling inspiration</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Invitations to exclusive events</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;