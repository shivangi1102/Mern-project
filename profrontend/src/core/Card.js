import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/carthelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({ 
  product,
  addtoCart=true,
  removeFromCart=false,
  setReload= f => f,
  reload=undefined,

}) => {
  const [redirect, setRedirect] = useState(false)
const [count, setCount] = useState(product.count)

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true))
  }
  const getARedirect = (redirect) => {
    if(redirect){
      return <Redirect to="/cart" />
    }
  }
  const showAddToCart = (addtoCart) =>{
    return(
      addtoCart && (
        <button
        onClick={addToCart}
        className="btn w-100 btn-block btn-outline-success mt-2 mb-2"
      >
        Add to Cart
      </button>
      )
    )

  }

  const showRemoveToCart = (removeFromCart) =>{
    return(
      removeFromCart && (
    <button
    onClick={() => {removeItemFromCart(product._id)
    setReload(!reload);
    }}
    className="btn w-100 btn-block btn-outline-danger mt-2 mb-2"
  >
    Remove from cart
  </button>
    )
    )
  }
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{product.name}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {product.description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {product.price}</p>
        <div className="row">
          <div className="col-12">
           {showAddToCart(addtoCart)}
          </div>
          <div className="col-12">
          {showRemoveToCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;