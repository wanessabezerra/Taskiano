import { addDoc, doc, Timestamp } from "firebase/firestore";

import { TaskController } from ".";
import FireController from "./FireController";

import { ProjectRef } from "../models";
import { ProjectSchema } from "../schemas";
import type { IProject } from "../../types";

class Controller extends FireController<IProject> {
  constructor() {
    super({
      ref: ProjectRef,
      schema: ProjectSchema,
      _name: "Project",
    });
  }

  public async get(id: string): Promise<IProject | undefined> {
    const _doc = await super.get(id);
    if (!_doc) return;

    return {
      ..._doc,
      created_at: !_doc.created_at
        ? _doc.created_at
        : this.castDate(_doc.created_at as unknown as Timestamp),
      closed_in: !_doc.closed_in
        ? _doc.closed_in
        : this.castDate(_doc.closed_in as unknown as Timestamp),
    };
  }

  public async create(data: IProject, _id?: string): Promise<IProject> {
    await this.Validator(data);

    const { id } = _id
      ? await this.setDoc(doc(this.ref, _id), data)
      : await addDoc(this.ref, data);

    return { id, ...data };
  }

  public async init(userId: string): Promise<string[]> {
    const projects: string[] = [];

    getInitialProjects().forEach(async (ex) => {
      const { id: projectId } = await this.create({ ...ex.project, userId });

      ex.tasks.forEach((task) => TaskController.create({ ...task, projectId }));

      projectId && projects.push(projectId);
    });

    return projects;
  }

  public async setArchived(id: string, hasArchived: boolean): Promise<void> {
    const project = await this.get(id);

    project && (await this.update(id, { ...project, hasArchived }));
  }
}

const ProjectController = new Controller();

export default ProjectController;

function getInitialProjects() {
  function addTimer(minutes: number = 30) {
    var now = new Date();
    now.setMinutes(now.getMinutes() + minutes);

    return new Date(now);
  }

  return [
    {
      project: {
        name: "Hello World",
        description: "1º Projeto",
        created_at: new Date(),
        closed_in: null,
        color: 11235583, // Purple: #ab70ff
      },
      tasks: [
        {
          title: "Hello World",
          note: "# 1º Task",
          status: "open",
          created_at: new Date(),
          closed_in: null,
          timer: addTimer(61),
        },
        {
          title: "Ops, Tarefa atrasada?",
          note: "# Só um exemplo 😅",
          status: "open",
          created_at: new Date(),
          closed_in: null,
          timer: addTimer(30),
        },
      ],
    },
    {
      project: {
        name: "More One",
        description: "1º Projeto",
        created_at: new Date(),
        closed_in: null,
        color: 16740437, // OrangeDark: #ff7055
      },
      tasks: [],
    },
    {
      project: {
        name: "Sobre",
        description: "Algumas informações :)",
        created_at: new Date(),
        closed_in: null,
        color: 16752697, // Orange: #ffa039
      },
      tasks: [
        {
          title: "Projetos",
          note: require("../md/aboutProject.md").default,
          status: "open",
          created_at: new Date(),
          closed_in: null,
          timer: null,
        },
      ],
    },
  ];
}
