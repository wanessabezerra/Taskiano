import React from "react";
import TaskStatus from "../../../components/TasksStatus";
import UserScore from "../../../components/UserScore";
import { lateTasks, nextTasks } from "../../../services/api";

import styles from "./styles.module.scss";

function GlobalStatus() {
    return (
        <div className={styles.globalStatus}>
            <div className={styles.tasksStatusContainer}>
                <TaskStatus title="Próximas Tarefas" tasks={nextTasks} />

                <span className={styles.separator} />

                <TaskStatus title="Tarefas Atrasadas" tasks={lateTasks} />
            </div>
            <UserScore />
        </div>
    );
}

export default GlobalStatus;
