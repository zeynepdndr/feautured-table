import { useState, useEffect } from "react";
import { default as OrderService } from "../../services/OrderService";
import OrderTable from "./OrderTable";
import styles from "./Orders.module.css";
import TransparentBox from "../UI/TransparentBox";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  const getOrders = async () => {
    OrderService.getAll()
      .then((orders) => {
        setOrders(orders);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {}, [orders]);

  return (
    <TransparentBox>
      {error && <p>Ooops! Something went wrong</p>}
      {!error && <OrderTable items={orders} />}
    </TransparentBox>
  );
};

export default Orders;
