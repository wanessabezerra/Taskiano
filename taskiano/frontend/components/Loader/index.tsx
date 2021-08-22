import React from "react";
import Modal from "../Modal";

import styles from "./styles.module.scss";

function Loader() {
  return (
    <Modal>
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    </Modal>
  );
}

export default Loader;
