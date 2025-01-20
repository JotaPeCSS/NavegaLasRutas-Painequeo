import React from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  backButton: {
    marginTop: "10px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
  },
};

const ItemDetailContainer = ({ products, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.detailCard}>
        <h2>{product.name}</h2>
        <p>Precio: ${product.price}</p>
        <p>Stock: {product.stock}</p>
        <button
          style={styles.button}
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          Añadir al carrito
        </button>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)} // Navega hacia la página anterior
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
