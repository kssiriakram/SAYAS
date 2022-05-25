import React, { Component } from "react";
import SettingsContextProvider from "./common/SettingsContext";
import Promodoro from "./promodoro";
import "./timer.css";
import Button from "./common/Button";
import CountdownAnimation from "./common/CountdownAnimation";
import SetPomodoro from "./common/SetPomodoro";
import { SettingsContext } from "./common/SettingsContext";
import {
  getsessions,
  getsession,
  deletesession,
  savesession,
} from "../services/sessionService";
import { getCurrentUser } from "../services/authService";
import { getdailygoal, savedailygoal } from "../services/dailygoalServie";
class Timer extends React.Component {
  state = { _id: 0 };

  update = async (pomodoro, quit) => {
    let session = {
      _id: this.state._id,
      duration: pomodoro,
      userId: getCurrentUser().id,
      quitId: quit,
    };
    console.log("updating", session);
    let data = await savesession(session);
    data = await getsession(this.state._id);
    let res = await getdailygoal();
    res = await savedailygoal({
      _id: res.data.id,
      minutes_done: data.data.actual_duration,
    });
    console.log(res);
    this.state._id = data.data.id;
  };
  create = async (pomodoro) => {
    let session = {
      _id: 0,
      duration: pomodoro,
      userId: getCurrentUser().id,
    };
    console.log("creating", session);
    let data = await savesession(session);

    this.state._id = data.data.id;
  };

  render() {
    return (
      <SettingsContextProvider>
        <Promodoro create={this.create} update={this.update} />
      </SettingsContextProvider>
    );
  }
}

export default Timer;
