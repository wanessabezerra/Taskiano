import React from "react";

import {AiFillCloseCircle} from "react-icons/ai";
import styles from "./styles.module.scss";

interface CreateTaskProps {
  close: () => void;
}

function CreateTask(props: CreateTaskProps) {
  return (
    <div className={styles.createTaskContainer}>
      <div className={styles.headerModal}>
        <div className={styles.title}>Criar nova tarefa</div>
        <AiFillCloseCircle className={styles.closeModal} onClick={props.close}/>
      </div>
    </div>
  );
}

export default CreateTask;
