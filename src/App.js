import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./Components/NavBar";
import ItemListContainer from "./Components/ItemListContainer";
import AlertMessage from "./Components/AlertMessage";
import ItemDetailContainer from "./Components/ItemDetailContainer";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [products, setProducts] = useState([
    { id: 1, name: "Camisa Roja", price: 20, stock: 10 },
    { id: 2, name: "Camisa Azul", price: 25, stock: 8 },
    { id: 3, name: "Camisa Amarilla", price: 30, stock: 5 },
  ]);

  const [cartOpen, setCartOpen] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    if (product.stock > 0) {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        )
      );

      setCartItems((prevItems) => {
        const existingProduct = prevItems.find((item) => item.id === product.id);

        if (existingProduct) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });

      setCartOpen(true);
      showAlert("¡Producto añadido al carrito!", "success");
    } else {
      showAlert("No hay stock disponible.", "danger");
    }
  };

  const removeFromCart = (id) => {
    const productInCart = cartItems.find((item) => item.id === id);

    if (productInCart) {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === id ? { ...p, stock: p.stock + 1 } : p
        )
      );

      setCartItems((prevItems) =>
        prevItems
          .map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)
      );

      showAlert("Producto retirado del carrito.", "info");
    }
  };

  const emptyCart = () => {
    cartItems.forEach((item) => {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === item.id ? { ...p, stock: p.stock + item.quantity } : p
        )
      );
    });

    setCartItems([]);
    showAlert("¡El carrito fue vaciado!", "danger");
  };

  const handlePurchase = () => {
    setCartItems([]);
    showAlert("¡Gracias por tu compra!", "success");
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
          emptyCart={emptyCart}
          removeFromCart={removeFromCart}
          products={products}
          setProducts={setProducts}
        />
        <ItemListContainer
          greeting="Bienvenido a nuestra tienda"
          addToCart={addToCart}
          products={products}
        />
        <ItemDetailContainer addToCart={addToCart} />
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
