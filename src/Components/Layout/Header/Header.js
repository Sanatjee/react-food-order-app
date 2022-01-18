import React, { Fragment } from "react";
import mealImage from "../../../../src/assests/img/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Enigma Meals</h1>
        <HeaderCartButton onClick={props.onShowCartClick} />
      </header>
      <div className={classes.main_image}>
        <img src={mealImage} alt="meal image" />
      </div>
    </Fragment>
  );
};

export default Header;
