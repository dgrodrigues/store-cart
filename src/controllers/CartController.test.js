import { render } from "@testing-library/react";
import React from "React";
import { Provider } from "react-redux";
import { createStore } from "redux";
import CartController from "./CartController";
import { cartReducer } from '../reducers/ProductsReducers';
import * as initialProducts from '../api.json';

const mockState = {
    cart: initialProducts.items.map(product => {
        return { sku: product.sku, quantity: 1 }
    }),
    products: initialProducts
}

const renderWithRedux = (component, storeState, rootReduder) => {
    return {
        ...render(
            <Provider store={createStore(rootReduder, storeState)}>
                {component}
            </Provider>
        ),
        storeState
    }
}

describe("Component Cart", () => {
    it("Should Render", () => {
        const renderer = renderWithRedux(
            <CartController />,
            mockState,
            cartReducer
        )

        expect(renderer).toBeTruthy();
    })
})