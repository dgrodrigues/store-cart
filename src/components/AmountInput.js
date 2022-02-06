import React from "react";

class AmountInput extends React.Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();

        this.state = {
            error: false
        }
    }

    incrementQuantity = () => {
        const node = this.inputRef.current;
        const newValue = this.props.value + 1;
        node.value = newValue;

        this.setState({ error: false });

        this.props.updateQuantity(this.props.sku, newValue);
    }

    decreaseQuantity = () => {
        const node = this.inputRef.current;
        const newValue = this.props.value - 1;
        node.value = newValue;

        this.setState({ error: false });

        this.props.updateQuantity(this.props.sku, newValue);
    }

    changeInput = () => {
        const node = this.inputRef.current;
        if (node.value !== '' && node.value !== undefined) {
            const num = Number(node.value);
            if (!Number.isInteger(num)) {
                this.setState({ error: true });
            } else if (num < 1) {
                this.setState({ error: true });
            } else {
                this.setState({ error: false });
                this.props.updateQuantity(this.props.sku, parseInt(node.value));
            }
        } else {
            this.setState({ error: true });
        }
    }

    render() {
        const exceedsStock = this.props.value > this.props.stock;
        return (
            <div className={`amount-input ${this.state.error || exceedsStock ? 'error' : ''}`}>
                <button disabled={this.props.value <= 1} onClick={this.decreaseQuantity}>-</button>
                <input onChange={this.changeInput} ref={this.inputRef} type="number" defaultValue={this.props.value} />
                <button onClick={this.incrementQuantity}>+</button>
            </div>
        )
    }
}

export default AmountInput;
