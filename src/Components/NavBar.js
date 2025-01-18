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
  },
  logo: {
    height: "40px",
    cursor: "pointer",
  },
};

const NavBar = ({
  cartItems,
  setCartItems,
  cartOpen,
  setCartOpen,
  emptyCart,
  removeFromCart,
  products,
  setProducts,
}) => {
  return (
    <nav style={styles.navbar}>
      <a href="/">
        <img src="./media/logo.png" alt="Tienda Logo" style={styles.logo} />
      </a>
      <CartWidget
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        emptyCart={emptyCart}
        removeFromCart={removeFromCart}
        products={products}
        setProducts={setProducts}
      />
    </nav>
  );
};

export default NavBar;
