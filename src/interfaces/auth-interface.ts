export interface LoginResponse {
  status: number;
  message: string;
  token: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}


export interface RegisterUser {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
}
