import { useContext } from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = ({ setCartClicked }) => {
  const { cartCount } = useContext(CartContext);

  return (
    <div
      className="cart-icon-container"
      onClick={() => setCartClicked((prevState) => !prevState)}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
