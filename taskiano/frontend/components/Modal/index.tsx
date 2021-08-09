import React, { ReactNode } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import styles from "./styles.module.scss";

interface ModalProps {
  className?: string;
  children: ReactNode;
  close: () => void;
}

function Modal(props: ModalProps) {
  return (
    <div className={`${styles.modal} ${props.className}`}>
      <div className={styles.modalContainer} />
      {props.children}
      <AiFillCloseCircle className={styles.closeModal} onClick={props.close} />
    </div>
  );
}

export default Modal;
