// Load default / previous data
import * as initialProducts from '../api.json';

let initialCart = initialProducts.items.map(product => {
    return { sku: product.sku, quantity: 1 }
});

export const cartReducer = (state = initialCart, action) => {
    let newState = [...state];
    switch (action.type) {
        case "ADD_TO_CART":
            newState.push(action.payload);
            return newState;
        case "UPDATE_PRODUCT_QUANTITY":
            const editIndex = newState.findIndex(cartItem => cartItem.sku == action.payload.sku);
            if (editIndex > -1) {
                newState[editIndex] = { ...action.payload };
                return newState;
            }
            return state;
        case "REMOVE_FROM_CART":
            const removeIndex = newState.findIndex(cartItem => cartItem.sku == action.payload);
            if (removeIndex > -1) {
                newState.splice(removeIndex, 1);
                return newState;
            }
            return state;
        default:
            return state;
    }
}

export const productsReducer = (state = initialProducts.items, action) => {
    var newState = [...state];
    switch (action.type) {
        case "LOAD_PRODUCTS":
            // This reducer could be used for other actions related to products data.
            return state;
        default:
            return state;
    }
}

