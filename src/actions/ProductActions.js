const addProductToCart = (product) => ({
    type: "ADD_TO_CART",
    payload: product
});

const updateProductQuantity = (product) => ({
    type: "UPDATE_PRODUCT_QUANTITY",
    payload: product
});

const removeProductFromCart = (sku) => ({
    type: "REMOVE_FROM_CART",
    payload: sku
});

export {
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart
}