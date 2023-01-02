export interface AuthInfo {
  email: string;
  password: string;
  name: string;
}

export interface UserInfo extends Omit<AuthInfo, "password"> {
  id?: string;
}
