import React from "react";

import styles from "./styles.module.scss";

function UserScore() {
    return (
        <div className={styles.userScore}>
            <h1 className={styles.title}>Score</h1>
            <p className={styles.score}>2560</p>
        </div>
    );
}

export default UserScore;
