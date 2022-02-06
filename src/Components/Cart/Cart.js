import React, { useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import Modal from "../UI/Modal";

// Importing Components
import CartItem from "./CartItem";
import Checkout from "./Checkout";

// Importing Styles
import classes from "./Cart.module.css";

const Cart = (props) => {
  // list of states
  const [isCheckOut, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  // list of context
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItems({
      ...item,
      amount: 1,
    });
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));

  // Clicking on Order Button happens here
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitDataHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-food-app-2022-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button
        className={classes["button--alt"]}
        onClick={props.onHideCartClick}
      >
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      <ul className={classes.cart_items}>{cartItems}</ul>

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {/* Rendering the checkout form */}
      {isCheckOut && (
        <Checkout
          onConfirm={submitDataHandler}
          onCancel={props.onHideCartClick}
        />
      )}
      {!isCheckOut && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = (
    <p className={classes.text_center}>Sending Order Data</p>
  );

  const submittedModalContent = (
    <React.Fragment>
      <p className={classes.text_center}>Order Data Sent Successfully!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCartClick}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onHideCartClick}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && submittedModalContent}
    </Modal>
  );
};

export default Cart;
