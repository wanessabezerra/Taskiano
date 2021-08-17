import React, { useState } from "react";

import Modal from "../Modal";
import { ClockTimer } from "../ClockTimer";
import { MarkdownPreview } from "../MarkdownPreview";
import { RemainsFormatValue, RemainsFormatText } from "../../utils";

import styles from "./styles.module.scss";

interface TaskProps {
  id?: number;
  title: string;
  remainingTime?: number;
  note: string;
}

function Task(props: TaskProps) {
  const [showTasks, setShowTasks] = useState(false);

  function getDescription({ remainingTime = 0 }: { remainingTime?: number }) {
    if (remainingTime != 0) {
      const remainsTime = RemainsFormatValue(remainingTime);
      const reamainsTimeText = RemainsFormatText(remainingTime);

      return `${remainsTime} ${reamainsTimeText} - ${props.title}`;
    } else return props.title;
  }

  return (
    <div className={styles.taskContainer}>
      {showTasks && (
        <Modal className={styles.modal} close={() => setShowTasks(false)}>
          <div className={styles.taskModal}>
            <h1 className={styles.taskModalTitle}>{props.title}</h1>
            <MarkdownPreview
              className={styles.taskMarkdownPreview}
              note={props.note}
            ></MarkdownPreview>
          </div>
        </Modal>
      )}

      <div className={styles.timeContainer} onClick={() => setShowTasks(true)}>
        <ClockTimer remainingTime={props.remainingTime} />
        <h1 className={styles.timeRemains}>
          {getDescription({ remainingTime: props.remainingTime })}
        </h1>
      </div>
    </div>
  );
}

export default Task;
