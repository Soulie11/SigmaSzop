import { useState } from "react"; 
import "./header.scss";
import CartIcon from "./cart.icon";
import { Cart } from "./../";

const Header = (props) => {
    const { cart } = props;
    const [cartState, setCartState] = useState(false);
    const title = "Shop";

    const showCart = () => setCartState(!cartState);

    return(
        <div className="app-header-container">
            <header>
                <div className="header container">
                    <h1>{title}</h1>
                    <CartIcon 
                        onClick={showCart} 
                        width={30} />
                </div>
            </header>
            {cartState && <Cart cart={cart} />}
        </div>
    )
}

export default Header;