import { useContext, useState } from "react";
import { ProjectContext } from "../Context";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const {state, dispatch} = useContext(ProjectContext)
  const tax = 7.84
  //const subTotal = state.cart.reduce((acc,curr) => acc + curr.price, 0)
  const shipping = 15
  //const total = subTotal > 100 ? (subTotal + tax) : (subTotal + tax + shipping)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {state.cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some products to get started!
            </p>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2"
            >
              <span>Continue Shopping</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 lg:p-6 border-b border-gray-200">
                  <h2 className="text-lg lg:text-xl font-bold text-gray-800">
                    Cart Items
                  </h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {state.cart.map((item) => (
                    <div key={item.id} className="p-4 lg:p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          to={`/product/${item.id}`}
                          className="flex-shrink-0"
                        >
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full sm:w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div>
                              <Link to={`/product/${item.id}`}>
                                <h3 className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                                  {item.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-gray-500">
                                {item.category}
                              </p>
                              <p className="text-lg font-bold text-gray-900 mt-1">
                                ${item.price}
                              </p>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4">
                              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                                <button
                                  onClick={() =>
                                    dispatch({type: 'decreaseQuant', payload: item.id})
                                  }
                                  className="p-1 hover:bg-gray-200 rounded"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-3 py-1 font-medium min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    dispatch({type: 'increaseQuant', payload: item.id})
                                  }
                                  className="p-1 hover:bg-gray-200 rounded"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <button
                                onClick={() => dispatch({type: 'removeFromCart', payload: item.id})}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-2 sm:hidden">
                            <p className="text-sm text-gray-600">
                              Subtotal:{" "}
                              <span className="font-semibold">
                                ${item.price.toFixed(2) * item.quantity}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="hidden sm:block text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ${item.price.toFixed(2) * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
                <div className="p-4 lg:p-6 border-b border-gray-200">
                  <h2 className="text-lg lg:text-xl font-bold text-gray-800">
                    Order Summary
                  </h2>
                </div>

                <div className="p-4 lg:p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      ${state.cart.reduce((acc,curr) => acc + (curr.price*curr.quantity), 0).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {state.cart.reduce((acc,curr) => acc + (curr.price*curr.quantity), 0).toFixed(2) > 100 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {state.cart.reduce((acc,curr) => acc + (curr.price*curr.quantity), 0).toFixed(2) < 100 && (
                    <p className="text-sm text-green-600">
                      🎉 Free shipping on orders over $100!
                    </p>
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${state.cart.reduce((acc,curr) => acc + (curr.price*curr.quantity), 0).toFixed(2) > 100 ? (state.cart.reduce((acc,curr) => acc + (curr.price*curr.quantity), 0) + tax).toFixed(2) : (state.cart.reduce((acc,curr) => acc + (curr.price*curr.quantity), 0) + tax + shipping).toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-lg">
                    Proceed to Checkout
                  </button>

                  <Link
                    to="/"
                    className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
