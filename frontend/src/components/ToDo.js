import React from "react";

const ToDo = ({ todo, handleToggle }) => {
  const handleClick = (e) => {
    e.preventDefault();
    handleToggle(e.currentTarget.id);
  };
  console.log(todo.id);
  return (
    <div
      id={todo.id}
      key={todo.id + todo.desc}
      name="todo"
      value={todo.id}
      onClick={handleClick}
      className={todo.done ? "todo strike" : "todo"}
    >
      {todo.desc}
    </div>
  );
};

export default ToDo;
