import "./product.scss";

const Product = (props) => {
  const { product, action } = props;

  return (
    <div className="app-product-container">
      <div
        className="img"
        style={{
          backgroundImage: "url(" + product.img + ")",
          backgroundSize: "cover",
        }}
      ></div>
      <h4>{product.name}</h4>
      <p className="desc" title={product.description}>
        {product.description}
      </p>
      <p className="price">{product.price} PLN</p>
      <button onClick={() => action(product)}>Buy</button>
    </div>
  );
};

export default Product;
