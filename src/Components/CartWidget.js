import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const CartWidget = ({ cartItems = [], setCartItems, cartOpen, setCartOpen, products, setProducts }) => {

  // Aumentar cantidad en carrito y actualizar stock
  const increaseQuantity = async (product) => {
    if (product.stock > 0) {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );

      // Reducir stock en Firebase
      const productRef = doc(db, "Productos", product.id);
      try {
        await updateDoc(productRef, { stock: product.stock - 1 });
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id ? { ...p, stock: p.stock - 1 } : p
          )
        );
      } catch (error) {
        console.error("Error al actualizar stock:", error);
      }
    }
  };

  // Reducir cantidad en carrito y restaurar stock después de 1 segundo
  const decreaseQuantity = async (product) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    // Restaurar stock en Firebase después de 1 segundo
    setTimeout(async () => {
      const productRef = doc(db, "Productos", product.id);
      try {
        await updateDoc(productRef, { stock: product.stock + 1 });
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id ? { ...p, stock: p.stock + 1 } : p
          )
        );
      } catch (error) {
        console.error("Error al restaurar stock:", error);
      }
    }, 1000);
  };

  // Eliminar producto completamente del carrito y restaurar stock
  const removeFromCart = async (productId) => {
    const removedProduct = cartItems.find((item) => item.id === productId);
    setCartItems(cartItems.filter((item) => item.id !== productId));

    if (removedProduct) {
      // Restaurar stock en Firebase
      const productRef = doc(db, "Productos", productId);
      try {
        await updateDoc(productRef, { stock: removedProduct.stock + removedProduct.quantity });
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === productId ? { ...p, stock: p.stock + removedProduct.quantity } : p
          )
        );
      } catch (error) {
        console.error("Error al restaurar stock:", error);
      }
    }
  };

  // Vaciar carrito y restaurar stock
  const clearCart = async () => {
    if (!cartItems || cartItems.length === 0) return;

    for (const item of cartItems) {
      const productRef = doc(db, "Productos", item.id);
      try {
        await updateDoc(productRef, { stock: item.stock + item.quantity });
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === item.id ? { ...p, stock: p.stock + item.quantity } : p
          )
        );
      } catch (error) {
        console.error("Error al restaurar stock:", error);
      }
    }

    setCartItems([]);
  };

  // Simular compra y vaciar carrito
  const handlePurchase = async () => {
    if (!cartItems || cartItems.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    alert("¡Compra realizada con éxito!");
    setCartItems([]);
  };

  return (
    <div style={{ 
      position: "absolute", right: "20px", top: "60px", 
      background: "white", padding: "20px", borderRadius: "8px", 
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", width: "320px"
    }}>
      <h3>Carrito de Compras</h3>
      {cartItems.length > 0 ? (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {cartItems.map((item) => (
            <li key={item.id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
              <strong>{item.name} <span>(x{item.quantity})</span></strong>
              <p>Precio Unitario: ${item.price.toFixed(2)}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              
              {/* Botones de incrementar, disminuir y eliminar */}
              <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
                <button 
                  onClick={() => increaseQuantity(item)}
                  style={{ backgroundColor: "green", color: "white", padding: "5px", borderRadius: "5px", border: "none", cursor: "pointer" }}
                >
                  ➕
                </button>
                <button 
                  onClick={() => decreaseQuantity(item)}
                  style={{ backgroundColor: "red", color: "white", padding: "5px", borderRadius: "5px", border: "none", cursor: "pointer" }}
                >
                  ➖
                </button>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ backgroundColor: "orange", color: "white", padding: "5px", borderRadius: "5px", border: "none", cursor: "pointer" }}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>El carrito está vacío</p>
      )}

      {cartItems.length > 0 && (
        <>
          <h4>Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</h4>
          <button 
            onClick={handlePurchase}
            style={{ backgroundColor: "#007bff", color: "white", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer", width: "100%", marginTop: "10px" }}
          >
            Comprar
          </button>
          <button 
            onClick={clearCart}
            style={{ backgroundColor: "#dc3545", color: "white", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer", width: "100%", marginTop: "10px" }}
          >
            Vaciar Carrito
          </button>
        </>
      )}
    </div>
  );
};

export default CartWidget;
