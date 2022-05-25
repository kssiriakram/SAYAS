import { useState } from "react";
import MainContext from "./common/context";

export const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [update, setUpdate] = useState(null);

  const states = {
    todos,
    setTodos,
    todo,
    setTodo,
    update,
    setUpdate,
  };

  return <h1>TO DO LIST</h1>;
};
