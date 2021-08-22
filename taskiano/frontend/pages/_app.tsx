import React from "react";

import type { AppProps } from "next/app";

import { AuthContextProvider } from "../contexts/AuthContext";
import { ProjectsContextProvider } from "../contexts/ProjectsContext";

import "../services/Firebase/initService";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ProjectsContextProvider>
        <Component {...pageProps} />
      </ProjectsContextProvider>
    </AuthContextProvider>
  );
}
export default MyApp;
