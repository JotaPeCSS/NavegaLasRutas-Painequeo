import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = ({ products, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Buscar el producto por su ID
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Producto no encontrado</h2>
        <button 
          style={{ backgroundColor: "blue", color: "white", padding: "8px", borderRadius: "5px", border: "none", cursor: "pointer", marginTop: "10px" }}
          onClick={() => navigate("/productos")}
        >
          Volver a Productos
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{product.name}</h2>
      <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p><strong>Categoría:</strong> {product.category}</p>
      
      <button
        style={{ backgroundColor: "green", color: "white", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer", marginTop: "10px" }}
        onClick={() => addToCart(product)}
        disabled={product.stock <= 0}
      >
        Añadir al carrito
      </button>
      
      <br />

      <button 
        style={{ backgroundColor: "blue", color: "white", padding: "8px", borderRadius: "5px", border: "none", cursor: "pointer", marginTop: "10px" }}
        onClick={() => navigate("/productos")}
      >
        Volver a Productos
      </button>
    </div>
  );
};

export default ProductDetail;
