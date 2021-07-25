import React from "react";
import styles from "./styles.module.scss";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;
const weekSeconds = 604800;

const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: number) =>
    ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time: number) => (time / daySeconds) | 0;

interface RemainsFormatTextProps {
    remainingTime: number;
}

export function RemainsFormatText(props: RemainsFormatTextProps) {
    let text = "";

    if (props.remainingTime <= minuteSeconds) {
        text = "Seg's";
    } else if (
        props.remainingTime > minuteSeconds &&
        props.remainingTime < hourSeconds
    ) {
        text = "Min's";
    } else if (
        props.remainingTime > hourSeconds &&
        props.remainingTime < daySeconds
    ) {
        text = "Hora's";
    } else if (
        props.remainingTime > daySeconds &&
        props.remainingTime < weekSeconds
    ) {
        text = "Dia's";
    } else {
        text = "Semana's";
    }

    return <div className={styles.RemainsFormatText}>{text}</div>;
}

interface RemainsFormatValueProps {
    remainingTime: number;
}

export function RemainsFormatValue(props: RemainsFormatValueProps) {
    let value = 0;

    if (props.remainingTime < minuteSeconds) {
        value = props.remainingTime;
    } else if (
        props.remainingTime > minuteSeconds &&
        props.remainingTime < hourSeconds
    ) {
        value = Math.floor(props.remainingTime / minuteSeconds);
    } else if (
        props.remainingTime > hourSeconds &&
        props.remainingTime < daySeconds
    ) {
        value = Math.floor(props.remainingTime / hourSeconds);
    } else if (
        props.remainingTime > daySeconds &&
        props.remainingTime < weekSeconds
    ) {
        value = Math.floor(props.remainingTime / daySeconds);
    } else {
        value = Math.floor(props.remainingTime / weekSeconds);
    }

    return <div className={styles.RemainsFormatValue}>{value}</div>;
}
