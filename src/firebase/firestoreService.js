import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Importa la configuración de Firebase

// 🔹 Función para obtener todos los productos desde Firestore
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return [];
  }
};

// 🔹 Función para agregar un nuevo producto a Firestore
export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, "productos"), product);
    console.log("Producto agregado con ID:", docRef.id);
  } catch (error) {
    console.error("Error agregando producto:", error);
  }
};
