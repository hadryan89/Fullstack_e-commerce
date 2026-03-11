export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Sneaker {
  id: string;
  name: string;
  brand: string;
  price: number;
  size: number[];
  color: string;
  description: string;
  image: string;
  stock: number;
  createdAt: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
