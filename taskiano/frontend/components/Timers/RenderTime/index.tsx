import React from "react";
import * as format from "../../../utils";

import styles from "./styles.module.scss";

const RemainsFormatValue = ({ remainingTime }: { remainingTime: number }) => {
    return (
        <div className={styles.RemainsFormatValue}>
            {format.RemainsFormatValue({ remainingTime })}
        </div>
    );
};

const RemainsFormatText = ({ remainingTime }: { remainingTime: number }) => {
    return (
        <div className={styles.RemainsFormatText}>
            {format.RemainsFormatText({ remainingTime })}
        </div>
    );
};

function RenderTime(props: { remainingTime: number }) {
    if (props.remainingTime === 0)
        return <div className={styles.countdownContent}>Tarde D+...</div>;

    return (
        <div className={styles.countdownContent}>
            <RemainsFormatValue remainingTime={props.remainingTime} />
            <RemainsFormatText remainingTime={props.remainingTime} />
        </div>
    );
}

export default RenderTime;
