import React from "react";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartItems = [
    {
      id: "c1",
      name: PannerNode,
      amount: 2,
      price: 400,
    },
  ].map((item) => <li>item.name</li>);
  return (
    <Modal onClose={props.onHideCartClick}>
      <ul className={classes.cart_items}>{cartItems}</ul>

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.15</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={props.onHideCartClick}
        >Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
