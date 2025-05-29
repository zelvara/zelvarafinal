import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Tags */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.originalPrice && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded">
                SALE
              </span>
            )}
            {product.newArrival && (
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                NEW
              </span>
            )}
            {product.bestSeller && (
              <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">
                BEST SELLER
              </span>
            )}
          </div>
          
          {/* Wishlist button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md transition-transform duration-300 hover:scale-110"
            onClick={handleWishlistToggle}
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
          
          {/* Color options */}
          <div className="mt-3 flex items-center space-x-1">
            {product.colors.map((color) => (
              <div
                key={color.name}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;