import React from 'react';
import CartContext from './CartContext'
const Cartprovider = (props) => {

    const addItemToCartHandler = (item) => {

    }

    const removeItemFromCartHandler = (id) => {

    }
    const cartContext = [{
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }];
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default Cartprovider;