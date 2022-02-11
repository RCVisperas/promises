import axios from "axios";
import { Datas } from "./dataInterface";

axios.defaults.baseURL = "https://e20d-115-147-35-117.ngrok.io";
export const getAllTodos = () => {
  return axios
    .get("/todo")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error;
    });
};
export const createNewTodos = (Data: Datas) => {
  return axios
    .post("/todo", Data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error;
    });
};

export const deleteTodos = (id: number) => {
  return axios
    .delete(`/todo/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error;
    });
};
export const editTodos = (Data: Datas) => {
  return axios
    .patch(`/todo/${Data.id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error;
    });
};
