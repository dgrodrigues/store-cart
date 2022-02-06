// Import Dependencies
import { configureStore } from '@reduxjs/toolkit'

// Import Reducers
import { cartReducer, productsReducer } from './reducers/ProductsReducers';

// Create Store
export default configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer
    }
});