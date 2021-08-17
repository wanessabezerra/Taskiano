import React from "react";
import { useAuth } from "../../hooks/useAuth";

import styles from "./styles.module.scss";

function UserScore() {
  const { user } = useAuth();

  return (
    <div className={styles.userScore}>
      <h1 className={styles.title}>Score</h1>
      <p className={styles.score}>{user?.score}</p>
    </div>
  );
}

export default UserScore;
