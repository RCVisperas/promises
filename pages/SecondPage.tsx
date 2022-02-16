/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  createNewTodos,
  deleteTodos,
  editTodos,
  getAllTodos,
} from "./api/data";
import { Datas } from "./api/dataInterface";

const SecondPage = () => {
  const [todos, setTodos] = useState<Datas[]>([]);
  const [inputContent, setInputContent] = useState<string>("");
  const [objTodos, setObjTodos] = useState<object>(todos);
  const [CurrentlyUpdating, setCurrentlyUpdating] = useState<number>();
  const [updatingText, setUpdatingText] = useState<string>("");
  const [updatingStatus, setUpdatingStatus] = useState<string>("");

  useEffect(() => {
    fetchAllData();
  }, []);

  function handleSubmit() {
    createNewTodos({
      id: todos.length + 1,
      content: inputContent,
      status: "unfinish",
    }).then((res) => {
      const createdContent = [...todos, res];
      console.log(createdContent);
      fetchAllData();
      setInputContent("");
    });
  }
  function fetchAllData() {
    getAllTodos()
      .then((res) => {
        setTodos(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleDelete(id: number) {
    deleteTodos(id).then((res) => {
      const deletedTodos = [...todos].filter((todo) => {
        return todo.id !== id;
      });
      fetchAllData();
    });
  }
  const handleEdit = (id: number) => {
    const obj = todos.find((todo) => todo.id === id);
    {
      obj && setCurrentlyUpdating(obj.id);
      obj && setUpdatingText(obj.content);
      obj && setUpdatingStatus(obj.status);
    }
  };
  function handleUpdating(id: number) {
    editTodos(id)
      .then((res) => {
        const oldObj = {
          objTodos,
        };
        console.log();
        const Updating: Datas = {
          ...oldObj,
          content: updatingStatus,
          status: updatingStatus,
        };
        setObjTodos(Updating);

        console.log(Updating);
        fetchAllData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div>
        <label>Content: </label>
        <input
          type="text"
          placeholder="Enter Content"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        ></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div> </div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            {CurrentlyUpdating === todo.id ? (
              <>
                {" "}
                <input
                  type="text"
                  placeholder="Enter New Content"
                  value={updatingText}
                  onChange={(e) => setUpdatingText(e.target.value)}
                  required
                ></input>
                <input
                  required
                  type="text"
                  placeholder="Enter New Content"
                  value={updatingStatus}
                  onChange={(e) => setUpdatingStatus(e.target.value)}
                ></input>
                <button onClick={() => handleUpdating(todo.id)}>Save</button>
              </>
            ) : (
              <div>
                {" "}
                {todo.content}{" "}
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                <button onClick={() => handleEdit(todo.id)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SecondPage;
