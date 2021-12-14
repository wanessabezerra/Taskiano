import React, { useState } from "react";

import { BiLeftArrow } from "react-icons/bi";
import { ClockTimer } from "../../ClockTimer";
import { getDescriptionTime } from "../../../utils";

import Task from "../../Task";

import type { Project, TaskType } from "../../../@types";
import styles from "./styles.module.scss";
import EditorProject from "../../Project/Editor";
import { useProjects } from "../../../hooks/useProjects";

export interface TaskProps extends TaskType {
  projectName?: string;
  projectColor?: string;
  projectId?: string;
}

interface TableProps {
  tasks?: TaskProps[];
}

function Table(props: TableProps) {
  const [editProject, setEditProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project>();

  const getProject = useProjects((ctx) => ctx.get);

  const EditorProjectView = () => {
    if (editProject && selectedProject)
      return (
        <EditorProject
          project={selectedProject}
          close={() => setEditProject(false)}
        />
      );

    return null;
  };

  return (
    <>
      <EditorProjectView />

      <table className={styles.tableContent}>
        <thead className={styles.header}>
          <tr className={styles.row}>
            <th className={styles.name}>Nome</th>
            <th className={styles.timer}>Timer</th>
            <th className={styles.priority}>Prioridade</th>
            <th className={styles.createdAt}>Data de criação</th>
            <th className={styles.project}>Projeto</th>
          </tr>
        </thead>

        <tbody className={styles.body}>
          {props.tasks?.map((task) => (
            <tr key={task?.id} className={styles.row}>
              <td className={styles.name}>
                <Task hideTimer key={task?.id} {...task} />
              </td>

              <td className={styles.timer}>
                <ClockTimer remainingTime={task?.remainingTime} />
                {getDescriptionTime(task?.remainingTime)}
              </td>

              <td className={styles.priority}>{task?.priority}</td>

              <td className={styles.createdAt}>{task?.created_at}</td>

              <td
                className={styles.project}
                style={{ background: task?.projectColor }}
                onClick={() => {
                  setEditProject(true);
                  setSelectedProject(getProject(task?.projectId));
                }}
              >
                <BiLeftArrow />
                {task?.projectName}
              </td>

              <td className={styles.whiteSpace} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
