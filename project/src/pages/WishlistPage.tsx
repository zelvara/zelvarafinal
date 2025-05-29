import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import ProductGrid from '../components/product/ProductGrid';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  
  // Get wishlist products
  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  const handleClearWishlist = () => {
    wishlist.forEach(id => removeFromWishlist(id));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Wishlist</h1>
          
          {wishlistProducts.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleClearWishlist}
            >
              Clear Wishlist
            </Button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Save your favorite items to keep track of them and get notified about special offers.
            </p>
            <Link to="/shop">
              <Button variant="primary">
                Explore Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <p className="text-gray-600">{wishlistProducts.length} items in your wishlist</p>
            </div>

            <ProductGrid products={wishlistProducts} columns={3} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;