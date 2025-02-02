export interface IUser {
  id: number;
  username: string;
  favorite_symbol: string | null;
}

export interface IUserAuth {
  user: IUser | null;
  token: string | null;
  status: EStatus;
}

export enum EStatus {
  EMPTY = "empty",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
