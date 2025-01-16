import React, { useState } from "react";

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  greeting: {
    marginBottom: "20px",
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
    borderRadius: "5px",
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
};

const ItemListContainer = ({ greeting, addToCart }) => {
  const [products, setProducts] = useState([
    { id: 1, name: "Camisa Roja", price: 20, stock: 10 },
    { id: 2, name: "Camisa Azul", price: 25, stock: 8 },
    { id: 3, name: "Camisa Amarilla", price: 30, stock: 5 },
  ]);

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      addToCart(product); // Añadimos el producto al carrito
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        )
      );
    } else {
      alert(`El producto ${product.name} no tiene stock disponible.`);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.greeting}>{greeting}</h2>
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <p>{product.name}</p>
            <p>${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <button
              style={styles.button}
              onClick={() => handleAddToCart(product)}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Sin Stock" : "Añadir al Carrito"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
