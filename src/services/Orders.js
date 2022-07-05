import { db } from "../firebase.config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const ordersCollection = collection(db, "orders");

class Orders {
  getAll = async () => {
    const ordersSnapshot = await getDocs(ordersCollection);
    const ordersList = ordersSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return ordersList;
  };

  //   add = async (book) => {
  //     await addDoc(ordersCollection, book);
  //   };

  //   delete = async (id) => {
  //     const bookDoc = doc(db, "orders", id);
  //     await deleteDoc(bookDoc);
  //   };
}
export default new Orders();
