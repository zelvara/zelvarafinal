import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { products } from '../../data/products';
import { useWishlist } from '../../context/WishlistContext';

const FeaturedProducts: React.FC = () => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const featuredProducts = products.filter(product => product.featured);

  const handleWishlistToggle = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular pieces, hand-selected for their exceptional quality and timeless design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Sale badge */}
                  {product.originalPrice && (
                    <span className="absolute top-4 left-4 bg-black text-white text-xs px-2 py-1 rounded">
                      SALE
                    </span>
                  )}
                  
                  {/* Wishlist button */}
                  <button
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md transition-transform duration-300 hover:scale-110"
                    onClick={(e) => handleWishlistToggle(e, product.id)}
                    aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart 
                      size={20} 
                      className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}
                    />
                  </button>
                  
                  {/* Quick view overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:bg-opacity-20 group-hover:opacity-100">
                    <span className="px-4 py-2 bg-white text-gray-900 font-medium rounded-md transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                      Quick View
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {product.originalPrice ? (
                        <>
                          <span className="text-gray-900 font-semibold">${product.price}</span>
                          <span className="text-gray-500 line-through ml-2">${product.originalPrice}</span>
                        </>
                      ) : (
                        <span className="text-gray-900 font-semibold">${product.price}</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/shop" 
            className="inline-block px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-900 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;