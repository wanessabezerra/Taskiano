import React from "react";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/pages/Home.module.scss";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Timers from "../components/Timers";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Taskiano</title>
                <meta name="description" content="To-do" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidebar />
            <main className={styles.main}>
                <Topbar />
                <div className={styles.content}>
                    <div className={styles.centerContainer}>
                        <div className={styles.taskStatus}></div>
                        <div className={styles.projects}></div>
                    </div>
                    <Timers />
                </div>
            </main>
        </div>
    );
}
