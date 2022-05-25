import React from "react";
import { Line } from "react-chartjs-2";

export function LineContainer(props) {
  console.log(props.labels);
  const data = {
    labels: [
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
    datasets: [
      {
        label: "Focus Hours",
        data: props.value,
        fill: false,
        borderColor: "#1b49aa",
        tension: 0.1,
      },
    ],
  };
  return (
    <Line
      data={data}
      options={{
        cutoutPrecentage: 80,
        plugins: {
          title: {
            display: true,
            text: "HR/month",
            color: "black",
            font: {
              size: 30,
            },
          },
        },
      }}
    />
  );
}
