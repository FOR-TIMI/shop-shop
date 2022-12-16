import React,{useEffect} from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';

import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';

function ProductList() {

  //Global state
  const [state,dispatch] = useStoreContext()

  const { products } = state;
  
  // graphQL API data
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect( () => {
    if(data){
      dispatch({
        type : UPDATE_PRODUCTS,
        products: data.products
      })
    }
  },[data,dispatch])


  // const products = data?.products || [];

  function filterProducts() {
    if (!state.currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === state.currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
