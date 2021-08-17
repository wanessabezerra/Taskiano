import React from "react";
import type { AppProps } from "next/app";

import { AuthContextProvider } from "../contexts/AuthContext";

import "../styles/globals.scss";
import "../services/Firebase/initService";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <Component {...pageProps} />
        </AuthContextProvider>
    );
}
export default MyApp;
