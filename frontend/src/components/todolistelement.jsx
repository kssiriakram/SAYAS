import React, { Component } from "react";
import { TodoListElementDelete } from "./TodoListElementDelete";
export class TodoListElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleted: this.props.item.isDeleted,
    };
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickUndoDelete = this.onClickUndoDelete.bind(this);
    this.onClickPermanentDelete = this.onClickPermanentDelete.bind(this);
    this.onClickComplete = this.onClickComplete.bind(this);
  }

  onClickDelete() {
    let index = parseInt(this.props.item.index);
    this.props.removeItem(index);
  }

  onClickUndoDelete() {
    let item = this.props.item;
    this.props.undoRemoveItem(item);
  }

  onClickPermanentDelete() {
    this.setState({
      isDeleted: true,
    });
    let index = parseInt(this.props.item.index);

    this.props.definitiveRemoveItem(index);
  }

  onClickComplete() {
    let index = parseInt(this.props.item.index);
    this.props.completeItem(index);
  }

  render() {
    let isCompletedClass = this.props.item.isCompleted
      ? "list-group-item-success"
      : "";

    const btnActionComplete = this.props.item.isCompleted ? (
      ""
    ) : (
      <button
        type="button"
        className="btn btn-success btn-sm"
        onClick={this.onClickComplete}
      >
        Complete
      </button>
    );

    const btnActionDelete = (
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={this.onClickDelete}
      >
        Debut
      </button>
    );

    isCompletedClass = this.state.isDeleted ? "hidden" : isCompletedClass;

    return (
      <li className={"list-group-item " + isCompletedClass}>
        <div className="clarfix">
          {this.props.item.value}
          <span className="float-right">
            {btnActionComplete}
            {btnActionDelete}
          </span>
        </div>
        {/* <TodoListElementDelete
          index={this.props.item.index}
          timer={this.props.timer}
          enable={this.props.item.isBeingDeleted}
          onClickUndoDelete={this.onClickUndoDelete}
          onEndTimerAction={this.onClickPermanentDelete}
  />*/}
      </li>
    );
  }
}
