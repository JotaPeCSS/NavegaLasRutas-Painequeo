import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

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
  disabledButton: {
    marginTop: "10px",
    backgroundColor: "#ccc",
    color: "#666",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "not-allowed",
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

const ItemDetailContainer = ({ addToCart }) => {  // ✅ Recibe addToCart correctamente como prop
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "Productos", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          console.error("Producto no encontrado.");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.detailCard}>
        <h2>{product.name}</h2>
        <p>Precio: ${product.price.toFixed(2)}</p>
        <p>Stock: {product.stock}</p>
        <button
          style={product.stock > 0 ? styles.button : styles.disabledButton}
          onClick={() => addToCart(product)}  // ✅ Funciona correctamente
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
        </button>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)} // ✅ Navega hacia la página anterior
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
