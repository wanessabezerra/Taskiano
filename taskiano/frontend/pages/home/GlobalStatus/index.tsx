import React from "react";
import Confetti from "../../../components/Confetti";

import TaskStatus from "../../../components/TasksStatus";
import UserScore from "../../../components/UserScore";

import { useTasks } from "../../../hooks/useTasks";

import { selectNextTasks, selectOverdueTasks } from "../../../utils";
import styles from "./styles.module.scss";

function GlobalStatus() {
  const tasks = useTasks((state) => state.tasks);
  const nextTasks = selectNextTasks(tasks, 3);
  const overdueTasks = selectOverdueTasks(tasks, 3);

  const nextTasksOnEmpty = () => {
    return overdueTasks?.length === 0
      ? "Tudo pronto 😏"
      : "Nada em um futuro proxímo";
  };

  const overdueTasksOnEmpty = () => {
    return nextTasks?.length === 0
      ? "Tudo pronto 😏"
      : "Parabéns, seu score agradece";
  };

  return (
    <div className={styles.globalStatus}>
      <div className={styles.tasksStatusContainer}>
        {(nextTasks && nextTasks.length > 0) ||
        (overdueTasks && overdueTasks.length > 0) ? (
          <>
            <TaskStatus
              title="Próximas Tarefas"
              tasks={nextTasks ?? []}
              onEmpty={nextTasksOnEmpty()}
            />

            <span className={styles.separator} />

            <TaskStatus
              title="Tarefas Atrasadas"
              tasks={overdueTasks ?? []}
              onEmpty={overdueTasksOnEmpty()}
            />
          </>
        ) : (
          <Confetti className={styles.allDone}>
            <h2>
              Tudo pronto 🎉 <br />
              Qual a proxíma tarefa?
            </h2>
          </Confetti>
        )}
      </div>
      <UserScore />
    </div>
  );
}

export default GlobalStatus;
