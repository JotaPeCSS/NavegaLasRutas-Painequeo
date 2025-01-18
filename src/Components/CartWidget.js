import React, { useEffect } from "react";

const styles = {
  cartWidget: {
    position: "relative",
    cursor: "pointer",
  },
  icon: {
    fontSize: "24px",
    color: "white",
  },
  dropdown: {
    position: "absolute",
    right: "0",
    top: "30px",
    width: "300px",
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    zIndex: "1000",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    color: "#666",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "not-allowed",
    margin: "5px",
  },
};

const CartWidget = ({
  cartItems,
  setCartItems,
  cartOpen,
  setCartOpen,
  emptyCart,
  products,
  setProducts,
}) => {
  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Aumentar la cantidad de un producto y reducir su stock
  const increaseQuantity = (id) => {
    const productInStock = products.find((p) => p.id === id);

    if (productInStock && productInStock.stock > 0) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === id ? { ...p, stock: p.stock - 1 } : p
        )
      );
    }
  };

  // Disminuir la cantidad de un producto y aumentar su stock
  const decreaseQuantity = (id) => {
    const cartItem = cartItems.find((item) => item.id === id);

    if (cartItem && cartItem.quantity > 1) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === id ? { ...p, stock: p.stock + 1 } : p
        )
      );
    } else if (cartItem && cartItem.quantity === 1) {
      // Eliminar del carrito si queda solo una unidad
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === id ? { ...p, stock: p.stock + 1 } : p
        )
      );
    }
  };

  const handlePurchase = () => {
    alert("¡Gracias por tu compra!");
    setCartItems([]);
    // No hacemos nada con el stock, pues se supone que ya ha sido ajustado al comprar
  };

  return (
    <div style={styles.cartWidget}>
      <span
        className="material-symbols-outlined"
        style={styles.icon}
        onClick={() => setCartOpen(!cartOpen)}
      >
        shopping_cart
      </span>
      {cartOpen && (
        <div style={styles.dropdown}>
          <h4>Carrito</h4>
          {cartItems.length > 0 ? (
            <>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    {item.name} (x{item.quantity}) - $
                    {item.price.toFixed(2)}
                    <div>
                      <button
                        style={
                          products.find((p) => p.id === item.id)?.stock > 0
                            ? styles.button
                            : styles.disabledButton
                        }
                        onClick={() => increaseQuantity(item.id)}
                        disabled={
                          products.find((p) => p.id === item.id)?.stock === 0
                        }
                      >
                        +
                      </button>
                      <button
                        style={styles.button}
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <p>Total: ${total}</p>
              <button style={styles.button} onClick={emptyCart}>
                Vaciar Carrito
              </button>
              <button style={styles.button} onClick={handlePurchase}>
                Comprar
              </button>
            </>
          ) : (
            <p>No hay productos en el carrito.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CartWidget;
