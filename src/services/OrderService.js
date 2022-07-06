import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";

// The following class is to manage orders data.
// Orders data is retrieved from an existing API.
// I used the retrieved customer data as my orders data HOWEVER I didnt renamed them
// since it was very time consuming changing those fields at firestore side

const ordersCollection = collection(db, "orders");

class OrderService {
  getAll = async () => {
    const ordersSnapshot = await getDocs(ordersCollection);
    const ordersList = ordersSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return ordersList;
  };

  getCustomers(params) {
    const queryParams = params
      ? Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&")
      : "";
    return fetch(
      "https://www.primefaces.org/data/customers?" + queryParams
    ).then((res) => res.json());
  }
}
export default new OrderService();
