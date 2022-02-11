import { stat } from "fs";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  createNewTodos,
  deleteTodos,
  editTodos,
  getAllTodos,
} from "./api/data";
import { Datas, StatusType } from "./api/dataInterface";

interface Props {}
const Home: NextPage = () => {
  const [todos, setTodos] = useState<Datas[]>([]);
  const [content, setContent] = useState<string>("");
  const [update, setUpdate] = useState<string>("");

  useEffect(() => {
    getAllTodos()
      .then((res) => {
        setTodos(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteTask = (id: number) => {
    deleteTodos(id)
      .then((res) => {
        const updated = [...todos].filter((todo) => todo.id !== id);

        setTodos(updated);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createNewTodo = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    createNewTodos({
      id: todos.length + 1,
      content: content,
      status: "unfinish",
    })
      .then((res) => {
        const updated = [...todos, res];
        console.log(updated);
        setTodos(updated);
        setContent("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function handleEdit(id: number) {
    const finding = todos.find((todo) => todo.id === id);
    finding && setUpdate(finding.content);
  }

  return (
    <div>
      <div>
        <label>content:</label>
        <input
          type="text"
          placeholder="Enter Content Here"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <button onClick={createNewTodo}>Add</button>
      </div>
      <div>
        <label>update-content:</label>
        <input
          type="text"
          placeholder="Enter Content Here"
          name="content"
          value={update}
          onChange={(e) => setUpdate(e.target.value)}
        ></input>
        <button>Save</button>
      </div>
      {todos.map((todos) => {
        return (
          <div key={todos.id}>
            Content: {todos.content} Status: {todos.status}{" "}
            <button onClick={() => handleEdit(todos.id)}>EDIT</button>
            <button onClick={() => deleteTask(todos.id)}>DELETE</button>
          </div>
        );
      })}
    </div>
  );
};

const Home2: NextPage = () => {
  const [todoList, setTodoList] = useState<Datas[]>([]);
  const [input, setInput] = useState<string>("");
  const fetchTodos = () => {
    getAllTodos()
      .then((res) => {
        setTodoList(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTodoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    createNewTodos({
      content: input,
      status: StatusType.finished,
    })
      .then((res) => {
        console.log("new todo created", res);
        fetchTodos();
      })
      .catch((err) => {
        console.log("error creating", err);
      });
  };

  const handleCheckBox = (id: number) => {
    let indexOf: number = 0;
    const todoListChecked = todoList.find((item, index) => {
      if (item.id === id) {
        return true;
        indexOf = index;
      }
      return false;
    });

    setTodoList((prevState) => {
      const newTodoList = [...prevState];

      newTodoList[indexOf] = {
        ...newTodoList[indexOf],
        status:
          newTodoList[indexOf].status === StatusType.finished
            ? StatusType.unfinish
            : StatusType.finished,
      };
      return newTodoList;
    });
  };

  const [editMode, setEditMode] = useState<number | undefined>(undefined);
  const [currentlyEditedValue, setCurrentlyEditedValue] = useState<
    string | undefined
  >();

  return (
    <>
      <input type="text" onChange={handleTodoInputChange} />
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
      <ul>
        {todoList.map((ea) => (
          <li
            style={{
              width: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            key={ea.id}
          >
            {!(editMode === ea?.id) ? (
              <p
                style={{
                  margin: 0,
                }}
                onDoubleClick={() => {
                  setEditMode(ea.id);
                }}
              >
                {ea.content}
              </p>
            ) : (
              <input
                onChange={(e) => {
                  setCurrentlyEditedValue(e.target.value);
                }}
              />
            )}

            {editMode === ea.id ? (
              <button
                onClick={(e) => {
                  setEditMode(undefined);
                  setTodoList((prevState) => {
                    return [...prevState];
                  });
                }}
              >
                Confirm
              </button>
            ) : (
              <input
                type="checkbox"
                checked={ea?.status === StatusType.finished}
                onClick={() => {
                  if (ea?.id) {
                    handleCheckBox(ea.id);
                  }
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home2;
