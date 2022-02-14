export enum StatusData {
  unfinish = "unfinish",
  finished = "finished",
}

export interface datas {
  id?: number;
  content: string;
  status: StatusData;
}
