import { HistoryController } from ".";
import FireController from "./FireController";

import type { ITask } from "../../../types";
import collections from "../../mocks/data";
import { TaskSchema } from "../../../lib/schemas";

class Controller extends FireController<ITask> {
  constructor() {
    super({
      ref: "tasks",
      schema: TaskSchema,
      _name: "Task",
      _data: collections.tasks,
    });
  }

  private castDateTask(task?: ITask): ITask {
    return task ?? {};
  }

  public async create(task: ITask): Promise<ITask> {
    const lastTaskNumber = 0;

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
      const updatedTask = await this.update(task.id ?? "", {
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
