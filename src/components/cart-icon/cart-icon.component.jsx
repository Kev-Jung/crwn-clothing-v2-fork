import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

const CartIcon = ({ setCartClicked }) => {
  return (
    <div
      className="cart-icon-container"
      onClick={() => setCartClicked((prevState) => !prevState)}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
