import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import ItemListContainer from "./Components/ItemListContainer";
import AlertMessage from "./Components/AlertMessage";
import ItemDetailContainer from "./Components/ItemDetailContainer";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const [products, setProducts] = useState([
    { id: 1, name: "Camisa Roja", price: 20, stock: 10 },
    { id: 2, name: "Camisa Azul", price: 25, stock: 8 },
    { id: 3, name: "Camisa Amarilla", price: 30, stock: 5 },
  ]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === product.id);
      if (existingProduct) {
        if (product.stock > 0) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          showAlert("Sin stock disponible.", "danger");
          return prevItems;
        }
      } else {
        if (product.stock > 0) {
          return [...prevItems, { ...product, quantity: 1 }];
        } else {
          showAlert("Sin stock disponible.", "danger");
          return prevItems;
        }
      }
    });

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      )
    );

    setCartOpen(true);
    showAlert("Producto añadido al carrito.", "success");
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  return (
    <Router basename="/NavegaLasRutas-Painequeo">
      <div style={{ textAlign: "center", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <NavBar
          cartItems={cartItems}
          setCartItems={setCartItems}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          products={products}
          setProducts={setProducts}
        />

        <Routes>
        <Route
  path="/"
  element={
    <ItemListContainer
      greeting="Bienvenido a nuestra tienda"
      products={products}
      addToCart={addToCart}
    />
  }
/>
          <Route
            path="/producto/:id"
            element={<ItemDetailContainer products={products} addToCart={addToCart} />}
          />
        </Routes>

        <AlertMessage
          message={alert.message}
          show={alert.show}
          variant={alert.variant}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      </div>
    </Router>
  );
}

export default App;