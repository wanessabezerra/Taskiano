import React from "react";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

import styles from "./styles.module.scss";
import { RemainsFormatValue, RemainsFormatText } from "./RemainsFormat";
import Carousel from "../Carousel";
import { TaskTag } from "./components/TaskTag.style";
import Compass from "../Compass";
import { Weekday } from "../Compass/types";

interface TimersProps {}

const renderTime = (props: { remainingTime: number }) => {
    if (props.remainingTime === 0)
        return <div className={styles.countdownContent}>Tarde D+...</div>;

    return (
        <div className={styles.countdownContent}>
            <RemainsFormatValue remainingTime={props.remainingTime} />
            <RemainsFormatText remainingTime={props.remainingTime} />
        </div>
    );
};

function Timers(props: TimersProps) {
    const tasks = [
        { number: 42 },
        { number: 48 },
        { number: 51 },
        { number: 57 },
        { number: 84 },
        { number: 93 },
        { number: 102 },
    ];

    const weekdays: Weekday[] = [
        { day: "dom", count: 20 },
        { day: "seg", count: 33 },
        { day: "ter", count: 42 },
        { day: "qua", count: 37 },
        { day: "qui", count: 56 },
        { day: "sex", count: 34 },
        { day: "sab", count: 23 },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.projectSelector}>
                <h1 className={styles.title}>Projeto</h1>
                <div className={styles.selector}>
                    <div className={styles.selectorItem}>
                        <VscTriangleLeft />
                    </div>

                    <h1 className={styles.projectName}>UFRN</h1>

                    <div className={styles.selectorItem}>
                        <VscTriangleRight />
                    </div>
                </div>
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
                {renderTime}
            </CountdownCircleTimer>
            <div className={styles.taskSelector}>
                <Carousel showIndicator gap={2} howMany={3}>
                    {tasks.map((task, index) => (
                        <TaskTag key={index}>#{task.number}</TaskTag>
                    ))}
                </Carousel>
            </div>
            <div className={styles.sepLine}></div>
            <div className={styles.compass}>
                <h1 className={styles.compassTitle}>Compasso</h1>
                <Compass weekdays={weekdays}/>
            </div>
        </div>
    );
}

export default Timers;
