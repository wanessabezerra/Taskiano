import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import type { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";
import stylesToast from "../styles/Toast.module.scss";

import { AuthContextProvider } from "../contexts/AuthContext";
import { ProjectsContextProvider } from "../contexts/ProjectsContext";
import { TasksContextProvider } from "../contexts/TasksContext";

import Loader from "../components/Loader";

import "../services/Firebase/initService";
import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <>
      <ToastContainer theme="dark" className={stylesToast.toast} />
      <Loader isLoading={loading} />

      <AuthContextProvider router={router}>
        <ProjectsContextProvider router={router}>
          <TasksContextProvider>
            <Component {...pageProps} />
          </TasksContextProvider>
        </ProjectsContextProvider>
      </AuthContextProvider>
    </>
  );
}
export default MyApp;
