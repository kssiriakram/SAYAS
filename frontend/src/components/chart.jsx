import React from "react";
import { Doughnut } from "react-chartjs-2";
import DonutChart from "react-donut-chart";

export function ChartContainer(props) {
  console.log(props.labels);
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "My First Dataset",
        data: props.value,
        fill: false,
        borderColor: ["#1b49aa", "#eeeeee", "#00A36C", "#89CFF0", "#FF5733"],
        backgroundColor: [
          "#1b49aa",
          "#eeeeee",
          "#00A36C",
          "#89CFF0",
          "#FF5733",
        ],
        tension: 0.1,
        cutout: "90%",
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      options={{
        type: "time",
        cutoutPrecentage: 80,
        plugins: {
          title: {
            display: true,
            color: "black",
            text: props.title,
            font: {
              size: 30,
            },
          },
        },
      }}
    />
  );
}
