import React, { useState, Component } from "react";
//mock data
import data from "./data.json";
//components
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";
import { gettasks, savetask } from "../services/taskService";
import { getCurrentUser } from "../services/authService";
export class ToDo extends Component {
  state = {
    toDoList: [],
  };

  async componentWillMount() {
    let res = await gettasks();
    this.setState({ toDoList: res.data });
    console.log(this.state.toDoList);
  }

  handleToggle = (id) => {
    let mapped = this.state.toDoList.map((task) => {
      return task.id === Number(id)
        ? { ...task, done: !task.done }
        : { ...task };
    });
    console.log(mapped);
    mapped.forEach((task) => {
      console.log(task);
      savetask(task);
    });
    this.setState({ toDoList: mapped });
  };

  handleFilter = () => {
    let filtered = this.state.toDoList.filter((task) => {
      return !task.done;
    });

    filtered.forEach((task) => {
      console.log(task);
      savetask(task);
    });

    this.setState({ toDoList: filtered });
  };

  addTask = async (userInput) => {
    let copy = { desc: userInput, userId: getCurrentUser().id };
    let res = await savetask(copy);
    this.setState({ toDoList: [...this.state.toDoList, res.data] });
  };

  render() {
    return (
      <div>
        <ToDoList
          toDoList={this.state.toDoList}
          handleToggle={this.handleToggle}
          handleFilter={this.handleFilter}
        />
        <ToDoForm addTask={this.addTask} />
      </div>
    );
  }
}

export function NewToDo() {
  const [toDoList, setToDoList] = useState(data);

  const handleToggle = (id) => {
    let mapped = toDoList.map((task) => {
      return task.id === Number(id)
        ? { ...task, complete: !task.complete }
        : { ...task };
    });
    setToDoList(mapped);
  };

  const handleFilter = () => {
    let filtered = toDoList.filter((task) => {
      return !task.complete;
    });
    setToDoList(filtered);
  };

  const addTask = (userInput) => {
    let copy = [...toDoList];
    copy = [
      ...copy,
      { id: toDoList.length + 1, task: userInput, complete: false },
    ];
    setToDoList(copy);
  };

  return (
    <div>
      <ToDoList
        toDoList={toDoList}
        handleToggle={handleToggle}
        handleFilter={handleFilter}
      />
      <ToDoForm addTask={addTask} />
    </div>
  );
}

export default NewToDo;
