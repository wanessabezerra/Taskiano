import React from "react";
import { TaskType } from "../../@types";
import Task from "../Task";

import styles from "./styles.module.scss";

interface ProjectWidgetProps {
    name: string;
    tasks: TaskType[];
}

function ProjectWidget(props: ProjectWidgetProps) {
    return (
        <div className={styles.projectWidget}>
            <h1>{props.name}</h1>
            {props.tasks.map((task, index) => {
                return <Task key={index} {...task} />;
            })}
        </div>
    );
}

export default ProjectWidget;
