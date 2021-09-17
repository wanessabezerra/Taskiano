import { useContextSelector } from "use-context-selector";
import {
  HistoryContext,
  HistoryContextType,
} from "../contexts/HistoryContext/Provider";

export function useHistory(selector: (value: HistoryContextType) => any) {
  return useContextSelector(HistoryContext, selector);
}
