import { ReactNode, useCallback, useState, useEffect } from "react";

import { TaskKey, TasksContext } from "./Provider";

import { useAuth } from "../../hooks/useAuth";
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

async function getTasks(projectId?: string, token?: string) {
  let tasks: TaskType[] = [];

  let res = await TaskRest.get(projectId, token);
  tasks.push(...res.results);

  while (res.next !== null) {
    res = await TaskRest.get(projectId, token, res.next);
    tasks.push(...res.results);
  }

  return tasks.map((task) => insertRemainingTime(task));
}

export function TasksContextProvider(props: TasksContextProviderProps) {
  const [tasks, setTasks] = useState<TaskKey[]>([]);
  const projects = useProjects((ctx) => ctx.projects);
  const token = useAuth((ctx) => ctx.token);

  const preFetchTasks = useCallback(async () => {
    const _tasksKey: TaskKey[] = [];

    for (var project of projects) {
      let _tasksType: TaskType[] = await getTasks(project.id, token);
      _tasksKey.push({ projectId: project.id, tasks: [] });

      for (var task of _tasksType) {
        _tasksKey
          .find((t) => t.projectId === project.id)
          ?.tasks.push(insertRemainingTime(task));

        setTasks([..._tasksKey]);
      }
    }
  }, [projects, token]);

  const fetchTasks = async () => {
    const _tasks: TaskKey[] = [];

    for (var project of projects) {
      _tasks.push({
        projectId: project.id ?? "",
        tasks: await getTasks(project.id, token),
      });
    }

    return _tasks;
  };

  const updateInsertTasks = useCallback(
    (task?: TaskType) => {
      if (task) {
        setTasks(
          tasks.map(({ projectId, tasks: _tasks }) => {
            return {
              projectId,
              tasks: _tasks.map((t) =>
                insertRemainingTime(task.id === t.id ? task : t)
              ),
            };
          })
        );
      } else {
        fetchTasks();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchTasks]
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
      console.log(data);
      const task = await TaskRest.create(data, token);
      updateInsertTasks(task);
    },
    [token, updateInsertTasks]
  );

  const update = useCallback(
    async (taskId: string, data: TaskType) => {
      const task = await TaskRest.update(taskId, data, token);
      updateInsertTasks(task);
    },
    [token, updateInsertTasks]
  );

  const close = useCallback(
    async (id: string) => {
      const task = await TaskRest.close(id, token);
      updateInsertTasks(task);
    },
    [token, updateInsertTasks]
  );

  const openTask = useCallback(
    async (id: string) => {
      const task = await TaskRest.openTask(id, token);
      updateInsertTasks(task);
    },
    [token, updateInsertTasks]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      await TaskRest.deleteTask(id, token);
      updateDropTask(id);
    },
    [token, updateDropTask]
  );

  // Auto update tasks when project is updated
  useEffect(() => {
    token && tasks.length === 0 && preFetchTasks();
    updateInsertTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  // Auto update tasks every 2 minute since last update
  useEffect(() => {
    const timeout = setTimeout(() => updateInsertTasks(), 120000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

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
