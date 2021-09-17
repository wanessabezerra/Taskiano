import React from "react";
import dynamic from "next/dynamic";

import Selector from "./Selector";
import Compass from "../Compass";
import RenderTime from "./RenderTime";
import Carousel from "../Carousel";

import useTimersState from "./useTimersState";

import type { TaskType } from "../../@types";
import colors from "../../styles/colors";
import styles from "./styles.module.scss";

const CountdownCircleTimer = dynamic(
  () => import("../CountdownCircleTimerWrapper"),
  { ssr: false }
);

function Timers() {
  const state = useTimersState();

  const isActive = (task: TaskType) => {
    return task?.number === state.selectedTask?.number;
  };

  return (
    <div className={styles.container}>
      <div className={styles.countdown}>
        <div className={styles.projectSelector}>
          <Selector
            onChange={state.handleSelectProject}
            current={state.currentProjectIndex}
          >
            {state.currentProjects.map((project) => (
              <option className={styles.selectorOption} key={project.id}>
                {project.name}
              </option>
            ))}
          </Selector>
        </div>

        <h1 className={styles.title}>{state.selectedTask?.title}</h1>

        <CountdownCircleTimer
          isPlaying
          isLinearGradient
          key={state.selectedTask?.id}
          duration={state?.duration}
          initialRemainingTime={state.initialRemainingTime}
          colors={[
            [colors.highOrange, 0],
            [colors.highPurple, 1],
          ]}
        >
          {RenderTime}
        </CountdownCircleTimer>

        <Carousel howMany={3} infiniteScroll>
          {state.currentTasks?.map((task) => (
            <a
              key={task.id}
              className={styles.taskTag}
              onClick={() => state.handleSelectTask(task?.number)}
              style={{ color: isActive(task) ? colors.orange : colors.white }}
            >
              #{task.number}
            </a>
          ))}
        </Carousel>
      </div>

      <span className={styles.sepLine} />

      <div className={styles.compass}>
        <h1 className={styles.compassTitle}>Compasso</h1>
        <Compass />
      </div>
    </div>
  );
}

export default Timers;
