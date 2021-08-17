import React from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

import Compass from "../Compass";
import Selector from "./Selector";
import RenderTime from "./RenderTime";
import Carousel from "../Carousel";

import { tasks, weekdays } from "../../services/api";

import colors from "../../styles/variables";
import styles from "./styles.module.scss";

function Timers() {
  return (
    <div className={styles.container}>
      <div className={styles.projectSelector}>
        <h1 className={styles.title}>Projeto</h1>
        <Selector />
      </div>

      <h1 className={styles.countdownTitle}>Timer + Próximo</h1>

      <div className={styles.countdownDescription}>
        Organizar repositório da disciplina...
      </div>

      <CountdownCircleTimer
        isPlaying
        isLinearGradient
        duration={60}
        colors={[
          [colors.highOrange, 0],
          [colors.highPurple, 1],
        ]}
        onComplete={() => [true, 1000]}
      >
        {RenderTime}
      </CountdownCircleTimer>

      <Carousel gap={2} howMany={3}>
        {tasks.map((task, index) => (
          <a key={index} className={styles.taskTag}>
            #{task.number}
          </a>
        ))}
      </Carousel>

      <span className={styles.sepLine} />

      <div className={styles.compass}>
        <h1 className={styles.compassTitle}>Compasso</h1>
        <Compass weekdays={weekdays} />
      </div>
    </div>
  );
}

export default Timers;
