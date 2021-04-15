import * as React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";

import "./Chart.scss";

export const ChartContainer: React.FC = (): JSX.Element => {
  const users = useSelector((state: RootStateOrAny) => state.users.users);

  const usersAges: Array<number> = users.map((user) => {
    return user.age;
  });

  const profileViews: Array<number> = users.map((user) => {
    return user.profileViews;
  });

  const connections: Array<number> = users.map((user) => {
    return user.connections.length;
  });

  const userNames: Array<string> = users.map((user) => {
    return user.firstName + " " + user.lastName;
  });

  interface IDataSet {
    label: string;
    fill: boolean;
    lineTension: number;
    backgroundColor: string;
    borderColor: string;
    borderCapStyle: string;
    borderDash: [];
    borderDashOffset: number;
    borderJoinStyle: string;
    pointBorderColor: string;
    pointBackgroundColor: string;
    pointBorderWidth: number;
    pointHoverRadius: number;
    pointHoverBackgroundColor: string;
    pointHoverBorderColor: string;
    pointHoverBorderWidth: number;
    pointRadius: number;
    pointHitRadius: number;
    data: Array<number> | Array<string>;
  }

  interface IDataChartObject {
    labels: string[];
    datasets: Array<IDataSet>;
  }

  const data: IDataChartObject = {
    labels: userNames,
    datasets: [
      {
        label: "User's Age",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(35,102,102,0.4)",
        borderColor: "rgba(35,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(35,102,102,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(35,102,102,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: usersAges,
      },
      {
        label: "Profile Views",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "#7ca6de",
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
        data: profileViews,
      },
      {
        label: "Connections",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(135,192,192,0.4)",
        borderColor: "#929292",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(135,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(135,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: connections,
      },
    ],
  };

  return (
    <div className="chart-container">
      <div className="chart-content">
        <h3 className="chart-title">Chart</h3>
        <Line data={data} />
      </div>
    </div>
  );
};
