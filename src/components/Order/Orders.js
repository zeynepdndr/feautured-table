import { useState, useEffect } from "react";
import { default as OrderService } from "../../services/OrderService";
import OrderTable from "./OrderTable";
import TransparentBox from "../UI/TransparentBox";

// The following component is shown on Order Tab.
// It shows a table for orders wrapping TransparentBox component when there is no error

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
