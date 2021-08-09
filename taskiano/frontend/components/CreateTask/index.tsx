import React, { useState, useEffect } from "react";

import {
  FixTask,
  NoteTask,
  SelectPriority,
  TimeTask,
  TitleTask,
} from "./Fields";
import Modal from "../Modal";
import { MarkdownPreview } from "../MarkdownPreview";
import { api } from "../../services/api";

import styles from "./styles.module.scss";

interface CreateTaskProps {
  close: () => void;
}

function CreateTask(props: CreateTaskProps) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("# Hello World");
  const [fixed, setFixed] = useState<boolean>(false);
  const [priority, setPriority] = useState(0);
  const [timer, setTimer] = useState<Date>(new Date());
  const [timerShow, setTimerShow] = useState("");

  useEffect(() => {
    onChangeDate(new Date());
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      title,
      note,
      timer,
      priority,
      fixed,
      user: (await api.get("user/")).data[0].id_user,
    };

    console.log(data);

    try {
      const response = await api.post("task/", data);
      props.close();

      console.log(response);
      alert("Ok");
    } catch (error) {
      console.error(error);
      alert("Erro, verifique os campos");
    }
  };

  const onChangeDate = (e: any) => {
    const dateTime = new Date(e.target ? e.target.value : e);
    const date = dateTime.toISOString().substr(0, 11);
    const localDateTime = date + dateTime.toLocaleString("pt-BR").substr(11, 5);

    setTimer(dateTime);
    setTimerShow(localDateTime);
  };

  return (
    <Modal close={props.close}>
      <div className={styles.createTaskContainer}>
        <div className={styles.headerCreateTask}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Criar tarefa</h1>
          </div>

          <div className={styles.formGroupHeader}>
            <TitleTask value={title} onChange={(e) => setTitle(e)} />
            <SelectPriority value={priority} onChange={(e) => setPriority(e)} />
            <FixTask value={fixed} onChange={(e) => setFixed(e)} />
            <TimeTask value={timerShow} onChange={(e) => onChangeDate(e)} />
          </div>
        </div>

        <form className={styles.formTask} onSubmit={onSubmit}>
          <div className={styles.formNote}>
            <NoteTask value={note} onChange={(e) => setNote(e)} />
            <MarkdownPreview note={note} className={styles.markdownPreview} />
          </div>

          <input className={styles.formSubmit} type="submit" value="Criar" />
        </form>
      </div>
    </Modal>
  );
}

export default CreateTask;
