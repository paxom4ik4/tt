import * as React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import {
  BarController,
  LinearScale,
  BarElement,
  TimeScale,
  Tooltip,
} from "chart.js";

import { ReactChart } from "chartjs-react";

import "./Chart.scss";
import { IUser } from "models/IUser";

const Chart: React.FC = (): JSX.Element => {
  const users = useSelector((state: RootStateOrAny) => state.users.users);

  const averageCounter = (users: Array<IUser>, property: string): number => {
    if (property === "connections") {
      const res = users
        .map((user) => user[property].length)
        .reduce((sum, value) => {
          return sum + value / users.length;
        }, 0)
        .toFixed(2);

      return Number(res);
    }
    return users
      .map((user) => user[property])
      .reduce((sum, value) => {
        return sum + value / users.length;
      }, 0)
      .toFixed(2);
  };

  const usersAverageAges: number = averageCounter(users, "age");
  const usersAverageProfileViews: number = averageCounter(
    users,
    "profileViews"
  );
  const usersAverageConnections: number = averageCounter(users, "connections");

  const data = {
    labels: ["Average Age", "Average Profile Views", "Average Connections"],
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          usersAverageAges,
          usersAverageProfileViews,
          usersAverageConnections,
        ],
      },
    ],
  };

  ReactChart.register(
    BarController,
    LinearScale,
    BarElement,
    TimeScale,
    Tooltip
  );

  const chartOption: any = {
    scales: {
      x: {
        type: "linear",
      },
      y: {
        type: "linear",
      },
    },
  };

  console.log(data);

  const BarChart = () => {
    return (
      <ReactChart type="bar" data={data} options={chartOption} height={500} />
    );
  };

  return (
    <div className="chart-container">
      <div className="chart-content">
        <h3 className="chart-title">Chart</h3>
        <BarChart />
      </div>
    </div>
  );
};

export default Chart;
