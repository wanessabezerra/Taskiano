import { useContext } from "react";
import { HelloContext } from "../contexts/HelloContext";

export function useHello() {
    return useContext(HelloContext);
}
