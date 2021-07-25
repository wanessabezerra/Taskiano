import React from "react";
import { ClockTimer } from "../../shared/ClockTimer/index.style";
import { RemainsFormatValue, RemainsFormatText } from "../../utils";

import styles from "./styles.module.scss";

interface TaskProps {
    id: number;
    remainingTime: number;
    title: string;
}

function Task({ remainingTime, ...props }: TaskProps) {
    const description = `${RemainsFormatValue({
        remainingTime,
    })} ${RemainsFormatText({ remainingTime })} - ${props.title}}`;

    return (
        <div className={styles.taskContainer}>
            <div className={styles.timeContainer}>
                <ClockTimer remainingTime={remainingTime} />
                <h1 className={styles.timeRemains}>{description}</h1>
            </div>
        </div>
    );
}

export default Task;
