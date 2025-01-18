import React from "react";

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  productGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  productCard: {
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "3px",
    cursor: "pointer",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    color: "#666",
    border: "none",
    padding: "5px 10px",
    borderRadius: "3px",
    cursor: "not-allowed",
  },
};

const ItemListContainer = ({ greeting, products, addToCart }) => {
  return (
    <div style={styles.container}>
      <h2>{greeting}</h2>
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <p>{product.name}</p>
            <p>Precio: ${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <button
              style={product.stock > 0 ? styles.button : styles.disabledButton}
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
