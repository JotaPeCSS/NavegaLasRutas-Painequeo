import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "productos"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};

fetchData();
