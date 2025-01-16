import React from "react";
import { useParams } from "react-router-dom";

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  detailCard: {
    padding: "20px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
    maxWidth: "600px",
    margin: "20px auto",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

const ItemDetailContainer = ({ addToCart }) => {
  const { id } = useParams();

  const productDetails = {
    1: { name: "Camisa Roja", price: 20, stock: 10, description: "Una camisa roja vibrante y cómoda para cualquier ocasión." },
    2: { name: "Camisa Azul", price: 25, stock: 8, description: "Camisa azul con estilo moderno y elegante." },
    3: { name: "Camisa Amarilla", price: 30, stock: 5, description: "Camisa amarilla de algodón, ideal para días soleados." },
  };

  const product = productDetails[id];

  if (!product) {
    return <p style={{ textAlign: "center" }}>Producto no encontrado.</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.detailCard}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Precio: ${product.price.toFixed(2)}</p>
        <p>Stock: {product.stock}</p>
        <button style={styles.button} onClick={() => addToCart(product)}>
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
