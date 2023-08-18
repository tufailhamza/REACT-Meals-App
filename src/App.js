import React, { Fragment, useState } from "react";
import Header from "./components/Layout/Header"
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart"
import CartProvider from "./Store/Cart-Provider";
function App() {
  const [cartIsShown , setCartisShown] = useState(false);
  const ShowCartHandler =()=>
  {
    setCartisShown(true);
  }
  const HideCartHandler =()=>
  {
    setCartisShown(false );
  }
  return (
   <CartProvider>
      {cartIsShown && <Cart onClose={HideCartHandler}/>}
      <Header onShowCart = {ShowCartHandler}/>
      <main>
        <Meals/>
      </main>
      </CartProvider>
  );
}

export default App;
