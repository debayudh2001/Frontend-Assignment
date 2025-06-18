import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../Context";
import { useParams } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";

const Product = () => {
  const {state, dispatch} = useContext(ProjectContext)
  const { id } = useParams()
  const [product, setProduct] = useState({})
  
  useEffect(() => {
    setProduct(state.products.find(prod => prod.id === Number(id)))
  }, [id])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12">
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border border-gray-200 p-4">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-blue-600 font-medium mb-2">
                {product.brand}
              </p>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2"
                  onClick={() => dispatch({type: 'addToCart', payload: product})}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Truck className="w-5 h-5" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span>2-year warranty included</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <RotateCcw className="w-5 h-5" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
