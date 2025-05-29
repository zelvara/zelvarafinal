import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, selectedColor, selectedSize } = item;

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Product Details */}
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{product.name}</h3>
          <p className="ml-4">${(product.price * quantity).toFixed(2)}</p>
        </div>
        
        <div className="mt-1 text-sm text-gray-500">
          <p>Color: {selectedColor.name}</p>
          <p>Size: {selectedSize}</p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          {/* Quantity Selector */}
          <div className="flex items-center border rounded-md">
            <button
              type="button"
              className="p-1.5 text-gray-600 hover:text-gray-900"
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-2 py-1 text-gray-900 min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              type="button"
              className="p-1.5 text-gray-600 hover:text-gray-900"
              onClick={handleIncreaseQuantity}
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            className="font-medium text-gray-600 hover:text-gray-900 flex items-center"
            onClick={handleRemove}
          >
            <X size={16} className="mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;