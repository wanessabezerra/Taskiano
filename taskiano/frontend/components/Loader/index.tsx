import React from "react";
import Modal from "../Modal";

import styles from "./styles.module.scss";

interface LoaderProps {
  isLoading?: boolean;
}

function Loader(props: LoaderProps) {
  return (
    <Modal className={props.isLoading ? "" : styles.none}>
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    </Modal>
  );
}

export default Loader;
