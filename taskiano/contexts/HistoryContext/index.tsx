import { ReactNode, useEffect, useState } from "react";

import { HistoryContext } from "./Provider";
import { HistoryController } from "../../lib";
import { useAuth } from "../../hooks/useAuth";

import { weekdaysList } from "../../utils";

import type { IHistory, ITask, IWeekday } from "../../types";

interface IHistoryContextProvider {
  children: ReactNode;
}

export function HistoryContextProvider(props: IHistoryContextProvider) {
  const [history, setHistory] = useState<IHistory>();
  const [weekdays, setWeekdays] = useState<IWeekday[]>([]);

  const user = useAuth((ctx) => ctx.user);

  const updateTaskCount = async (task: ITask, action: "open" | "close") => {
    await HistoryController.updateScore({ task, action });

    HistoryController.getHistoryOfUser(user.id).then((_history) => {
      setHistory(_history);
    });
  };

  useEffect(() => {
    HistoryController.getHistoryOfUser(user?.id).then((_history) =>
      setHistory(() => ({ ..._history }))
    );
  }, [user]);

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
