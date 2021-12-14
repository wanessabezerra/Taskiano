import { ReactNode, useCallback, useState, useEffect } from "react";

import { TaskKey, TasksContext } from "./Provider";

import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "../../hooks/useHistory";
import { useProjects } from "../../hooks/useProjects";

import { TaskRest } from "../../services/api";
import { calcRemainingTime } from "../../utils";

import type { TaskType } from "../../@types";

interface TasksContextProviderProps {
  children: ReactNode;
}

const insertRemainingTime = (task: TaskType) => {
  if (task.remainingTime) return task;
  else return { ...task, remainingTime: calcRemainingTime(task.timer) };
};

const getTasks = async (projectId?: string, token?: string) => {
  let tasks: TaskType[] = [];
  let res = {} as any;

  do {
    res = await TaskRest.get(projectId, token, res.next);
    res && tasks.push(...res.results);
  } while (res?.next);

  return tasks.map((task) => insertRemainingTime(task));
};

export function TasksContextProvider(props: TasksContextProviderProps) {
  const [tasks, setTasks] = useState<TaskKey[]>([]);
  const projects = useProjects((ctx) => ctx.projects);

  const token = useAuth((ctx) => ctx.token);
  const updateScore = useAuth((ctx) => ctx.updateScore);
  const authenticated = useAuth((ctx) => ctx.authenticated);

  const increase = useHistory((ctx) => ctx.increase);
  const decrease = useHistory((ctx) => ctx.decrease);

  const preFetchTasks = useCallback(async () => {
    const _tasksKey: TaskKey[] = [];

    for (var project of projects) {
      let _tasksType: TaskType[] = await getTasks(project.id, token);
      _tasksKey.push({ projectId: project.id, tasks: [] });

      for (var task of _tasksType) {
        _tasksKey
          .find((t) => t.projectId === project.id)
          ?.tasks.push(insertRemainingTime(task));

        if (_tasksKey) setTasks([..._tasksKey]);
      }
    }
  }, [projects, token]);

  const fetchTasks = useCallback(async () => {
    const _tasks: TaskKey[] = [];

    for (var project of projects) {
      _tasks.push({
        projectId: project.id ?? "",
        tasks: await getTasks(project.id, token),
      });
    }

    return _tasks;
  }, [projects, token]);

  const insertTask = useCallback(
    (task: TaskType) => {
      setTasks(
        tasks.map((t) =>
          t.projectId === task?.project
            ? {
                projectId: t.projectId,
                tasks: [...t.tasks, insertRemainingTime(task)],
              }
            : t
        )
      );
    },
    [tasks]
  );

  const updateTask = useCallback(
    (task: TaskType) => {
      setTasks(
        tasks.map((t) =>
          t.projectId === task?.project
            ? {
                projectId: t.projectId,
                tasks: t.tasks.map((_tasks) =>
                  _tasks.id === task?.id ? insertRemainingTime(task) : _tasks
                ),
              }
            : t
        )
      );
    },
    [tasks]
  );

  const updateInsertTasks = useCallback(
    (task?: TaskType) => {
      if (task) {
        const taskExists = tasks
          .find((t) => t.projectId === task?.project)
          ?.tasks.find((t) => t.id === task?.id);

        taskExists ? updateTask(task) : insertTask(task);
      } else {
        fetchTasks();
      }
    },
    [fetchTasks, insertTask, tasks, updateTask]
  );

  const updateDropTask = useCallback(
    (id: string) => {
      setTasks(
        tasks.map(({ projectId, tasks: _tasks }) => {
          return {
            projectId,
            tasks: _tasks.filter(function (t) {
              return t.id !== id;
            }),
          };
        })
      );
    },
    [tasks]
  );

  const create = useCallback(
    async (data: TaskType) => {
      const task = await TaskRest.create(data, token);
      task && updateInsertTasks(task);
    },
    [token, updateInsertTasks]
  );

  const update = useCallback(
    async (taskId: string, data: TaskType) => {
      const task = await TaskRest.update(taskId, data, token);
      task && updateInsertTasks(task);
    },
    [token, updateInsertTasks]
  );

  const close = useCallback(
    async (id: string) => {
      const task = await TaskRest.close(id, token);

      if (task) {
        updateInsertTasks(task);
        await increase();
        await updateScore();
      }
    },
    [increase, token, updateInsertTasks, updateScore]
  );

  const openTask = useCallback(
    async (id: string) => {
      const task = await TaskRest.open(id, token);

      if (task) {
        updateInsertTasks(task);
        await decrease();
        await updateScore();
      }
    },
    [decrease, token, updateInsertTasks, updateScore]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      await TaskRest.delete(id, token);
      updateDropTask(id);
      await updateScore();
    },
    [token, updateDropTask, updateScore]
  );

  // Auto update tasks when project is updated
  useEffect(() => {
    if (authenticated) {
      if (authenticated && tasks.length === 0) preFetchTasks();
      else fetchTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, authenticated]);

  // Auto update tasks every 2 minute since last update
  useEffect(() => {
    const timeout = setTimeout(() => authenticated && fetchTasks(), 120000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, authenticated]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        update,
        create,
        openTask,
        close,
        deleteTask,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
}
