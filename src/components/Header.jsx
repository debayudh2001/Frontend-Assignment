import { X, Menu, Search, ShoppingCart } from "lucide-react"
import { useContext, useRef } from "react"
import { Link } from "react-router-dom"
import { ProjectContext } from "../Context"

const Header = () => {
    const {state, dispatch} = useContext(ProjectContext)
    const inputRef = useRef(null)

    return (
      <header className="bg-[#0858A8] text-white p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden" onClick={() => dispatch({type: 'toggleMobileMenu'})}>
              {state.isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link to="/" className="text-xl md:text-2xl font-bold">
              Logo
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" onClick={(e) => {
                dispatch({type: 'searchProduct', payload: inputRef.current.value})
                inputRef.current.value = ""
               }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-400 bg-[#0858A8] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          <Link
            to="/cart"
            className="bg-[#002B5A] hover:bg-blue-400 px-3 md:px-4 py-2 rounded-lg flex items-center space-x-2 relative transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
            {state.cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {state.cart.length}
              </span>
            )}
          </Link>
        </div>

        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-400 bg-[#0858A8] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </header>

      
    )
}

export default Header