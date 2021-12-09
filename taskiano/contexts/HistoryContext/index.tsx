import { ReactNode, useCallback, useEffect, useState } from "react";

import { HistoryContext } from "./Provider";
import { HistoryController } from "../../lib";
import { useAuth } from "../../hooks/useAuth";

import {
  getCurrentWeekday,
  getDaysOfDifference,
  weekdaysList,
} from "../../utils";

import type { IHistory, ITask, IWeekday } from "../../types";

interface IHistoryContextProvider {
  children: ReactNode;
}

export function HistoryContextProvider(props: IHistoryContextProvider) {
  const [history, setHistory] = useState<IHistory>();
  const [weekdays, setWeekdays] = useState<IWeekday[]>([]);

  const user = useAuth((ctx) => ctx.user);

  const updateHistory = useCallback(
    async (newHistory: IHistory) => {
      const _history = { ...newHistory, updated_at: new Date() };

      HistoryController.update(user.historyId, _history).then(() =>
        setHistory(_history)
      );
    },
    [user]
  );

  const updateTaskCount = async (task: ITask, action: "open" | "close") => {
    await HistoryController.updateScore({ task, action });

    const _history = await HistoryController.getHistoryOfUser(user.id);

    resetHistory(_history);
  };

  const resetHistory = useCallback(
    async (_history: IHistory) => {
      const lastUpdateDate = new Date(_history?.updated_at!);
      const diff = getDaysOfDifference(lastUpdateDate);

      let weekday = getCurrentWeekday();

      Array.from({ length: diff }, () => {
        _history.weekdayTaskCount[weekday] = 0;
        weekday = weekdaysList[weekdaysList.indexOf(weekday) - 1];
      });

      await updateHistory(_history);
    },
    [updateHistory]
  );

  useEffect(() => {
    user &&
      HistoryController.getHistoryOfUser(user.id).then((_history) =>
        resetHistory(_history)
      );
  }, [resetHistory, user]);

  useEffect(() => {
    setWeekdays(
      weekdaysList.map((day) => {
        return { day, count: history?.weekdayTaskCount[day] ?? 0 };
      })
    );
  }, [history?.weekdayTaskCount]);

  return (
    <HistoryContext.Provider
      value={{
        history,
        weekdays,
        updateTaskCount,
      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
}
