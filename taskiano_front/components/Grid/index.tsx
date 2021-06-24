import React from "react";

import { Card } from "../Card";

import styles from "../../styles/components/Grid.module.scss";

interface GridProps {}

export function Grid(props: GridProps) {
    return (
        <div className={styles.grid}>
            <Card
                title={"Documentation →"}
                description={
                    "Find in-depth information about Next.js features and API."
                }
                href={"https://nextjs.org/docs"}
            ></Card>

            <Card
                title={"Learn →"}
                description={
                    "Learn about Next.js in an interactive course with quizzes"
                }
                href={"https://nextjs.org/learn"}
            ></Card>

            <Card
                title={"Examples →"}
                description={
                    "Discover and deploy boilerplate example Next.js projects."
                }
                href={"https://github.com/vercel/next.js/tree/master/examples"}
            ></Card>

            <Card
                title={"Deploy →"}
                description={
                    "Instantly deploy your Next.js site to a public URL with Vercel."
                }
                href={
                    "https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                }
            ></Card>
        </div>
    );
}
