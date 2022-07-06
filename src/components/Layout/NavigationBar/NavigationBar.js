import { Link } from "react-router-dom";
import logo from "../../../img/logo.jpg";
import styles from "./NavigationBar.module.css";

const NavigationBar = (props) => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href={"https://tr.kuehne-nagel.com/en/"}>
            <img src={logo} alt="Kuehne Nagel" />
          </a>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Order</Link>
            </li>
            <li>
              <Link to={"/group"}>Group</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
