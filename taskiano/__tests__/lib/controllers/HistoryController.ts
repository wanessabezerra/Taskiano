import FireController from './FireController'
import collections from '../../mocks/data'

import { getCurrentWeekday } from '../../../utils'

import type { IHistory, ITask } from '../../../types'
import { HistorySchema } from '../../../lib/schemas'

interface IRecordObject {
  [key: string]: number
}

interface IScoreRules {
  [key: string]: {
    [key: string]: IRecordObject
  }
}

class Controller extends FireController<IHistory> {
  initialHistory: IHistory = {
    userId: '',
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
      sun: 0
    }
  }

  score_rules: IScoreRules = {
    task: {
      close: {
        inTime: 2,
        outTime: 1
      },
      open: {
        inTime: -1,
        outTime: -2
      }
    }
  }

  constructor() {
    super({
      ref: 'historys',
      schema: HistorySchema,
      _name: 'History',
      _data: collections.historys
    })
  }

  public async init(userId: string) {
    await this.Validator(this.initialHistory)
    await this.create((this.ref, { ...this.initialHistory, userId }))
  }

  public async getHistoryOfUser(userId?: string): Promise<IHistory> {
    const docs = await super.getDocsOfUser(userId)

    return docs[0]
  }

  public async getScore(id: string): Promise<number | undefined> {
    const history = await this.get(id)
    return history?.score
  }

  public async getLastTaskNumber(userId?: string): Promise<number | undefined> {
    const doc = await this.getHistoryOfUser(userId)

    return doc.lastTaskNumber
  }

  public async updateLastTaskNumber(props: {
    userId?: string
    taskNumber?: number
  }): Promise<void> {
    const doc = await this.getHistoryOfUser(props.userId)

    if (doc) {
      await this.update(doc.id ?? '', {
        ...doc,
        lastTaskNumber: props.taskNumber ?? doc.lastTaskNumber
      })
    }
  }

  public async updateScore(props: {
    task?: ITask
    action: string
    userId?: string
  }) {
    const userId = props.userId ?? ''

    if (props.task && props.action) {
      const doc = await this.getHistoryOfUser(userId)

      const currTime = new Date().getTime()
      const closed_in = props.task.closed_in ?? Infinity

      const type = 'task'
      const value = closed_in < currTime ? 'inTime' : 'outTime'
      const score = doc.score + this.score_rules[type][props.action][value]

      const currentWeekday = getCurrentWeekday()
      const currentTaskCount = doc.weekdayTaskCount[currentWeekday]
      const updated_at = new Date()

      await super.update(doc.id ?? '', {
        ...doc,
        score,
        updated_at,
        weekdayTaskCount: {
          ...doc.weekdayTaskCount,
          [currentWeekday]:
            props.action === 'close'
              ? currentTaskCount + 1
              : currentTaskCount - 1
        }
      })
    }
  }
}

const HistoryController = new Controller()

export default HistoryController
