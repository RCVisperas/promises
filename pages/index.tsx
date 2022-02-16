import { stat } from "fs";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  createNewTodos,
  deleteTodos,
  editTodos,
  getAllTodos,
} from "./api/data";
import { Datas } from "./api/dataInterface";

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Datas[]>([]);
  const [content, setContent] = useState<string>("");
  const [update, setUpdate] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [currenlyUpdated, setCurrentlyUpdated] = useState<number>();
  const [todoObject, setTodoObject] = useState<object | undefined>(todos);

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
      id: todos.length + 1,
      content: content,
      status: "unfinish",
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
      index && setCurrentlyUpdated(index.id);
      index && setUpdate(index.content);
      index && setStatus(index.status);
    }
    setTodoObject(index);
    console.log(setTodoObject);
  };

  // let testing = {
  //   id: 0,
  //   content: "hello world",
  //   status: "not yet done",
  // };
  // console.log("before updated", testing);
  // testing = {
  //   ...testing,
  //   content: "hi world",
  // };
  // console.log("after updated", testing);

  const updateContent = (id: number | undefined) => {
    editTodos(id)
      .then((res) => {
        let selectedclickArray = {
          ...todoObject,
          content: { update },
          status: { status },
        };
      })
      .catch((err) => {
        console.log(err);
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
        <input
          type="text"
          placeholder="Enter a Content"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        ></input>
        {/* <button onClick={() => updateContent(todos.id)}>Save</button> */}
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
