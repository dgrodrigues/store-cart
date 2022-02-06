import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { addProductToCart, updateProductQuantity, removeProductFromCart } from '../actions/ProductActions'

import { TrashIcon } from '../icons';
import AmountInput from '../components/AmountInput';

import '../styles/index.scss';

const roundValues = (value) => {
    return Math.round(value * 1000) / 1000;
}

class CartController extends React.Component {

    renderCartItem = (item) => {
        const product = this.props.products.find(prod => prod.sku == item.sku)
        const exceedsStock = item.quantity > product.stockLevel;

        return (
            <tr key={product.sku}>
                <td>
                    <span>{product.name}</span>
                </td>
                <td>
                    <span className="label">Price</span>
                    <span>£{product.price}</span>
                </td>
                <td>
                    <span className="label">Quantity</span>
                    <div className="stock-quantity">
                        {exceedsStock && (<span className="stock-warning">Exceeds Stock</span>)}
                        <AmountInput value={item.quantity}
                            sku={item.sku}
                            stock={product.stockLevel}
                            updateQuantity={this.updateQuantity} />
                    </div>
                </td>
                <td>
                    <span className="label">Cost</span>
                    <span>£{roundValues(item.quantity * product.price)}</span>
                </td>
                <td>
                    <span className="label">Remove</span>
                    <button onClick={() => this.props.removeProductFromCart(item.sku)}>
                        <TrashIcon color={'#448AFF'} width={18} height={20} />
                    </button>
                </td>
            </tr>
        )
    }

    updateQuantity = (sku, quantity) => {
        const previousItem = this.props.cart.find(item => item.sku == sku)
        let newItem = { ...previousItem };
        newItem.quantity = quantity;
        this.props.updateProductQuantity(newItem);
    }

    calculateCartTotals = () => {
        let subTotal = 0;
        let vatTotal = 0;
        let total = 0;

        this.props.cart.map(item => {
            const product = this.props.products.find(product => product.sku == item.sku)
            vatTotal = vatTotal + (product.price * item.quantity) * 0.20;
            subTotal = subTotal + (product.price * item.quantity) * 0.80;
            total = total + (product.price * item.quantity);
        });

        return {
            subTotal: roundValues(subTotal),
            vat: roundValues(vatTotal),
            total: roundValues(total)
        }
    }

    render() {
        const totals = this.calculateCartTotals();

        return (
            <div className="cart-container">
                <h1>Your Basket</h1>
                <p className="cart-intro">Items you have added to your basket are shown below. Adjust the quantities or remove items before continuing purchase.</p>
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>
                                <span>Product</span>
                            </th>
                            <th>
                                <span>Price</span>
                            </th>
                            <th>
                                <span>Quantity</span>
                            </th>
                            <th>
                                <span>Cost</span>
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cart.map(cartItem => this.renderCartItem(cartItem))}
                        {this.props.cart.length == 0 && (
                            <tr>
                                <td colSpan={5} className="no-items">
                                    <p>No itens in cart at this moment.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4}>
                                <span>Subtotal</span>
                                <span>£ {totals.subTotal}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <span>VAT at 20%</span>
                                <span>£ {totals.vat}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <span>Total cost</span>
                                <span>£ {totals.total}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <button disabled={this.props.cart.length == 0}>Buy Now</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cart: state.cart,
    products: state.products
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addProductToCart, updateProductQuantity, removeProductFromCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CartController);