import type { TaskType, Weekday, WeekdayPercent } from "../@types";
import { TaskKey } from "../contexts/TasksContext/Provider";
import StyleColors from "../styles/colors";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;
const weekSeconds = 604800;

const colors = [
  StyleColors.red,
  StyleColors.orangeDark,
  StyleColors.gold,
  StyleColors.yellow,
  StyleColors.cyan,
];

export const sleepSync = (ms: number, func?: () => any) => {
  const end = new Date().getTime() + ms;
  while (new Date().getTime() < end);
  func && func();
};

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

export function remainsFormatText(remainingTime: number) {
  let _reaminingTime = Math.abs(remainingTime);
  let text = "";

  if (_reaminingTime <= minuteSeconds) {
    text = remainingTime > 1 ? "Seg's" : "Seg";
  } else if (_reaminingTime > minuteSeconds && _reaminingTime < hourSeconds) {
    text = remainingTime >= minuteSeconds * 2 ? "Min's" : "Min";
  } else if (_reaminingTime > hourSeconds && _reaminingTime < daySeconds) {
    text = remainingTime >= hourSeconds * 2 ? "Horas" : "Hora";
  } else if (_reaminingTime > daySeconds && _reaminingTime < weekSeconds) {
    text = remainingTime >= daySeconds * 2 ? "Dias" : "Dia";
  } else {
    text = "Semana(s)";
  }

  return remainingTime > 0 ? text : text + " atrás";
}

export function remainsFormatValue(remainingTime: number) {
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
  let percentage = 100 / max?.["count"];
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

export function getDescriptionTime(remainingTime: number = 0) {
  const remainsTime = remainsFormatValue(remainingTime);
  const reamainsTimeText = remainsFormatText(remainingTime);

  return `${remainsTime} ${reamainsTimeText}`;
}

export function getTasksOfProject(tasks: TaskKey[], projectId?: string) {
  return tasks.find((task) => task.projectId === projectId)?.tasks ?? [];
}

export function calcRemainingTime(timer?: string | Date) {
  const dateInit = new Date(timer || Date.now());
  const dateCurr = new Date();

  const diff = Number(dateInit) - Number(dateCurr);

  return Math.ceil(diff / 1000);
}

export const filterTasksInProgress = (taskList?: TaskType[]) => {
  return taskList?.filter((task) => task.status !== "2") ?? [];
};

export const filterActiveTasks = (taskList?: TaskType[]) => {
  return (
    taskList?.filter((task) => task.remainingTime && task.remainingTime > 0) ?? []
  );
};

export const countTasksOverTime = (tasks?: TaskType[]) => {
  return (
    tasks?.filter((task) =>
      task.remainingTime ? task.remainingTime < 0 && task.status === "1" : false
    ).length ?? 0
  );
};

export const countTasksDone = (tasks?: TaskType[]) => {
  return tasks?.filter((task) => task.status === "2").length ?? 0;
};

export const countTasksTimers = (tasks?: TaskType[]) => {
  return (
    tasks?.filter((task) =>
      task.remainingTime ? task.remainingTime > 0 && task.status === "1" : false
    ).length ?? 0
  );
};

export const orderByRemainingTime = (taskList?: TaskType[]) => {
  return taskList?.sort((a, b) => {
    return !a.remainingTime || !b.remainingTime
      ? 0
      : a.remainingTime - b.remainingTime;
  });
};

export const selectNextTasks = (tasks: TaskKey[], n?: number) => {
  let _tasks: TaskType[] = [];
  tasks.forEach((task) => (_tasks = _tasks.concat(task.tasks)));

  const _filteredInTimeTasks = filterTasksInProgress(_tasks)?.filter((task) =>
    task.remainingTime ? task.remainingTime > 0 : false
  );

  return orderByRemainingTime(_filteredInTimeTasks)?.slice(0, n);
};

export const selectOverdueTasks = (tasks: TaskKey[], n?: number) => {
  let _tasks: TaskType[] = [];
  tasks.forEach((task) => (_tasks = _tasks.concat(task.tasks)));

  const _filteredOverdueTasks = filterTasksInProgress(_tasks)?.filter(
    (task) => {
      return task.remainingTime ? task.remainingTime < 0 : false;
    }
  );

  return orderByRemainingTime(_filteredOverdueTasks)?.slice(0, n);
};

export function getWeekday(date: Date) {
  return date
    .toLocaleString("en-US", {
      timeZone: getCurrentTimezone(),
      weekday: "short",
    })
    .toLowerCase();
}

export function getLastDay(day: Date) {
  return new Date(day.getTime() - 1000 * 60 * 60 * 24);
}

export function getCurrentTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getCurrentWeekday() {
  return new Date()
    .toLocaleString("en-US", {
      timeZone: getCurrentTimezone(),
      weekday: "short",
    })
    .toLowerCase();
}

export function getDaysOfDifference(date: Date) {
  const now = new Date();

  return Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
}
