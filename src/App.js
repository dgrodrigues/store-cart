import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Redirect
} from "react-router-dom";

import ProductsController from './controllers/ProductsController';
import CartController from './controllers/CartController';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <nav className="nav-bar"></nav>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<CartController />}>
                        </Route>
                        <Route path="prodcuts" element={<ProductsController />} />
                        <Route path="cart" element={<CartController />} />
                        <Route
                            path="*"
                            element={
                                <div>404</div>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </React.Fragment>);
    }
};

export default App;