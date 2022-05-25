import { Doughnut, Line } from "react-chartjs-2";
import React, { Component } from "react";
import "./statistics.css";
import { Chart, ArcElement } from "chart.js";
import { ChartContainer } from "./chart";
import { CategoryScale } from "chart.js";
import { LineContainer } from "./common/linechart";
import {
  getsuccess,
  getmonthly,
  getsessions,
  getmostquit,
} from "../services/sessionService";
import { getCurrentUser } from "../services/authService";
import {
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

export class Statistics extends Component {
  state = {
    success: 0,
    failure: 0,
    quits: [],
    months: [],
    labels1: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    data3: {},
    config3: {},
  };
  constructor() {
    super();

    this.state.data3 = {
      labels: this.state.labels1,
      datasets: [
        {
          label: "My First Dataset",
          data: this.state.months,
          fill: false,
          borderColor: "#1b49aa",

          tension: 0.1,
        },
      ],
    };

    this.state.config3 = {
      type: "line",
      data: this.state.data3,
      options: {
        cutoutPrecentage: 80,
        plugins: {
          title: {
            display: true,
            text: "HR/month",
            font: {
              size: 30,
            },
          },
        },
      },
    };
  }
  async componentWillMount() {
    let response = await getsuccess(getCurrentUser().id, 0);
    this.setState({ failure: response.data.count });
    response = await getsuccess(getCurrentUser().id, 1);
    this.setState({ success: response.data.count });
    response = await getmonthly(getCurrentUser().id);
    let k = [];
    for (let i = 0; response.data[i]; i++)
      k.push(response.data[i].total_duration / 60);
    console.log(k);
    this.setState({ months: k });
    response = await getmostquit(getCurrentUser().id);
    console.log(response.data);
    let m = [];
    for (let i = 1; response.data[i]; i++) {
      m.push(response.data[i].count);
    }
    this.setState({ quits: m });
    console.log(this.state.quits);
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-4">
            <ChartContainer value={[4, 4]} title="Daily goal" />
          </div>
          <div className="col-md-4 ">
            <ChartContainer
              labels={[
                "Phone",
                "Drink/Eat",
                "Environment",
                "Fatigue",
                "Success",
              ]}
              value={this.state.quits}
              title="Reasons for quitting"
            />
          </div>
          <div className="col-md-4">
            <ChartContainer
              labels={["succeded", "failed"]}
              value={[this.state.success, this.state.failure]}
              title="Success Rate"
            />
          </div>
        </div>
        <div
          className="row mt-5"
          style={{ position: "relative", margin: "auto", width: "60vw" }}
        >
          <LineContainer value={this.state.months} />
        </div>
      </React.Fragment>
    );
  }
}

export default Statistics;
