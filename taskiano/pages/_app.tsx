import React, { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";
import stylesToast from "../styles/Toast.module.scss";

import { AuthContextProvider } from "../contexts/AuthContext";
import { ProjectsContextProvider } from "../contexts/ProjectsContext";
import { TasksContextProvider } from "../contexts/TasksContext";
import { HistoryContextProvider } from "../contexts/HistoryContext";

import Loader from "../components/Loader";

import "../services/Firebase";
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
      <Head>
        <title>Taskiano: to-do app - Complete your tasks</title>
        <meta
          name="description"
          content="Organize your tasks, complete them and accompany your activities.Define timers and do not waste time or deadlines."
        />
        <meta
          name="google-site-verification"
          content="sgkXcZZTMacCng8hHTlU2Ffgm6EPE6zUiepuEjtdvt4"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:url" content="https://taskiano.vercel.app" />
        <meta property="og:title" content="Taskiano" />
        <meta property="og:site_name" content="Taskiano" />
        <meta
          property="og:image"
          content="https://taskiano.vercel.app/mstile-310x150.png"
        />
        <meta
          property="og:description"
          content="Organize your tasks, complete them and accompany your activities.Define timers and do not waste time or deadlines."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fcfff5" />
        <meta name="apple-mobile-web-app-title" content="Taskiano" />
        <meta name="application-name" content="Taskiano" />
        <meta name="msapplication-TileColor" content="#fcfff5" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="theme-color" content="#21232d" />
      </Head>

      <ToastContainer
        theme="dark"
        className={stylesToast.toast}
        position="bottom-right"
      />

      <Loader isLoading={loading} />

      <AuthContextProvider router={router}>
        <HistoryContextProvider>
          <ProjectsContextProvider>
            <TasksContextProvider>
              <Component {...pageProps} />
            </TasksContextProvider>
          </ProjectsContextProvider>
        </HistoryContextProvider>
      </AuthContextProvider>
    </>
  );
}
export default MyApp;
