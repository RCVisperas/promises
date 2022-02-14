import axios from "axios";
import { datas } from "./dataInterface";

axios.defaults.baseURL = "https://a2e1-115-147-35-117.ngrok.io/";
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
export const createNewTodos = (data: datas) => {
  return axios
    .post("/todo", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error;
    });
};

export const deleteTodos = (id: number | undefined) => {
  return axios
    .delete(`/todo/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error;
    });
};

export const editTodos = (id: number | undefined) => {
  return axios
    .patch(`/todo/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error;
    });
};
