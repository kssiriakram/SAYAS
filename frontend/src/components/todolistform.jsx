import React, { Component } from "react";

export class TodoListForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;

    if (newItemValue) {
      this.props.addItem({ newItemValue });
      this.refs.form.reset();
    }
  }

  render() {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            ref="itemName"
            placeholder="Write todo item"
          />
          <div className="input-group-append">
            <button className="btn btn-success" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default TodoListForm;
