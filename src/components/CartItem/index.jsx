import React from "react";

const CartItem = ({ item, onAddToCart, removeFromCart }) => {
  const handleIncrement = () => {
    onAddToCart(item);
  };

  const handleDecrement = () => {
    removeFromCart(item);
  };

  return (
    <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-100">
      <div className="col-span-6 flex items-center">
        <div className="bg-gray-100 p-2 rounded-lg mr-3"></div>
        <div>
          <h3 className="font-medium text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
        </div>
      </div>

      <div className="col-span-3 flex justify-center">
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-l-lg transition-colors duration-200"
            onClick={handleDecrement}
          >
            -
          </button>
          <span className="px-4 py-1 bg-white text-center w-12">
            {item.quantity}
          </span>
          <button
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-r-lg transition-colors duration-200"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      </div>

      <div className="col-span-3 text-right">
        <span className="font-medium text-gray-800">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
