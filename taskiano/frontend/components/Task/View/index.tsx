import React, { useState } from "react";

import { toast } from "react-toastify";
import { RiEdit2Fill } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import { IoMdArchive } from "react-icons/io";

import Modal from "../../Modal";
import MarkdownPreview from "../../MarkdownPreview";
import EditorTask from "../Editor";

import { useTasks } from "../../../hooks/useTasks";

import type { TaskType } from "../../../@types";

import colors from "../../../styles/colors";
import styles from "./styles.module.scss";

interface ViewProps {
  task: TaskType;
  onClose: () => void;
}

function View(props: ViewProps) {
  const [editTask, setEditTask] = useState(false);
  const deleteTask = useTasks((value) => value.deleteTask);

  const tryDeleteTask = () => {
    try {
      toast.promise(deleteTask(props.task.id), {
        pending: "Excluindo",
        success: "Tudo certo 🦄",
        error: "Ah não! Verifique os dados 🤯",
      });

      props.onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Modal className={styles.modal} close={props.onClose}>
      <div className={styles.taskModal}>
        <h1 className={styles.taskModalTitle}>{props.task.title}</h1>

        <div className={styles.tools}>
          <ul className={styles.bar}>
            <li>
              <RiEdit2Fill
                color={colors.white}
                onClick={() => setEditTask(true)}
              />
            </li>

            <li>
              <IoMdArchive color={colors.green} />
            </li>

            <li>
              <BsFillTrashFill color={colors.red} onClick={tryDeleteTask} />
            </li>
          </ul>
        </div>

        {editTask ? (
          <EditorTask
            close={() => setEditTask(false)}
            task={props.task}
            projectId={props.task.project}
          />
        ) : (
          <MarkdownPreview
            className={styles.taskMarkdownPreview}
            note={props.task.note}
          />
        )}
      </div>
    </Modal>
  );
}

export default View;
