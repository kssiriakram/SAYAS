import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ChartContainer } from "./components/chart";
import { ToDoList } from "./components/ToDoList";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Timer from "./components/timer";
import "./index.css";
import { SettingsContextProvider } from "./components/common/SettingsContext";
import { ToDo } from "./components/NewToDo";
import { Statistics } from "./components/statistics";
class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/statistics" component={Statistics} />
            <ProtectedRoute path="/NewToDo" component={ToDo} />
            <ProtectedRoute path="/timer/" component={Timer} />
            <ProtectedRoute path="/todo" component={ToDo} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/timer" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
