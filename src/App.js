import "./App.scss";
import { Header, Product, Footer } from "./components";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const getData = async () => {
    const response = await axios.get("/products.json");
    const data = response.data;

    setProducts(data);
  };

  const showAllProducts = () => setSelectedCategory("");

  const getCategories = (products) => {
    const categoriesHelper = [];

    products.forEach((product) =>
      categoriesHelper.includes(product.category)
        ? undefined
        : categoriesHelper.push(product.category)
    );

    setCategories([...categoriesHelper]);
  };

  const addToCart = (product) => setCart([...cart, product]);

  const selectCategory = (category) => setSelectedCategory(category);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getCategories(products);
  }, [products]);

  return (
    <div className="App">
      <Header cart={cart} />
      <div className="categories container">
        <button
          className={selectedCategory === "" ? "active" : ""}
          onClick={showAllProducts}
        >
          All Products
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => selectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="products container">
        {products
          .filter((product) =>
            selectedCategory ? product.category === selectedCategory : product
          )
          .map((product) => (
            <Product key={product.id} product={product} action={addToCart} />
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
