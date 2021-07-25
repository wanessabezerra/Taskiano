import React from "react";

import Task from "../Task";
import { TaskType } from "../../@types/Task";

import styles from "./styles.module.scss";

interface TaskStatusProps {
    title: string;
    tasks: Array<TaskType>;
}

function TaskStatus(props: TaskStatusProps) {
    return (
        <div className={styles.taskStatusContainer}>
            <h1 className={styles.taskListTitle}>{props.title}</h1>
            <div className={styles.tasksList}>
                {props.tasks.map((task, index) => (
                    <Task key={index} {...task} />
                ))}
            </div>
        </div>
    );
}

export default TaskStatus;
