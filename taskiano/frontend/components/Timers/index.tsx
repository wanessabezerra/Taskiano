import React from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { TaskTag } from "./TaskTag/index.style";

import Carousel from "../../shared/Carousel";
import Compass from "../Compass";
import Selector from "./Selector";

import { tasks, weekdays } from "../../services/api";

import styles from "./styles.module.scss";
import RenderTime from "./RenderTime";

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
                    ["#FF901A", 0],
                    ["#832CFF", 1],
                ]}
                onComplete={() => [true, 1000]}
            >
                {RenderTime}
            </CountdownCircleTimer>

            <Carousel gap={2} howMany={3}>
                {tasks.map((task, index) => (
                    <TaskTag key={index}>#{task.number}</TaskTag>
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
