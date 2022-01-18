import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input}>
      <lablel htmlFor={props.input.id}>{props.label}</lablel>
      <input id={props.input.id} {...props.input} />
    </div>
  );
};

export default Input;
