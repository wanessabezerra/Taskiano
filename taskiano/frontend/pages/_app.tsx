import React from "react";
import type { AppProps } from "next/app";

import { HelloContextProvider } from "../contexts/HelloContext";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <HelloContextProvider>
            <Component {...pageProps} />
        </HelloContextProvider>
    );
}
export default MyApp;
