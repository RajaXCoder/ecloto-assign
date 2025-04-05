import React, { useState } from "react";
import CartItem from "../CartItem";
import { ProgressLabel, ProgressFill, ProgressBar } from "./style";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

const Home = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gift, setGift] = useState(null);
  const [giftAdded, setGiftAdded] = useState(false);

  const progressPercentage = Math.min((subtotal / THRESHOLD) * 100, 100);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setSubtotal(subtotal + product.price);
    if (subtotal + product.price >= THRESHOLD && !giftAdded) {
      setGift(FREE_GIFT);
      setGiftAdded(true);
    }
  };

  const removeFromCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    } else {
      setCart(cart.filter((item) => item.id !== product.id));
    }
    setSubtotal(subtotal - product.price);
    if (gift && subtotal - product.price < THRESHOLD) {
      setGift(null);
      setGiftAdded(false);
    }
  };

  const clearCart = () => {
    setCart([]);
    setSubtotal(0);
    setGift(null);
    setGiftAdded(false);
  };

  const handleAddToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Shopping Cart
        </h1>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    cart.some((item) => item.id === product.id)
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                  onClick={() => handleAddToCart(product)}
                >
                  {cart.some((item) => item.id === product.id)
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Cart Summary</h2>
            {cart.length > 0 && (
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            )}
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                {subtotal >= THRESHOLD
                  ? "Free gift unlocked!"
                  : `$${THRESHOLD - subtotal} more for free gift`}
              </span>
              <span className="text-sm font-medium text-gray-600">
                ${subtotal.toFixed(2)} / ${THRESHOLD}
              </span>
            </div>
            <ProgressBar>
              <ProgressFill width={progressPercentage} />
              <ProgressLabel>{progressPercentage.toFixed(0)}%</ProgressLabel>
            </ProgressBar>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                Your cart is empty
              </h3>
              <p className="mt-1 text-gray-500">
                Start adding some products to your cart
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 font-semibold text-gray-600 pb-2 border-b">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Price</div>
              </div>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onAddToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
          )}

          {gift && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold text-green-800">
                  Free Gift Added!
                </h3>
              </div>
              <p className="mt-1 text-green-600">
                {gift.name} - ${gift.price.toFixed(2)}
              </p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Total:</span>
              <span className="text-2xl font-bold text-indigo-600">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            {cart.length > 0 && (
              <button
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                onClick={() => {
                  window.confirm("Do you place the order");
                }}
              >
                Place to Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
