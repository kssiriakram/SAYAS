import React, { Component, ReactFragment } from "react";
import { ChartContainer } from "./chart";
import { savedailygoal, getdailygoal } from "../services/dailygoalServie";
import { getCurrentUser } from "../services/authService";
var reason = React.createRef();
export class DailyGoal extends Component {
  state = { id: 0, minute: 0, minutes_done: 0, error: "", max: 24 };

  async componentWillMount() {
    let response = await getdailygoal();
    console.log("this is response", response.data);
    this.setState({
      id: response.data.id,
      minute: response.data.minute,
      minutes_done: response.data.minutes_done,
    });
  }

  handleSubmit = () => {
    if (reason.current.value < 0 || reason.current.value > 24) {
      this.state.error = (
        <span style={{ color: "red" }}>Invalid daily goal.</span>
      );
      this.setState({ error: this.state.error });
      return;
    }

    this.state.minute = reason.current.value * 60;
    this.setState({ mintue: this.state.minute });
    savedailygoal({ _id: this.state.id, minute: reason.current.value * 60 });
  };
  handleChange = (e) => {
    if (reason.current.value > 24) e.preventDefault();
  };

  render() {
    return (
      <div>
        <ChartContainer
          labels={["Done", "Undone"]}
          value={[this.state.minutes_done, this.state.minute]}
          title="Daily Goal"
        />

        {this.state.minute === 60 ? (
          <React.Fragment>
            <label className="form-control">
              Daily Goal (hours)
              <input
                ref={reason}
                className="form-control"
                type="number"
                max={this.state.max}
                min={this.state.minute / 60}
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
            </label>
            {this.state.error}
            <input
              className="form-control w-1"
              type="submit"
              onClick={this.handleSubmit}
            />
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}
