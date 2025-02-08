import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = ({ cartItems, setCartItems, cartOpen, setCartOpen }) => {
  return (
    <AppBar position="static" style={{ backgroundColor: "blue" }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Typography variant="h6">PotLand</Typography>
        </Link>

        <div style={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: "20px" }}>
          <Button component={Link} to="/" color="inherit">INICIO</Button>
          <Button component={Link} to="/productos" color="inherit">PRODUCTOS</Button>
          <Button component={Link} to="/nosotros" color="inherit">NOSOTROS</Button>
          <Button component={Link} to="/contacto" color="inherit">CONTACTO</Button>
        </div>

        <IconButton color="inherit" onClick={() => setCartOpen(!cartOpen)}>
          <ShoppingCartIcon />
        </IconButton>

        {/* ✅ Eliminar stock del carrito en la navbar */}
        <CartWidget cartItems={cartItems} setCartItems={setCartItems} cartOpen={cartOpen} setCartOpen={setCartOpen} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
