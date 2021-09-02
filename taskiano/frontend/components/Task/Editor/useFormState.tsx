import { useCallback, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useTasks } from "../../../hooks/useTasks";

import type { TaskType } from "../../../@types";

interface FormStateProps {
  task?: TaskType;
  projectId?: string;
  close: () => void;
}

function useFormState(props: FormStateProps) {
  const [title, setTitle] = useState(props.task?.title ?? "Tarefa: ");
  const [note, setNote] = useState(props.task?.note ?? "# Hello World");
  const [fixed, setFixed] = useState<boolean>(props.task?.fixed ?? false);
  const [priority, setPriority] = useState(props.task?.priority ?? 0);
  const [timer, setTimer] = useState<Date>();
  const [timerShow, setTimerShow] = useState("");

  const create = useTasks((value) => value.create);
  const update = useTasks((value) => value.update);

  const onChangeDate = useCallback(
    (e: any) => {
      const dateTime = new Date(e.target ? e.target.value : e);
      const date = dateTime.toISOString().substr(0, 11);
      const localDateTime =
        date + dateTime.toLocaleString("pt-BR").substr(11, 5);

      setTimer(dateTime);
      setTimerShow(localDateTime);
    },
    [setTimer, setTimerShow]
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data: TaskType = {};
    let operation;

    if (props.task) {
      if (title !== props.task.title) data.title = title;
      if (note !== props.task.note) data.note = note;
      if (fixed !== props.task.fixed) data.fixed = fixed;
      if (priority !== props.task.priority) data.priority = priority;
      if (timer !== props.task.timer) data.timer = timer;

      operation = () => update(props.task?.id, data);
    } else {
      data = {
        title,
        note,
        timer,
        fixed,
        priority,
        created_at: new Date(),
        project: props.projectId,
      };

      operation = () => create(data);
    }

    try {
      toast.promise(operation(), {
        pending: "Salvando...",
        success: "Tudo certo 🦄",
        error: "Ah não! Verifique os dados 🤯",
      });

      props.close();
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (props.task?.timer) onChangeDate(props.task.timer);
  }, [onChangeDate, props.task?.timer]);

  return {
    title: { state: title, set: setTitle },
    note: { state: note, set: setNote },
    fixed: { state: fixed, set: setFixed },
    priority: { state: priority, set: setPriority },
    timerShow: { state: timerShow, set: onChangeDate },
    onSubmit,
  };
}

export default useFormState;
