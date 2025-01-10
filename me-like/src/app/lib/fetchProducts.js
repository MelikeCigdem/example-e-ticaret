import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchProducts() {
  const products = [];
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error("Error fetching products:", e);
  }
  return products;
}
