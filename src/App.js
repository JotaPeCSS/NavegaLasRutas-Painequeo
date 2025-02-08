import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NavBar from "./Components/NavBar";
import CartWidget from "./Components/CartWidget";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Obtener productos desde Firebase
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
      }
    };

    fetchProducts();
  }, []);

  // Función para agregar productos al carrito
  const addToCart = async (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Actualizar stock en Firebase
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
  };

  // Función para eliminar un producto del carrito completamente
  const removeFromCart = async (productId) => {
    const removedProduct = cartItems.find((item) => item.id === productId);
    setCartItems(cartItems.filter((item) => item.id !== productId));

    if (removedProduct) {
      // Restaurar el stock en Firebase
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

  // Función para aumentar la cantidad de un producto en el carrito
  const increaseQuantity = async (product) => {
    if (product.stock > 0) {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );

      // Actualizar stock en Firebase
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

  // Función para reducir la cantidad de un producto en el carrito
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

  return (
    <>
      <NavBar cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <CartWidget
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        products={products}
        setProducts={setProducts}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products products={products} addToCart={addToCart} />} />
        <Route path="/producto/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
