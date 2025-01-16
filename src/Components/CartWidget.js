import React, { useState, useEffect } from "react";
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
    width: "250px",
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    zIndex: "1000",
  },
  alertContainer: {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "1001",
    maxWidth: "400px",
    textAlign: "center",
  },
  alert: {
    borderRadius: "8px",
    backgroundColor: "#ffc107",
    color: "#fff",
    padding: "10px",
    fontWeight: "bold",
  },
  buttonGreen: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
  buttonRed: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
};

const CartWidget = ({ cartItems, cartOpen, setCartOpen, emptyCart }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  useEffect(() => {
    // Guardar el contenido del carrito en localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleEmptyCart = () => {
    setShowConfirmation(true); // Mostrar mensaje de confirmación
  };

  const handleConfirmEmptyCart = () => {
    emptyCart(); // Vaciar el carrito
    setShowConfirmation(false); // Ocultar mensaje de confirmación
  };

  const handleCancelEmptyCart = () => {
    setShowConfirmation(false); // Ocultar mensaje de confirmación sin vaciar el carrito
  };

  const handlePurchase = () => {
    alert("¡Gracias por tu compra! El carrito ha sido vaciado.");
    emptyCart(); // Vaciar el carrito tras la compra, sin mostrar confirmación
  };

  return (
    <div style={styles.cartWidget}>
      {/* Ícono del carrito */}
      <span
        className="material-symbols-outlined"
        style={styles.icon}
        onClick={() => setCartOpen(!cartOpen)}
      >
        shopping_cart
      </span>

      {/* Confirmación para vaciar el carrito */}
      {showConfirmation && (
        <div style={styles.alertContainer}>
          <Alert style={styles.alert}>
            <h4>¿Estás seguro?</h4>
            <p>Esto eliminará todos los productos del carrito.</p>
            <div>
              <button
                style={{ ...styles.buttonGreen, marginRight: "10px" }}
                onClick={handleCancelEmptyCart}
              >
                Cancelar
              </button>
              <button style={styles.buttonRed} onClick={handleConfirmEmptyCart}>
                Confirmar
              </button>
            </div>
          </Alert>
        </div>
      )}

      {/* Dropdown del carrito */}
      {cartOpen && (
        <div style={styles.dropdown}>
          <h4>Carrito</h4>
          {cartItems.length > 0 ? (
            <>
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index}>
                    {item.name} (x{item.quantity}) - $
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p>Total: ${total}</p>
              <button style={styles.buttonRed} onClick={handleEmptyCart}>
                Vaciar Carrito
              </button>
              <button
                style={{
                  ...styles.buttonGreen,
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