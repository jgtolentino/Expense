export enum UserRole {
  EMPLOYEE = 'EMPLOYEE',
  APPROVER = 'APPROVER',
  FINANCE = 'FINANCE',
  ADMINISTRATOR = 'ADMINISTRATOR'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  managerId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}