import { useState } from "react";
import Cart from "./Components/Cart/Cart";

import Header from "./Components/Layout/Header/Header";
import Meals from "./Components/Meals/Meals";
import Cartprovider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  return (
    <Cartprovider>
      {cartIsShown && <Cart onHideCartClick={hideCartHandler} />}
      <Header
        onShowCartClick={showCartHandler}

      />
      <main>
        <Meals />
      </main>

    </Cartprovider>
  );
}

export default App;
