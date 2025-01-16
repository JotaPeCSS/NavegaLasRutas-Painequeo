import React from "react";
import CartWidget from "./CartWidget";

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#343a40",
    color: "white",
    padding: "10px 20px",
    position: "relative",
  },
  logo: {
    height: "40px",
    cursor: "pointer",
  },
};

const NavBar = ({ cartItems, cartOpen, setCartOpen, emptyCart }) => {
  return (
    <nav style={styles.navbar}>
      <a href="/">
        <img src="./media/logo.png" alt="Tienda Logo" style={styles.logo} />
      </a>
      <CartWidget
        cartItems={cartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        emptyCart={emptyCart}
      />
    </nav>
  );
};

export default NavBar;
