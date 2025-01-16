import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import ItemListContainer from "./Components/ItemListContainer";
import AlertMessage from "./Components/AlertMessage";

function App() {
  // Estado del carrito
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

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para añadir productos al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === product.id);

      if (existingProduct) {
        // Si el producto ya está en el carrito, aumenta la cantidad
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si el producto no está en el carrito, añádelo con cantidad 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    setCartOpen(true); // Abre el carrito al añadir un producto
    showAlert("¡Producto añadido al carrito!", "success");
  };

  // Función para vaciar el carrito con confirmación
  const emptyCart = () => {
    const confirmEmpty = window.confirm(
      "¿Estás seguro de que quieres vaciar tu carrito?"
    );
    if (confirmEmpty) {
      setCartItems([]); // Vacía el carrito
      showAlert("¡El carrito fue vaciado!", "danger");
    }
  };

  // Función para mostrar alertas
  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000); // Oculta la alerta después de 3 segundos
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Navbar que incluye el carrito */}
      <NavBar
        cartItems={cartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        emptyCart={emptyCart}
      />

      {/* Contenedor principal de productos */}
      <ItemListContainer
        greeting="Bienvenido a nuestra tienda"
        addToCart={addToCart}
      />

      {/* Componente de alertas */}
      <AlertMessage
        message={alert.message}
        show={alert.show}
        variant={alert.variant}
        onClose={() => setAlert({ ...alert, show: false })}
      />
    </div>
  );
}

export default App;
