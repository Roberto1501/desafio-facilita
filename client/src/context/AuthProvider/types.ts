import { ILoginResponse, IUserData } from "./util";

export interface IUser {
  id?: string;
  name?: string;
}

export interface Icontext extends IUser {
  data?: {
    id?: string | number;
    name?: string;
  } | undefined;
  authenticate: (id: string, name: string) => Promise<ILoginResponse | undefined>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<IUserData | undefined>;
}

export interface IAuthProvider {
  children: JSX.Element;
}
