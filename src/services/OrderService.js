import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";

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

  getCustomersSmall() {
    return fetch("data/customers-small.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getCustomersMedium() {
    return fetch("data/customers-medium.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getCustomersLarge() {
    return fetch("data/customers-large.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getCustomersXLarge() {
    return fetch("data/customers-xlarge.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

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
