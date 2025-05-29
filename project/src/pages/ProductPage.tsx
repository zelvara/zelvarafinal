import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import ProductGrid from '../components/product/ProductGrid';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Color, Size } from '../types';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const product = products.find(p => p.id === productId);
  
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [activeTab, setActiveTab] = useState('description');
  const [expandedTabs, setExpandedTabs] = useState<Record<string, boolean>>({
    description: true
  });

  // Get related products (same category)
  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  useEffect(() => {
    if (product) {
      document.title = `${product.name} - LUXE`;
      setSelectedImage(product.images[0]);
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    } else {
      navigate('/not-found', { replace: true });
    }
    
    window.scrollTo(0, 0);
  }, [product, navigate, productId]);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      addToCart(product, quantity, selectedColor, selectedSize);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleTab = (tab: string) => {
    setExpandedTabs(prev => ({
      ...prev,
      [tab]: !prev[tab]
    }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${
                    selectedImage === image ? 'border-black' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="mt-2 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
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
                <span className="ml-2 text-gray-600">{product.rating.toFixed(1)} ({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                {product.originalPrice ? (
                  <>
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <span className="ml-2 text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">Free shipping on orders over $100</p>
            </div>

            {/* Color Selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="mt-2 flex items-center space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`relative w-8 h-8 rounded-full focus:outline-none ${
                      selectedColor?.name === color.name ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Color ${color.name}`}
                  >
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
              {selectedColor && (
                <p className="mt-1 text-sm text-gray-500">Selected: {selectedColor.name}</p>
              )}
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Size guide
                </button>
              </div>
              <div className="mt-2 grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="mt-2 flex items-center border border-gray-300 rounded-md w-32">
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full p-2 text-center border-0 focus:ring-0"
                />
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">{product.stock} items in stock</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="flex-1"
                disabled={!selectedColor || !selectedSize}
              >
                <ShoppingBag size={20} className="mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                size="lg"
                className={isInWishlist(product.id) ? 'text-red-500 border-red-500' : ''}
              >
                <Heart
                  size={20}
                  className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}
                />
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                size="lg"
              >
                <Share size={20} />
              </Button>
            </div>

            {/* Product Information Tabs */}
            <div className="mt-10 border-t border-gray-200 pt-6 space-y-4">
              {/* Description Tab */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="flex items-center justify-between w-full py-2 text-left"
                  onClick={() => toggleTab('description')}
                >
                  <h3 className="text-lg font-medium text-gray-900">Description</h3>
                  {expandedTabs.description ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedTabs.description && (
                  <div className="mt-2 prose prose-sm text-gray-500">
                    <p>{product.description}</p>
                  </div>
                )}
              </div>

              {/* Details Tab */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="flex items-center justify-between w-full py-2 text-left"
                  onClick={() => toggleTab('details')}
                >
                  <h3 className="text-lg font-medium text-gray-900">Details & Care</h3>
                  {expandedTabs.details ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedTabs.details && (
                  <div className="mt-2 prose prose-sm text-gray-500">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Premium quality materials</li>
                      <li>Carefully crafted construction</li>
                      <li>Machine wash cold, tumble dry low</li>
                      <li>Imported</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Shipping Tab */}
              <div className="border-b border-gray-200 pb-4">
                <button
                  className="flex items-center justify-between w-full py-2 text-left"
                  onClick={() => toggleTab('shipping')}
                >
                  <h3 className="text-lg font-medium text-gray-900">Shipping & Returns</h3>
                  {expandedTabs.shipping ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedTabs.shipping && (
                  <div className="mt-2 prose prose-sm text-gray-500">
                    <p>Free standard shipping on all orders over $100. Delivery time: 3-5 business days.</p>
                    <p className="mt-2">We accept returns within 30 days of delivery for a full refund. Items must be unworn, unwashed, and with all tags attached.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You may also like</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;