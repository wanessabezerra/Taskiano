import { Weekday, WeekdaysPercent } from "../types";

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
