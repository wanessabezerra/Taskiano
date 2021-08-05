import React, { useState, useEffect } from "react";

import { AiFillCloseCircle } from "react-icons/ai";

import {
  FixTask,
  NoteTask,
  SelectPriority,
  TimeTask,
  TitleTask,
} from "./Fields";
import Modal from "../Modal";
import { MarkdownPreview } from "./MarkdownPreview/MarkdownPreview";

import styles from "./styles.module.scss";

type NewTask = {
  name: string;
  note: string;
  fixed: boolean;
  priority: number;
  timer: number;
};

interface CreateTaskProps {
  close: () => void;
}

function CreateTask(props: CreateTaskProps) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("# Hello World");
  const [fixed, setFixed] = useState(false);
  const [priority, setPriority] = useState(0);
  const [timer, setTimer] = useState<Date>(new Date());
  const [timerShow, setTimerShow] = useState("");

  useEffect(() => {
    onChangeDate(new Date());
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      name,
      note,
      fixed,
      priority,
      timer,
      timerShow,
    };

    alert(JSON.stringify(data));
    console.log(data);
  };

  const onChangeDate = (e: any) => {
    const dateTime = new Date(e.target ? e.target.value : e);
    const date = dateTime.toISOString().substr(0, 11);
    const localDateTime = date + dateTime.toLocaleString("pt-BR").substr(11, 5);

    setTimer(dateTime);
    setTimerShow(localDateTime);
  };

  return (
    <Modal>
      <div className={styles.createTaskContainer}>
        <div className={styles.headerCreateTask}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Criar tarefa</h1>
          </div>

          <div className={styles.formGroupHeader}>
            <TitleTask value={name} onChange={(e) => setName(e)} />
            <SelectPriority value={priority} onChange={(e) => setPriority(e)} />
            <FixTask value={fixed} onChange={(e) => setFixed(e)} />
            <TimeTask value={timerShow} onChange={(e) => onChangeDate(e)} />
          </div>

          <AiFillCloseCircle
            className={styles.closeModal}
            onClick={props.close}
          />
        </div>

        <form className={styles.formTask} onSubmit={onSubmit}>
          <div className={styles.formNote}>
            <NoteTask value={note} onChange={(e) => setNote(e)} />
            <MarkdownPreview note={note} />
          </div>

          <input className={styles.formSubmit} type="submit" value="Criar" />
        </form>
      </div>
    </Modal>
  );
}

export default CreateTask;
