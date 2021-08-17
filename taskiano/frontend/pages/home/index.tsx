import React from "react";
import Head from "next/head";
import dynamic from 'next/dynamic'

import GlobalStatus from "./GlobalStatus";
import Projects from "./Projects";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import styles from "./styles.module.scss";

const Timers = dynamic(
  () => import('../../components/Timers'),
  { ssr: false }
)

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Taskiano</title>
        <meta name="description" content="To-do" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
      <Topbar />

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.centerContainer}>
            <GlobalStatus />
            <Projects />
          </div>
          <Timers />
        </div>
      </main>
    </div>
  );
}
