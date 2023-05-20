import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import spinner from "../assets/spinner.gif";
import { QUERY_PRODUCTS } from "../utils/queries";

import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_PRODUCTS } from "../utils/actions";

function Detail() {
  //Global state
  const [state, dispatch] = useStoreContext();

  const { products } = state;

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const isRemoveButton = !state.cart.find((p) => p._id === currentProduct._id);

  const handleRemoveFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });
  };

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
    }
  }, [data, dispatch, products, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button>Add to Cart</button>
            {!isRemoveButton && (
              <button onClick={handleRemoveFromCart}>Remove from Cart</button>
            )}
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Detail;
