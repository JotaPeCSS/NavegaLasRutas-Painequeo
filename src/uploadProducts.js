import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const products = [
  {
    name: "Polera",
    price: 15.99,
    category: "Camisas",
    size: "M",
    color: "Rojo",
    stock: 10,
  },
  {
    name: "Poleron",
    price: 18.99,
    category: "Camisas",
    size: "L",
    color: "Azul",
    stock: 8,
  },
  {
    name: "Chaqueta",
    price: 14.99,
    category: "Camisas",
    size: "S",
    color: "Amarillo",
    stock: 12,
  },
];

const uploadProducts = async () => {
  const productsRef = collection(db, "products"); // 📂 Nombre de la colección

  try {
    for (const product of products) {
      await addDoc(productsRef, product);
      console.log(`Producto "${product.name}" agregado exitosamente.`);
    }
    console.log("✅ Todos los productos han sido subidos a Firestore.");
  } catch (error) {
    console.error("❌ Error subiendo productos:", error);
  }
};

uploadProducts();
