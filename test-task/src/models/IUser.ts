export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  lastLoggedIn: string;
  profileViews: number;
  age: number;
  country: string;
  city: string;
  address: string;
  phone: string;
  company: string;
  connections: Array<string>;
}
