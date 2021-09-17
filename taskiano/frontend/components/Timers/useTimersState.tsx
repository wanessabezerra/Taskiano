import { useCallback, useEffect, useState } from "react";

import { useTasks } from "../../hooks/useTasks";
import { useProjects } from "../../hooks/useProjects";
import { TaskKey } from "../../contexts/TasksContext/Provider";
import {
  calcRemainingTime,
  filterActiveTasks,
  filterTasksInProgress,
  getTasksOfProject,
  orderByRemainingTime,
} from "../../utils";

import type { Project, TaskType } from "../../@types";

function useTimersState() {
  const tasks: TaskKey[] = useTasks((state) => state.tasks);
  const projectsData: Project[] = useProjects((state) => state.projects);

  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);
  const [currentProjects, setCurrentProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project>();

  const [currentTasks, setCurrentTasks] = useState<TaskType[]>();
  const [selectedTask, setSelectedTask] = useState<TaskType>();

  const [initialRemainingTime, setInitialRemainingTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handleTimeDuration = useCallback((task?: TaskType) => {
    setInitialRemainingTime(calcRemainingTime(task?.timer));

    if (!task?.created_at || !task.timer) return;

    const _timer = new Date(task?.timer);
    const _created_at = new Date(task?.created_at);

    const diff = Number(_timer) - Number(_created_at);

    setDuration(Math.ceil(diff / 1000));
  }, []);

  const handleSetProjectTasks = useCallback(
    (project: Project) => {
      let taskList = getTasksOfProject(tasks, project?.id);

      taskList = filterTasksInProgress(taskList);
      taskList = filterActiveTasks(taskList);

      if (!taskList || taskList.length === 0) return;

      handleTimeDuration(taskList[0]);
      setSelectedTask(taskList[0]);
      setCurrentTasks(orderByRemainingTime(taskList));
    },
    [handleTimeDuration, tasks]
  );

  const handleSelectProject = useCallback(
    (n: number) => {
      if (selectedProject?.id !== currentProjects[n]?.id) {
        setSelectedProject(currentProjects[n]);
        handleSetProjectTasks(currentProjects[n]);
      }
    },
    [currentProjects, handleSetProjectTasks, selectedProject?.id]
  );

  const handleSelectTask = useCallback(
    (n?: number) => {
      const newSelectedTask = currentTasks?.find((task) => task.number === n);

      if (selectedTask?.number !== newSelectedTask?.number) {
        setSelectedTask(newSelectedTask);
        handleTimeDuration(newSelectedTask);
      }
    },
    [currentTasks, handleTimeDuration, selectedTask?.number]
  );

  useEffect(() => {
    setCurrentProjectIndex(currentProjects.indexOf(selectedProject ?? {}));
  }, [currentProjects, selectedProject]);

  useEffect(() => {
    if (projectsData && projectsData.length > 0) {
      let _projects = projectsData?.filter((project) => {
        let taskList = getTasksOfProject(tasks, project?.id);

        taskList = filterActiveTasks(taskList);
        taskList = filterTasksInProgress(taskList);

        if (taskList && taskList?.length > 0) return project;
      });

      setCurrentProjects(_projects);
      handleSetProjectTasks(_projects[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectsData, tasks]);

  useEffect(() => {
    if (tasks && !selectedProject && currentProjects?.length > 0) {
      setSelectedProject(currentProjects[0]);
      handleSetProjectTasks(currentProjects[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return {
    currentProjectIndex,
    selectedProject,
    currentProjects,
    selectedTask,
    currentTasks,
    duration,
    initialRemainingTime,
    handleSelectProject,
    handleSelectTask,
  };
}

export default useTimersState;
