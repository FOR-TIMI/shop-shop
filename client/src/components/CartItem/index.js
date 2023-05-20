import React from "react";

import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const handleRemoveFromCart = () =>
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });

  const handleChange = (e) => {
    const value = e.target.value || 0.0;

    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div>
          {item.name}, ${item.price}
        </div>
        <div>
          <span>Qty:</span>
          <input
            onChange={handleChange}
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
          />
          <span
            style={{ cursor: "pointer" }}
            role="img"
            aria-label="trash"
            onClick={handleRemoveFromCart}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
