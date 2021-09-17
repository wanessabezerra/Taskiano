import { createContext } from "use-context-selector";
import type { History, Weekday } from "../../@types";

export type HistoryContextType = {
  history?: History;
  weekdays?: Weekday[];
  increase: () => Promise<void>;
  decrease: () => Promise<void>;
};

export const HistoryContext = createContext({} as HistoryContextType);
