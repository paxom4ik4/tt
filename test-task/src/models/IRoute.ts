export interface IRoute {
  path: string;
  name: string;
  Component: React.FC;
  key?: string;
}
