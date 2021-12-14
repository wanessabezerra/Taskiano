import { addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import FireController from "./FireController";
import { HistoryRef } from "../models";
import { HistorySchema } from "../schemas";

import {
  getCurrentWeekday,
  getDaysOfDifference,
  weekdaysList,
} from "../../utils";

import type { IHistory, ITask } from "../../types";

interface IRecordObject {
  [key: string]: number;
}

interface IScoreRules {
  [key: string]: {
    [key: string]: IRecordObject;
  };
}

class Controller extends FireController<IHistory> {
  initialHistory: IHistory = {
    userId: "",
    score: 0,
    updated_at: new Date(),
    lastTaskNumber: -1,
    weekdayTaskCount: {
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      sun: 0,
    },
  };

  score_rules: IScoreRules = {
    task: {
      close: {
        inTime: 2,
        outTime: 1,
      },
      open: {
        inTime: -1,
        outTime: -2,
      },
    },
  };

  constructor() {
    super({
      ref: HistoryRef,
      schema: HistorySchema,
      _name: "History",
    });
  }

  public async update(_id: any, data: IHistory): Promise<IHistory | undefined> {
    if (!_id) return;

    const _data = {
      ...data,
      updated_at: this.castDate(data?.updated_at as unknown as Timestamp),
    };

    return super.update(_id, _data);
  }

  public async get(id: string): Promise<IHistory | undefined> {
    const doc = await super.get(id);
    if (!doc) return;

    return {
      ...doc,
      updated_at: this.castDate(doc.updated_at as unknown as Timestamp),
    };
  }

  public async init(userId: string) {
    await this.Validator(this.initialHistory);
    await addDoc(this.ref, { ...this.initialHistory, userId });
  }

  private async resetHistory(_history: IHistory) {
    const lastUpdateDate = new Date(_history?.updated_at!);
    const diff = getDaysOfDifference(lastUpdateDate);

    let weekday = getCurrentWeekday();

    Array.from({ length: diff }, () => {
      _history.weekdayTaskCount[weekday] = 0;
      weekday = weekdaysList[weekdaysList.indexOf(weekday) - 1];
    });

    return this.update(_history.id, _history);
  }

  public async getHistoryOfUser(userId?: string) {
    const docs = await super.getDocsOfUser(
      userId ?? getAuth().currentUser?.uid
    );

    return (await this.resetHistory(docs[0])) ?? docs[0];
  }

  public async getScore(id: string): Promise<number | undefined> {
    const history = await this.get(id);
    return history?.score;
  }

  public async getLastTaskNumber(userId?: string): Promise<number | undefined> {
    const doc = await this.getHistoryOfUser(
      userId ?? getAuth().currentUser?.uid
    );

    return doc.lastTaskNumber;
  }

  public async updateLastTaskNumber(props: {
    userId?: string;
    taskNumber?: number;
  }): Promise<void> {
    const doc = await this.getHistoryOfUser(
      props.userId ?? getAuth().currentUser?.uid
    );

    if (doc) {
      await this.update(doc.id, {
        ...doc,
        updated_at: this.castDate(doc.updated_at as unknown as Timestamp),
        lastTaskNumber: props.taskNumber ?? doc.lastTaskNumber,
      });
    }
  }

  public async updateScore(props: {
    task?: ITask;
    action: string;
    userId?: string;
  }) {
    const userId = props.userId ?? getAuth().currentUser?.uid;

    if (props.task && props.action) {
      const doc = await this.getHistoryOfUser(userId);

      const currTime = new Date().getTime();
      const closed_in = props.task.closed_in ?? Infinity;

      const type = "task";
      const value = closed_in < currTime ? "inTime" : "outTime";
      const score = doc.score + this.score_rules[type][props.action][value];

      const currentWeekday = getCurrentWeekday();
      const currentTaskCount = doc.weekdayTaskCount[currentWeekday];
      const updated_at = new Date();

      await super.update(doc.id, {
        ...doc,
        score,
        updated_at,
        weekdayTaskCount: {
          ...doc.weekdayTaskCount,
          [currentWeekday]:
            props.action === "close"
              ? currentTaskCount + 1
              : currentTaskCount - 1,
        },
      });
    }
  }
}

const HistoryController = new Controller();

export default HistoryController;
