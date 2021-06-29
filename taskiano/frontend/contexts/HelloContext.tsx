import { createContext, ReactNode, useEffect, useState } from "react";
import User from "../@types/User";
import { getUser } from "../services/api";

type HelloContextType = {
    githubUser: User | undefined;
    searchGithubUser: Function;
};

export const HelloContext = createContext({} as HelloContextType);

interface HelloContextProviderProps {
    children: ReactNode;
}

export function HelloContextProvider({ children }: HelloContextProviderProps) {
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        avatar: "",
    });

    async function searchGithubUser(username: string) {
        const _user = await getUser(username);
        console.log(_user, username);
        setUser(_user);
    }

    return (
        <HelloContext.Provider
            value={{
                githubUser: user,
                searchGithubUser,
            }}
        >
            {children}
        </HelloContext.Provider>
    );
}
