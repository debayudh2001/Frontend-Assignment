import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../Context";
import { Link, useSearchParams } from "react-router-dom";

const Home = () => {
  const { state, dispatch } = useContext(ProjectContext);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [baseProducts, setBaseProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchProducts = async () => {
    try {
      let res = await fetch("https://fakestoreapi.in/api/products?limit=20");
      let data = await res.json();
      let newData = data.products.map((prod) => {
        prod.quantity = 1;
        return prod;
      });
      dispatch({ type: "addProducts", payload: [...newData] });
      setFilteredProducts([...newData]);
      setBaseProducts([...newData]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(state.products.length === 0){
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    if (state.searchQuery) {
      setFilteredProducts([
        state.products.find(
          (prod) => prod.title.toLowerCase() === state.searchQuery.toLowerCase()
        ),
      ]);
      setSearchParams({ q: state.searchQuery });
    }
  }, [state.searchQuery]);

  useEffect(() => {
    const fltrd = baseProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    setFilteredProducts(fltrd);
  }, [priceRange, baseProducts]);

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      {state.isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => dispatch({ type: "toggleMobileMenu" })}
        />
      )}

      <div
        className={`
          fixed z-60 lg:z-40 lg:static inset-y-0 left-0 w-80 bg-white lg:bg-transparent transform transition-transform duration-300 ease-in-out
          ${
            state.isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          lg:w-80 p-4 lg:p-6 overflow-y-auto
        `}
      >
        <div className="bg-[#0858A8] text-white p-4 lg:p-6 rounded-lg mb-6">
          <h2 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6">Filters</h2>

          <div className="mb-4 lg:mb-6">
            <h3 className="font-semibold mb-3">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  defaultChecked
                  onChange={() => {
                    setBaseProducts([...state.products]);
                    setSearchParams({
                      category
                    });
                  }}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm lg:text-base">all</span>
              </label>
              {[...new Set(state.products.map((prod) => prod.category))].map(
                (category, ind) => (
                  <label
                    key={ind}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      onChange={(e) => {
                        setBaseProducts(
                          state.products.filter(
                            (prod) => prod.category === e.target.value
                          )
                        );
                        setSearchParams({
                          category
                        });
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm lg:text-base">{category}</span>
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Price</h3>
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[1]}
                step={1}
                onChange={(e) => {
                  setPriceRange([priceRange[0], Number(e.target.value)])
                  setSearchParams(prev => ({
                    ...Object.fromEntries(prev),
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1],
                  }))
                }}
                className="w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm mt-2">
                <span>{priceRange[0]}</span>
                <span>{priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
          Product Listing
        </h1>

        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {filteredProducts.length === 0 ? <p>No products available</p> : filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </Link>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm lg:text-base">
                  {product.title}
                </h3>
                <p className="text-lg font-bold text-gray-900 mb-3">
                  ${product.price}
                </p>
                <button
                  onClick={() =>
                    dispatch({ type: "addToCart", payload: product })
                  }
                  className="w-full bg-[#0062BD] hover:bg-blue-400 text-white py-2 px-4 rounded-lg font-medium text-sm lg:text-base transition-colors cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
