export interface LoginSuccessful {
  token: string;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  rol: string;
}

export interface SingleUserResponse {
  data: IUser;
  support: {
    url: string;
    text: string;
  }
}