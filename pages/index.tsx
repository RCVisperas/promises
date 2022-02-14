import { stat } from "fs";
import type { NextPage } from "next";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {
  createNewTodos,
  deleteTodos,
  editTodos,
  getAllTodos,
} from "./api/data";
import { datas, StatusData } from "./api/dataInterface";

const Home: NextPage = () => {
  const [todos, setTodos] = useState<datas[]>([]);
  const [content, setContent] = useState<string>("");
  const [update, setUpdate] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    getAll();
  }, []);
  const getAll = () => {
    getAllTodos()
      .then((res) => {
        setTodos(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createContent = () => {
    createNewTodos({
      content: content,
      status: StatusData.unfinish,
    })
      .then((res) => {
        const updated = res;
        getAll();
        setContent("");
      })
      .catch((err) => {
        console.log("error creating", err);
      });
  };
  const deleteContent = (id: number | undefined) => {
    deleteTodos(id)
      .then((res) => {
        todos.filter((word, index, arr) => {
          arr.pop();
          return word.id === id;
        });
        getAll();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const putClickonText = (id: number | undefined) => {
    const index = todos.find((todo) => todo.id === id);
    {
      index && setUpdate(index.content);
      index && setStatus(index.status);
    }
  };
  const updateContent = (id: number | undefined) => {
    editTodos(id).then((res) => {
      const updated = res;
      getAll();
    });
  };
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter a Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <button onClick={createContent}>Submit</button>
      </div>
      <div>
        {" "}
        <input
          type="text"
          placeholder="Enter a Content"
          value={update}
          onChange={(e) => setUpdate(e.target.value)}
        ></input>
        <input type="text" placeholder="Enter a Content" value={status}></input>
        <button onClick={() => updateContent(todo.id)}>Save</button>
      </div>
      <div>
        <div>
          {" "}
          {todos.map((todo, index) => {
            return (
              <div key={index}>
                {todo.content}{" "}
                <button onClick={() => putClickonText(todo.id)}>edit</button>
                <button onClick={() => deleteContent(todo.id)}>delete</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

// const Home2: NextPage = () => {
//   const [todoList, setTodoList] = useState<Datas[]>([]);
//   const [input, setInput] = useState<string>("");
//   const fetchTodos = () => {
//     getAllTodos()
//       .then((res) => {
//         setTodoList(res);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };
//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const handleTodoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     // console.log(e.target.value);
//     setInput(e.target.value);
//   };

//   const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
//     createNewTodos({
//       content: input,
//       status: StatusType.finished,
//     })
//       .then((res) => {
//         console.log("new todo created", res);
//         fetchTodos();
//       })
//       .catch((err) => {
//         console.log("error creating", err);
//       });
//   };

//   const handleCheckBox = (id: number) => {
//     let indexOf: number = 0;
//     const todoListChecked = todoList.find((item, index) => {
//       if (item.id === id) {
//         return true;
//         indexOf = index;
//       }
//       return false;
//     });

//     setTodoList((prevState) => {
//       const newTodoList = [...prevState];

//       newTodoList[indexOf] = {
//         ...newTodoList[indexOf],
//         status:
//           newTodoList[indexOf].status === StatusType.finished
//             ? StatusType.unfinish
//             : StatusType.finished,
//       };
//       return newTodoList;
//     });
//   };

//   const [editMode, setEditMode] = useState<number | undefined>(undefined);
//   const [currentlyEditedValue, setCurrentlyEditedValue] = useState<
//     string | undefined
//   >();

//   return (
//     <>
//       <input type="text" onChange={handleTodoInputChange} />
//       <button type="button" onClick={handleSubmit}>
//         Submit
//       </button>
//       <ul>
//         {todoList.map((ea) => (
//           <li
//             style={{
//               width: 400,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//             key={ea.id}
//           >
//             {!(editMode === ea?.id) ? (
//               <p
//                 style={{
//                   margin: 0,
//                 }}
//                 onDoubleClick={() => {
//                   setEditMode(ea.id);
//                 }}
//               >
//                 {ea.content}
//               </p>
//             ) : (
//               <input
//                 onChange={(e) => {
//                   setCurrentlyEditedValue(e.target.value);
//                 }}
//               />
//             )}

//             {editMode === ea.id ? (
//               <button
//                 onClick={(e) => {
//                   setEditMode(undefined);
//                   setTodoList((prevState) => {
//                     return [...prevState];
//                   });
//                 }}
//               >
//                 Confirm
//               </button>
//             ) : (
//               <input
//                 type="checkbox"
//                 checked={ea?.status === StatusType.finished}
//                 onClick={() => {
//                   if (ea?.id) {
//                     handleCheckBox(ea.id);
//                   }
//                 }}
//               />
//             )}
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

export default Home;
