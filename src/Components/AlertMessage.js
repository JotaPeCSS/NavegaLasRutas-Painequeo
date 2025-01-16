import React from "react";
import { Alert } from "react-bootstrap";

const styles = {
  customAlert: {
    backgroundColor: "#ffc107", // Fondo amarillo
    color: "white", // Texto blanco
    border: "none",
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1050,
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
    maxWidth: "300px",
    textAlign: "center",
  },
};

const AlertMessage = ({ message, show, variant, onClose }) => {
  if (!show) return null;

  return (
    <Alert variant={variant} style={styles.customAlert} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
};

export default AlertMessage;
