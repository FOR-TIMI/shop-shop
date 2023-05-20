import React, { useEffect } from "react";
import Auth from "../../utils/auth";
import CartItem from "../CartItem";

import { useStoreContext } from "../../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART, TOGGLE_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import "./style.css";

const Cart = () => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  //To open and close cart
  const toggleCart = () => dispatch({ type: TOGGLE_CART });

  //To calculate total price based on the cart
  const calculateTotal = () => {
    const { cart } = state;
    const price = cart
      .reduce(
        (total, currentProduct) =>
          (total += currentProduct.price * currentProduct.purchaseQuantity),
        0
      )
      .toFixed(2);

    return price;
  };

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
