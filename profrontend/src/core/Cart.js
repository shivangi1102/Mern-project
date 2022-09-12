import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import { loadCart } from "./helper/carthelper";
import Card from "./Card";
import Payment from "./Payment";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadALLProduct = (product) => {
    return (
      <div>
        <h2>This section is for load product</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addtoCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

 
 
  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <h1 className="text-white"> Products</h1>
        <div className="row">
          <div className="col-6">
            {products.length > 0 ? loadALLProduct(products) : <h3>No products</h3>}
          </div>
          <div className="col-6"><Payment products={products} setReload={setReload} /></div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
