import React, { useContext, useState } from "react";
import { SettingsContext } from "./SettingsContext";

const SetPomodoro = () => {
  const [newTimer, setNewTimer] = useState({
    work: 90.0,
    short: 5.0,
    long: 15.0,
    active: "work",
  });

  const { updateExecute } = useContext(SettingsContext);

  const handleChange = (input) => {
    const { name, value } = input.target;
    switch (name) {
      case "work":
        setNewTimer({
          ...newTimer,
          work: parseInt(value),
        });
        break;
      case "shortBreak":
        setNewTimer({
          ...newTimer,
          short: parseInt(value),
        });
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateExecute(newTimer);
  };
  const mystyle = {
    color: "white",
    backgroundColor: "#1b49aa",
    padding: "5px",
    fontFamily: "Arial",
    height: "auto",
    width: "auto",
    color: "#C9CCEA",
    border: "none",
    margin_left: "25px",
  };
  return (
    <div className="wrapper">
      <form noValidate onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <h4>Focus session</h4>
          <select
            className="mb-5 ps-3 fs-3"
            name="work"
            id="cars"
            onChange={handleChange}
            value={newTimer.work}
            style={mystyle}
          >
            <option value="120">120</option>
            <option value="90">90</option>
            <option value="60">60</option>
            <option value="40">40</option>
            <option value="2">20</option>
          </select>
          <h4>Break</h4>
          {/* <input
            disabled="disabled"
            className="input"
            type="number"
            name="work"
            min="15"
            max="120"
            step="10"
            onChange={handleChange}
            value={newTimer.work}
         />*/}

          {/* <input
            displayed="none"
            disabled="disabled"
            className="input"
            type="number"
            name="shortBreak"
            onChange={handleChange}
            value={newTimer.short}
         />*/}
          <select
            className="mb-5 ps-3 fs-3"
            name="shortBreak"
            id="cars"
            onChange={handleChange}
            value={newTimer.short}
            style={mystyle}
          >
            <option value="15">15</option>
            <option value="10">10</option>
            <option value="5">5</option>
            <option value="3">3</option>
          </select>
        </div>

        <button type="submit">Set Timer</button>
      </form>
    </div>
  );
};

export default SetPomodoro;
