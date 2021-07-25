import React from "react";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";

import styles from "./styles.module.scss";


function Selector() {
    return (
        <div className={styles.selector}>
            <div className={styles.selectorItem}>
                <VscTriangleLeft />
            </div>

            <h1 className={styles.projectName}>UFRN</h1>

            <div className={styles.selectorItem}>
                <VscTriangleRight />
            </div>
        </div>
    );
}

export default Selector;
