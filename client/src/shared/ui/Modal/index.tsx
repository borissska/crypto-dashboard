import { FC } from "react";
import styles from "./Modal.module.scss";
import ReactDom from "react-dom";
import { IModalProps } from "./Modal.props";

const Modal: FC<IModalProps> = ({ children, navTo, ...props }) => {
  return ReactDom.createPortal(
    <div className={styles.modal} onClick={navTo}>
      <div className={styles.modal_info} onClick={(e) => e.stopPropagation()} {...props}>
        {/* <button onClick={navTo}>Close</button> */}
        {children}
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
