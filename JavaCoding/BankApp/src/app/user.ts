import { RouteConfigLoadEnd } from '@angular/router';
import { Role } from './Role';

export interface User {
  userId: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
}

export interface TokenResponse {
  token?: string;
}
