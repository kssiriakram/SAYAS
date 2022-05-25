import React, { Component } from "react";

export const TodoListElementDelete = (props) => {
  const [timer, setTimer] = React.useState(props.timer);
  let _timeoutRef = React.useRef();

  function onClickUndoDelete() {
    clearTimeout(_timeoutRef.current);
    setTimer(props.timer);
    props.onClickUndoDelete();
  }

  React.useEffect(() => {
    if (props.enable) {
      _timeoutRef.current = setTimeout(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          props.onEndTimerAction();
        }
      }, 1000);
    }

    return () => clearTimeout(_timeoutRef.current);
  });

  return (
    <div className={`alert alert-danger ${props.enable ? "" : "hidden"}`}>
      You want to undo the action? {timer}
      <button
        type="button"
        className="btn btn-warning"
        onClick={onClickUndoDelete}
      >
        Undo
      </button>
    </div>
  );
};

export default TodoListElementDelete;
