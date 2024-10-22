import { useState, useEffect } from "react";
import "./cart.scss";

const Cart = (props) => {
  const { cart } = props;
  const [localCart, setLocalCart] = useState([]);

  const getTotalPrice = () => {
    let totalPrice = 0;
    let discountApplied = false;

    cart.forEach((product) => {
      if (!discountApplied && totalPrice > 6000) {
        totalPrice += product.price * 0.5;
        discountApplied = true;
      } else {
        totalPrice += product.price;
      }
    });

    return totalPrice.toFixed(2);
  };

  const getDiscountedPrice = (product) => {
    if (getTotalPrice() > 6000) {
      return 0.5;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    const localCartHelper = [];

    cart.forEach((product) => {
      const existingProduct = localCartHelper.find(
        (group) => group.id === product.id
      );

      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        product.count = 1;
        localCartHelper.push(product);
      }
    });

    setLocalCart([...localCartHelper]);
  }, [cart]);

  return (
    <div className="app-cart-container animate__animated animate__backInDown">
      <h2>Koszyk</h2>
      {localCart.map((product) => (
        <p key={product.id} className="product">
          {product.name} {product.count}x -{" "}
          {(product.price * getDiscountedPrice(product)).toFixed(2)} PLN
        </p>
      ))}
      <p className="total">Razem: {getTotalPrice()} PLN</p>
    </div>
  );
};

export default Cart;
