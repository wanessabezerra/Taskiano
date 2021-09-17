interface IObjectKeys {
  [key: string]: string | number | Date | undefined;
}

interface Weekdays extends IObjectKeys {
  mon?: number;
  tue?: number;
  wed?: number;
  thu?: number;
  fri?: number;
  sat?: number;
  sun?: number;
  updated_at?: string | Date;
}

type History = {
  id?: string;
  weekdayTaskCount?: Weekdays;
};

export default History;
