import { createContext, useReducer } from "react";

export const ProjectContext = createContext()

const reducer = (state,action) => {
    switch(action.type){
        case 'toggleMobileMenu':
            return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen }
        case 'addProducts':
            return { ...state, products: [ ...action.payload ]}
        case 'addToCart': {
            localStorage.setItem('cart', JSON.stringify([ ...state.cart, action.payload ]))
            return { ...state, cart: [ ...state.cart, action.payload ]}
        }
        case 'removeFromCart':{
            localStorage.setItem('cart', JSON.stringify(state.cart.filter(item => item.id !== action.payload)))
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload)}
        }
        case 'searchProduct':
            return { ...state, searchQuery: action.payload }
        case 'increaseQuant': 
            return { ...state, cart: state.cart.map(prod => {
               if(prod.id === action.payload){
                    prod.quantity = prod.quantity + 1
                    return prod
                }else{
                    return prod
                }
            })}
        case 'decreaseQuant':
            return { ...state, cart: state.cart.map(prod => {
                if(prod.id === action.payload && prod.quantity > 1){
                    prod.quantity = prod.quantity - 1
                    return prod
                }else{
                    return prod
                }
            })}
        default:
            return state
    }
}

const ProjectProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {
        products: [],
        isMobileMenuOpen: false,
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        searchQuery: null
    })
    return (
        <ProjectContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectProvider