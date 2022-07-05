import NavigationBar from "./NavigationBar/NavigationBar";
import styles from "./Layout.module.css";

const Layout = (props) => {
  return (
    <>
      <NavigationBar />
      <main className={styles.main}>{props.children}</main>
    </>
  );
};

export default Layout;
