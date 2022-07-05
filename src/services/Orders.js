import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";

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
}
export default new Orders();
