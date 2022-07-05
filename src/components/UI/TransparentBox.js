import styles from "./TransparentBox.module.css";

function TransparentBox(props) {
  return (
    <div className={`${styles.transparentBox} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default TransparentBox;
