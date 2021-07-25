import { Weekday, WeekdaysPercent } from "../@types";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;
const weekSeconds = 604800;

const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: number) =>
    ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time: number) => (time / daySeconds) | 0;

const colors = ["#ff6363", "#ff7055", "#ff8f36", "#eab521", "#8be9fd"];

interface RemainingTimeProps {
    remainingTime: number;
}

export function selectColorByTime({ remainingTime }: RemainingTimeProps) {
    let value = "";

    if (remainingTime < minuteSeconds) {
        value = colors[0];
    } else if (remainingTime > minuteSeconds && remainingTime < hourSeconds) {
        value = colors[1];
    } else if (remainingTime > hourSeconds && remainingTime < daySeconds) {
        value = colors[2];
    } else if (remainingTime > daySeconds && remainingTime < weekSeconds) {
        value = colors[3];
    } else {
        value = colors[4];
    }

    return value;
}

export function RemainsFormatText({ remainingTime }: RemainingTimeProps) {
    let _reaminingTime = Math.abs(remainingTime);
    let text = "";

    if (_reaminingTime <= minuteSeconds) {
        text = "Seg(s)";
    } else if (_reaminingTime > minuteSeconds && _reaminingTime < hourSeconds) {
        text = "Min(s)";
    } else if (_reaminingTime > hourSeconds && _reaminingTime < daySeconds) {
        text = "Hora(s)";
    } else if (_reaminingTime > daySeconds && _reaminingTime < weekSeconds) {
        text = "Dia(s)";
    } else {
        text = "Semana(s)";
    }

    if (remainingTime > 0) {
        return text;
    } else {
        return text + " atrás";
    }
}

export function RemainsFormatValue({ remainingTime }: RemainingTimeProps) {
    let _reaminingTime = Math.abs(remainingTime);
    let value = 0;

    if (_reaminingTime < minuteSeconds) {
        value = _reaminingTime;
    } else if (_reaminingTime > minuteSeconds && _reaminingTime < hourSeconds) {
        value = Math.floor(_reaminingTime / minuteSeconds);
    } else if (_reaminingTime > hourSeconds && _reaminingTime < daySeconds) {
        value = Math.floor(_reaminingTime / hourSeconds);
    } else if (_reaminingTime > daySeconds && _reaminingTime < weekSeconds) {
        value = Math.floor(_reaminingTime / daySeconds);
    } else {
        value = Math.floor(_reaminingTime / weekSeconds);
    }

    return value;
}

export function MaxIndexByAttr(array: Weekday[]): Weekday {
    let max = array[0];

    for (let i = 1; i < array.length; i++) {
        if (array[i]["count"] > max["count"]) {
            max = array[i];
        }
    }
    return max;
}

export function MapPercentageOfMaxPerDay(array: Weekday[]): WeekdaysPercent[] {
    let max = MaxIndexByAttr(array);
    let percentage = 100 / max["count"];
    let result: WeekdaysPercent[] = [];

    for (let i = 0; i < array.length; i++) {
        result.push({
            day: array[i]["day"],
            count: Number(array[i]["count"]),
            percent: Math.round(array[i]["count"] * percentage),
        } as WeekdaysPercent);
    }
    return result;
}
