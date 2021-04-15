import * as React from "react";

export interface IRoute {
  path: string;
  name: string;
  Component: React.Component | React.FC | any;
  key?: string;
}
