export enum StatusData {
  unfinish = "unfinish",
  finished = "finished",
}

export interface Datas {
  id: number;
  content: string;
  status: string;
}
