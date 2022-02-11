export enum StatusType {
  unfinish = "unfinish",
  finished = "finished",
  "not sure" = "not sure",
}

export interface Datas {
  id?: number;
  content: string;
  status: StatusType;
}
