import React, { useState } from "react";

import View from "./View";
import CheckBox from "../Checkbox";
import { ClockTimer } from "../ClockTimer";
import { getDescriptionTime } from "../../utils";

import { useTasks } from "../../hooks/useTasks";

import type { TaskType } from "../../@types";
import styles from "./styles.module.scss";

interface TaskProps extends TaskType {
  hideTimer?: boolean;
  hideCheckbox?: boolean;
}

function Task({ remainingTime, ...props }: TaskProps) {
  const [viewTask, setViewTask] = useState(false);

  const openTask = useTasks((ctx) => ctx.openTask);
  const close = useTasks((ctx) => ctx.close);

  return (
    <>
      {viewTask && (
        <View task={props} onClose={() => setViewTask(false)}></View>
      )}

      <div className={styles.taskContainer}>
        <div className={styles.timeContainer}>
          {!props.hideCheckbox && (
            <CheckBox
              className={styles.checkBox}
              checked={props.status === "2"}
              onClick={async () => {
                props.status === "1"
                  ? await close(props.id)
                  : await openTask(props.id);
              }}
            />
          )}

          <h1 className={styles.timeRemains} onClick={() => setViewTask(true)}>
            {props.hideTimer ? (
              props.title
            ) : (
              <>
                <ClockTimer remainingTime={remainingTime} />
                <p className={styles.description}>
                  {getDescriptionTime(remainingTime)} - {props.title}
                </p>
              </>
            )}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Task;
