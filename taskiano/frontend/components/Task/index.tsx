import React, { useState } from "react";

import Modal from "../Modal";
import { ClockTimer } from "../ClockTimer";
import { MarkdownPreview } from "../MarkdownPreview";
import { RemainsFormatValue, RemainsFormatText } from "../../utils";

import styles from "./styles.module.scss";

interface TaskProps {
  id: number;
  title: string;
  remainingTime: number;
  note: string;
}

function Task({ remainingTime, ...props }: TaskProps) {
  const [showTasks, setShowTasks] = useState(false);

  const remainsTime = RemainsFormatValue({ remainingTime });
  const reamainsTimeText = RemainsFormatText({ remainingTime });

  const description = `${remainsTime} ${reamainsTimeText} - ${props.title}`;

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
        <ClockTimer remainingTime={remainingTime} />
        <h1 className={styles.timeRemains}>{description}</h1>
      </div>
    </div>
  );
}

export default Task;
