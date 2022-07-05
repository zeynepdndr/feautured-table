import { useState, useEffect } from "react";
import { default as OrderService } from "../../services/Orders";
import OrderTable from "./OrderTable";

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
    <>
      {error && <p>Ooops! Something went wrong</p>}
      {!error && <OrderTable items={orders} />}
    </>
  );
};

export default Orders;
