import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  productGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  productCard: {
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    textAlign: "center",
    maxWidth: "250px",
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

const ItemListContainer = ({ greeting, addToCart }) => {  // ✅ Recibe addToCart correctamente
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Productos"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h2>{greeting}</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div style={styles.productGrid}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} style={styles.productCard}>
                <p>{product.name}</p>
                <p>Precio: ${product.price.toFixed(2)}</p>
                <p>Stock: {product.stock}</p>
                <Link to={`/producto/${product.id}`}>
                  <button style={styles.button}>Ver detalle</button>
                </Link>
                <button
                  style={product.stock > 0 ? styles.button : styles.disabledButton}
                  onClick={() => addToCart(product)}  // ✅ Funciona correctamente
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
                </button>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;
