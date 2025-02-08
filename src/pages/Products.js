import React from "react";
import { useNavigate } from "react-router-dom";

const Products = ({ products, addToCart }) => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Nuestros Productos</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", width: "250px" }}>
              <h3>{product.name}</h3>
              <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <button
                style={{ backgroundColor: "blue", color: "white", padding: "8px", borderRadius: "5px", border: "none", cursor: "pointer" }}
                onClick={() => navigate(`/producto/${product.id}`)}
              >
                Ver Detalle
              </button>
              <button
                style={{ backgroundColor: "green", color: "white", padding: "8px", borderRadius: "5px", border: "none", cursor: "pointer", marginTop: "5px" }}
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
              >
                Añadir al carrito
              </button>
            </div>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  );
};

export default Products;
