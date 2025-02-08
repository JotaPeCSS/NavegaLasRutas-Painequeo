import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Supongamos que tenemos el ID de usuario disponible
    const userId = "usuario123";  // Esto debería ser dinámico según el usuario logueado

    const fetchPurchases = async () => {
      try {
        const q = query(collection(db, "compras"), where("usuarioId", "==", userId));
        const querySnapshot = await getDocs(q);
        
        const purchasesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPurchases(purchasesData);
      } catch (error) {
        console.error("Error al obtener compras:", error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mis Compras</h2>
      {purchases.length > 0 ? (
        purchases.map((purchase) => (
          <div key={purchase.id} style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "10px" }}>
            <h3>Compra #{purchase.id}</h3>
            <p><strong>Estado:</strong> {purchase.estado}</p>
            <p><strong>Total:</strong> ${purchase.total.toFixed(2)}</p>
            <p><strong>Fecha:</strong> {new Date(purchase.fecha.seconds * 1000).toLocaleDateString()}</p>

            <div>
              <h4>Productos:</h4>
              <ul>
                {purchase.productos.map((item) => (
                  <li key={item.id}>
                    {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No has realizado compras aún.</p>
      )}
    </div>
  );
};

export default MyPurchases;
