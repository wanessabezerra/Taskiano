import { createContext, ReactNode, useEffect, useState } from "react";

type HelloContextType = {};

export const HelloContext = createContext({} as HelloContextType);

interface HelloContextProviderProps {
    children: ReactNode;
}

export function HelloContextProvider({ children }: HelloContextProviderProps) {
    const [] = useState(null);

    useEffect(() => {}, []);

    return <HelloContext.Provider value={{}}>{children}</HelloContext.Provider>;
}
