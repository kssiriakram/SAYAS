import React, { useEffect, useContext, useState } from "react";
import Button from "./common/Button";
import CountdownAnimation from "./common/CountdownAnimation";
import SetPomodoro from "./common/SetPomodoro";
import { SettingsContext } from "./common/SettingsContext";
import { setExactTimeout, clearExactTimeout } from "./common/smalltimer";
import { getquits, deletequit, savequit } from "../services/quitService";
import { ToDoList } from "./ToDoList";
import { ChartContainer } from "./chart";
import { DailyGoal } from "./dailygoal";
import { getsession } from "../services/sessionService";
import { ToDo } from "./NewToDo";

const Promodoro = (props) => {
  var {
    pomodoro,
    executing,
    startAnimate,
    children,
    startTimer,
    pauseTimer,
    updateExecute,
    setCurrentTimer,
    SettingsBtn,
  } = useContext(SettingsContext);

  var reason = React.createRef();
  const handleClick = async () => {
    if (!startAnimate) {
      console.log(props);
      props.create(pomodoro);
      startTimer();
    } else {
      let res = await props.update(pomodoro, reason.current.value);
      window.location.reload();
    }
  };

  const [showtasks, setShowtasks] = useState(0);
  const [dailygoals, setDailygoals] = useState(0);
  const [times, setTimes] = useState(0);

  useEffect(() => {
    updateExecute(executing);

    console.log(executing);
  }, [executing, startAnimate]);

  return (
    <div className="container">
      <h1>S A Y A S</h1>
      <small>Be productive!</small>
      {pomodoro !== 0 ? (
        <>
          <ul className="labels">
            <li>
              <Button
                title="Work"
                activeClass={
                  executing.active === "work" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("work")}
              />
            </li>
            <li>
              <Button
                title="Break"
                activeClass={
                  executing.active === "short" ? "active-label" : undefined
                }
                _callback={() => setCurrentTimer("short")}
              />
            </li>
          </ul>

          <div className="timer-container">
            {dailygoals ? (
              <div className="wrapper">
                <DailyGoal />
              </div>
            ) : (
              ""
            )}

            <div className="time-wrapper">
              <CountdownAnimation
                key={pomodoro}
                timer={pomodoro}
                animate={startAnimate}
                onstop={() => {
                  if (executing.active === "work") {
                    props.update(pomodoro, undefined);
                    setCurrentTimer("short");
                  } else {
                    props.create(pomodoro);
                    setCurrentTimer("work");
                  }
                }}
              >
                {children}
              </CountdownAnimation>
            </div>
            {showtasks ? <ToDo /> : ""}
          </div>
          <div>
            <button
              onClick={() => {
                if (dailygoals === 0) setDailygoals(dailygoals + 1);
                if (dailygoals === 1) setDailygoals(dailygoals - 1);
              }}
            >
              Goal
            </button>
            <button
              onClick={() => {
                if (showtasks === 0) setShowtasks(showtasks + 1);
                if (showtasks === 1) setShowtasks(showtasks - 1);
              }}
            >
              Tasks
            </button>
          </div>
          <div className="button-wrapper">
            <Button
              Ref={reason}
              title={!startAnimate ? "Start" : "Quit"}
              activeClass={!startAnimate ? "active" : undefined}
              _callback={handleClick}
            />
          </div>
        </>
      ) : (
        <SetPomodoro />
      )}
    </div>
  );
};
export default Promodoro;
