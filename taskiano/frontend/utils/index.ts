import type { Weekday, WeekdayPercent } from "../@types";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;
const weekSeconds = 604800;

const colors = ["#ff6363", "#ff7055", "#ff8f36", "#eab521", "#8be9fd"];

export function selectColorByTime(remainingTime: number) {
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

export function RemainsFormatText(remainingTime: number) {
  let _reaminingTime = Math.abs(remainingTime);
  let text = "";

  if (_reaminingTime <= minuteSeconds) {
    text = "Seg";
    if (remainingTime > 1) text += "'s";
  } else if (_reaminingTime > minuteSeconds && _reaminingTime < hourSeconds) {
    text = "Min";
    if (remainingTime >= minuteSeconds * 2) text += "'s";
  } else if (_reaminingTime > hourSeconds && _reaminingTime < daySeconds) {
    text = "Hora";
    if (remainingTime >= hourSeconds * 2) text += "s";
  } else if (_reaminingTime > daySeconds && _reaminingTime < weekSeconds) {
    text = "Dia";
    if (remainingTime >= daySeconds * 2) text += "s";
  } else {
    text = "Semana(s)";
  }

  if (remainingTime > 0) return text;
  else return text + " atrás";
}

export function RemainsFormatValue(remainingTime: number) {
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

  for (var index of array) {
    if (index["count"] > max["count"]) {
      max = index;
    }
  }

  return max;
}

export function MapPercentageOfMaxPerDay(array: Weekday[]): WeekdayPercent[] {
  let max = MaxIndexByAttr(array);
  let percentage = 100 / max["count"];
  let result: WeekdayPercent[] = [];

  for (var index of array) {
    result.push({
      day: index["day"],
      count: Number(index["count"]),
      percent: Math.round(index["count"] * percentage),
    } as WeekdayPercent);
  }

  return result;
}

interface getDescriptionTimeProps {
  remainingTime?: number;
}

export function getDescriptionTime({
  remainingTime = 0,
}: getDescriptionTimeProps) {
  const remainsTime = RemainsFormatValue(remainingTime);
  const reamainsTimeText = RemainsFormatText(remainingTime);

  return `${remainsTime} ${reamainsTimeText}`;
}
