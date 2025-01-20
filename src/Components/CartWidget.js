import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

const styles = {
  cartWidget: {
    position: "relative",
    cursor: "pointer",
  },
  icon: {
    fontSize: "24px",
    color: "white",
  },
  dropdown: {
    position: "absolute",
    right: "0",
    top: "30px",
    width: "300px",
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    zIndex: "1000",
  },
  buttonAdd: {
    backgroundColor: "#28a745", // Verde para el botón "+"
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
  },
  buttonRemove: {
    backgroundColor: "#dc3545", // Rojo para el botón "-"
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
  },
  buttonVaciar: {
    backgroundColor: "#ffc107", // Amarillo para "Vaciar Carrito"
    color: "#333",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonComprar: {
    backgroundColor: "#007bff", // Azul para "Comprar"
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    marginLeft: "10px",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    color: "#666",
    cursor: "not-allowed",
  },
};

const CartWidget = ({ cartItems, setCartItems, cartOpen, setCartOpen, products, setProducts }) => {
  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const increaseQuantity = (id) => {
    const product = products.find((p) => p.id === id);
    if (product && product.stock > 0) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === id ? { ...p, stock: p.stock - 1 } : p
        )
      );
    }
  };

  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      if (item.quantity > 1) {
        // Reduce la cantidad del producto en el carrito
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === id ? { ...p, stock: p.stock + 1 } : p
          )
        );
      } else {
        // Elimina el producto del carrito si la cantidad es 1
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === id ? { ...p, stock: p.stock + 1 } : p
          )
        );
      }
    }
  };

  const handleEmptyCart = () => {
    cartItems.forEach((item) => {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === item.id ? { ...p, stock: p.stock + item.quantity } : p
        )
      );
    });
    setCartItems([]);
    alert("¡El carrito ha sido vaciado!");
  };

  const handlePurchase = () => {
    setCartItems([]);
    alert("¡Gracias por tu compra!");
  };

  return (
    <div style={styles.cartWidget}>
      <span
        className="material-symbols-outlined"
        style={styles.icon}
        onClick={() => setCartOpen(!cartOpen)}
      >
        shopping_cart
      </span>

      {cartOpen && (
        <div style={styles.dropdown}>
          <h4>Carrito</h4>
          {cartItems.length > 0 ? (
            <>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                    <div>
                      <button
                        style={styles.buttonAdd}
                        onClick={() => increaseQuantity(item.id)}
                        disabled={products.find((p) => p.id === item.id)?.stock === 0}
                      >
                        +
                      </button>
                      <button
                        style={styles.buttonRemove}
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <p>Total: ${total}</p>
              <button style={styles.buttonVaciar} onClick={handleEmptyCart}>
                Vaciar Carrito
              </button>
              <button
                style={{
                  ...styles.buttonComprar,
                  ...(cartItems.length === 0 ? styles.buttonDisabled : {}),
                }}
                onClick={handlePurchase}
                disabled={cartItems.length === 0}
              >
                Comprar
              </button>
            </>
          ) : (
            <p>No hay productos en el carrito.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CartWidget;
