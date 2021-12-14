import { Timestamp } from "firebase/firestore";

import { HistoryController } from ".";
import FireController from "./FireController";

import { TaskRef } from "../models";
import { TaskSchema } from "../schemas";
import type { ITask } from "../../types";

class Controller extends FireController<ITask> {
  constructor() {
    super({
      ref: TaskRef,
      schema: TaskSchema,
      _name: "Task",
    });
  }

  private castDateTask(task?: ITask): ITask {
    return {
      ...task,
      timer: this.castDate(task?.timer as unknown as Timestamp),
      created_at: this.castDate(task?.created_at as unknown as Timestamp),
      closed_in: this.castDate(task?.closed_in as unknown as Timestamp),
    };
  }

  public async create(task: ITask): Promise<ITask> {
    const lastTaskNumber = await HistoryController.getLastTaskNumber();

    await HistoryController.updateLastTaskNumber({
      taskNumber: lastTaskNumber! + 1,
    });

    return super.create({
      ...task,
      number: lastTaskNumber! + 1,
    });
  }

  public async get(id: string): Promise<ITask | undefined> {
    const doc = await super.get(id);
    if (!doc) return;

    return this.castDateTask(doc);
  }

  public async getTasks(projectId: string): Promise<ITask[]> {
    const tasks = await super.getDocsWithProperty("projectId", projectId);

    return tasks.map((task) => this.castDateTask(task));
  }

  public async setStatus(
    id: string,
    newStatus: "open" | "close"
  ): Promise<ITask | undefined> {
    const task = await this.get(id);

    if (task && task.status !== newStatus) {
      const updatedTask = await this.update(task.id, {
        ...task,
        status: newStatus,
        closed_in: newStatus === "close" ? new Date() : null,
      });

      return this.castDateTask(updatedTask);
    }
  }
}

const TaskController = new Controller();

export default TaskController;
