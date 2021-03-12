import React, { useState } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import useForm from "./hooks/useForm";
import useLightMode from "./hooks/useDarkMode";

import PlantList from "./components/PlantList";
import ShoppingCart from "./components/ShoppingCart";
import CheckoutForm from "./components/CheckoutForm";

import "./App.css";

function App() {
  // array of plants that have been added to the cart
  const [cart, setCart] = useState([]);
  const [searchInp, handleChanges] = useForm("");
  const [lightMode, toggleMode] = useLightMode();

  // add a plant to the cart
  const addToCart = (plant) => {
    setCart([...cart, plant]);
  };

  // remove a plant from the cart
  const removeFromCart = (plant) => {
    setCart(cart.filter((p) => p.id !== plant.id));
  };

  return (
    <div
      style={
        lightMode ? { background: "white", textShadow: "1px 1px black" } : null
      }
    >
      <Router>
        <nav className={lightMode ? "container-light" : "container"}>
          <h1>
            React Plants <span role="img">🌿</span>
          </h1>
          <label>
            search plants:
            <input
              type="text"
              name="name"
              value={searchInp.name}
              onChange={handleChanges}
            />
          </label>
          <div className="dark-mode__toggle">
            <div
              onClick={toggleMode}
              className={lightMode ? "toggle toggled" : "toggle"}
            />
          </div>
          <ul className="steps">
            <li>
              <NavLink exact to="/">
                Plants
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                Cart
                <span className="cart-badge">
                  {cart.length > 0 && cart.length}
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Route
          exact
          path="/"
          render={() => (
            <PlantList addToCart={addToCart} searchInp={searchInp.name} />
          )}
        />
        <Route
          path="/cart"
          render={(props) => (
            <ShoppingCart
              {...props}
              cart={cart}
              removeFromCart={removeFromCart}
            />
          )}
        />
        <Route path="/checkout" component={CheckoutForm} />
      </Router>
    </div>
  );
}

export default App;
