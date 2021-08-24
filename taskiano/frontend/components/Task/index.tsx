import React, { useState } from "react";

import Modal from "../Modal";
import CheckBox from "../Checkbox";
import { ClockTimer } from "../ClockTimer";
import { MarkdownPreview } from "../MarkdownPreview";
import { getDescriptionTime } from "../../utils";

import styles from "./styles.module.scss";

interface TaskProps {
  id?: number;
  title?: string;
  remainingTime?: number;
  hideTimer?: boolean;
  hideCheckbox?: boolean;
  note?: string;
}

function Task({ remainingTime, ...props }: TaskProps) {
  const [showTasks, setShowTasks] = useState(false);

  const Description = () => {
    return (
      <>
        <ClockTimer remainingTime={remainingTime} />
        <p className={styles.description}>
          {getDescriptionTime({ remainingTime }) + " - " + props.title}
        </p>
      </>
    );
  };

  return (
    <>
      {showTasks && (
        <Modal className={styles.modal} close={() => setShowTasks(false)}>
          <div className={styles.taskModal}>
            <h1 className={styles.taskModalTitle}>{props.title}</h1>
            <MarkdownPreview
              className={styles.taskMarkdownPreview}
              note={props.note}
            />
          </div>
        </Modal>
      )}

      <div className={styles.taskContainer}>
        <div className={styles.timeContainer}>
          {!props.hideCheckbox && (
            <CheckBox className={styles.checkBox} onClick={() => {}} />
          )}

          <h1 className={styles.timeRemains} onClick={() => setShowTasks(true)}>
            {props.hideTimer ? props.title : <Description />}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Task;
