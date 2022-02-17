import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import {
  createNewTodos,
  deleteTodos,
  editTodos,
  getAllTodos,
  Todo,
} from "./api/data";
import { Datas } from "./api/dataInterface";

const ThirdPage = () => {
  const [task, setTask] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const [updatedTodo, setUpdatedTodo] = useState<Todo | undefined>();

  const getAllTodosFetchAndPutIntoState = () => {
    getAllTodos()
      .then((res) => {
        setTask(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllTodosFetchAndPutIntoState();
  }, []);

  const onChangeInputTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleTodoCreate = () => {
    createNewTodos({
      content: newTodo,
      status: "unfinish",
    })
      .then((res) => {
        getAllTodosFetchAndPutIntoState();
        setNewTodo("");
      })
      .catch((er) => {
        console.log(er);
      });
  };
  function deleteContentFromTodo(id: number) {
    deleteTodos(id)
      .then(() => {
        getAllTodosFetchAndPutIntoState();
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
          type={"text"}
          onChange={onChangeInputTodo}
          placeholder="Enter A Content"
          value={newTodo}
        />
        <button onClick={handleTodoCreate}>Submit</button>
      </div>
      <div>
        <ul
          style={{
            maxWidth: 400,
          }}
        >
          {task.map((ea) => (
            <li
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={ea.id}
              onDoubleClick={() => {
                setUpdatedTodo(ea);
              }}
            >
              {updatedTodo?.id === ea.id ? (
                <input
                  type="text"
                  value={updatedTodo.content}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setUpdatedTodo(
                      (prev) =>
                        ({
                          ...prev,
                          content: e.target.value,
                        } as Todo)
                    );
                  }}
                  onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                    console.log(e.key);
                    if (e.key === "Enter") {
                      editTodos(ea.id, {
                        content: updatedTodo.content,
                      })
                        .then((res) => {
                          getAllTodosFetchAndPutIntoState();
                          setUpdatedTodo(undefined);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }
                  }}
                />
              ) : (
                <>
                  <p>{ea.content}</p>
                  <button onClick={() => deleteContentFromTodo(ea.id)}>
                    Delete
                  </button>
                </>
              )}

              <input
                type="checkbox"
                checked={ea.status === "finished"}
                onClick={() => {
                  console.log(
                    "ea status",
                    ea.status === "finished" ? "unfinish" : "finished"
                  );
                  editTodos(ea.id, {
                    status: ea.status === "finished" ? "unfinish" : "finished",
                  })
                    .then((res) => {
                      getAllTodosFetchAndPutIntoState();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ThirdPage;
