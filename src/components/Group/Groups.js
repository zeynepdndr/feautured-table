import { useState, useEffect } from "react";
import { default as OrderService } from "../../services/Orders";
import TransparentBox from "../UI/TransparentBox";
// import styles from "./Group.module.css";

const Group = () => {
  const [Group, setOrders] = useState([]);
  const [error, setError] = useState(false);

  const getOrders = async () => {
    OrderService.getAll()
      .then((Group) => {
        setOrders(Group);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {}, [Group]);

  return <TransparentBox>hehyeye</TransparentBox>;
};

export default Group;
