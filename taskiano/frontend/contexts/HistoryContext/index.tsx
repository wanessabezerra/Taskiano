import { ReactNode, useCallback, useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { HistoryRest } from "../../services/api/History.rest";
import {
  getCurrentWeekday,
  getDaysOfDifference,
  getLastDay,
  getWeekday,
} from "../../utils";

import { HistoryContext } from "./Provider";

import type { History, Weekday } from "../../@types";

interface HistoryContextProviderProps {
  children: ReactNode;
}

export function HistoryContextProvider(props: HistoryContextProviderProps) {
  const [history, setHistory] = useState<History>();
  const [weekdays, setWeekdays] = useState<Weekday[]>([]);

  const authenticated = useAuth((ctx) => ctx.authenticated);
  const token = useAuth((ctx) => ctx.token);

  const fetch = useCallback(async () => {
    setHistory(await HistoryRest.get(token));
  }, [token]);

  const getLastUpdate = useCallback(() => {
    return new Date(history?.weekdayTaskCount?.updated_at ?? new Date());
  }, [history]);

  const updateWeekdayTaskCount = async () => {
    if (!authenticated) return;

    let currentDay = new Date();
    let weekday = getCurrentWeekday();
    let weekdayTaskCount = history?.weekdayTaskCount ?? {};
    const daysOfDifference = getDaysOfDifference(getLastUpdate());

    for (var i = 0; i < daysOfDifference && i < 7; i++) {
      weekdayTaskCount[weekday] = -1;
      currentDay = getLastDay(currentDay);
      weekday = getWeekday(currentDay);
    }

    weekdayTaskCount.updated_at = new Date();

    setHistory(
      await HistoryRest.update(token, { ...history, weekdayTaskCount })
    );
  };

  const changeWeekdayTaskCount = async (actionType: string) => {
    if (!authenticated) return;

    const weekday = getCurrentWeekday();
    let weekdayTaskCount = history?.weekdayTaskCount ?? {};

    if (actionType === "increment") {
      weekdayTaskCount[weekday] = Number(weekdayTaskCount[weekday]) + 1;
    } else if (actionType === "decrement") {
      weekdayTaskCount[weekday] = Number(weekdayTaskCount[weekday]) - 1;
    }

    weekdayTaskCount.updated_at = new Date();

    setHistory(
      await HistoryRest.update(token, { ...history, weekdayTaskCount })
    );
  };

  useEffect(() => {
    const _weekdays = Object.keys(history?.weekdayTaskCount ?? {}).filter(
      (day) => day !== "updated_at"
    );

    setWeekdays(
      _weekdays.map((key) => {
        return {
          day: key,
          count: Number(history?.weekdayTaskCount?.[key] ?? 0),
        };
      })
    );
  }, [history]);

  useEffect(() => {
    if (authenticated) {
      fetch().then(() => {
        updateWeekdayTaskCount();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, token, fetch]);

  return (
    <HistoryContext.Provider
      value={{
        history,
        weekdays,
        increase: async () => changeWeekdayTaskCount("increment"),
        decrease: async () => changeWeekdayTaskCount("decrement"),
      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
}
