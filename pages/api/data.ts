import axios from "axios";
import { Datas } from "./dataInterface";
enum TodoStatus {
  "finished" = "finished",
  "unfinish" = "unfinish",
}
export interface Todo {
  id: number;
  content: string;
  status: "finished" | "unfinish";
}
axios.defaults.baseURL = "http://192.168.1.101:5000";

export const getAllTodos = () => {
  return axios
    .get("/todo")
    .then((res) => {
      return res.data as Todo[];
    })
    .catch((err) => {
      throw Error;
    });
};
export const createNewTodos = (data: {
  content: Todo["content"];
  status: Todo["status"];
}) => {
  return axios
    .post("/todo", data)
    .then((res) => {
      return res.data as Todo;
    })
    .catch((err) => {
      throw Error;
    });
};

export const deleteTodos = (id: number) => {
  return axios
    .delete(`/todo/${id}`)
    .then((res) => {
      return res.data as {
        message: string;
        entity: Todo;
      };
    })
    .catch((err) => {
      throw Error;
    });
};

export const editTodos = (
  id: number,
  newValues: {
    content?: string;
    status?: Todo["status"];
  }
) => {
  return axios
    .patch(`/todo/${id}`, newValues)
    .then((res) => {
      return res.data as Todo;
    })
    .catch((err) => {
      throw Error;
    });
};

export const getOneTodo = (id: string) => {
  return axios
    .get("/todo" + id)
    .then((res) => {
      return res.data as Todo;
    })
    .catch((err) => {
      throw err;
    });
};
