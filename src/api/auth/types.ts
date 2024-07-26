import type { User } from '../users';

export type LoginResponse = {
  status: boolean;
  path: string;
  statusCode: number;
  result: {
    token: string;
    refreshToken: string;
    tokenExpires: string;
    user: User;
  };
};

export type SignupRequest = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: {
    country: string;
    city: string;
    longitude: number;
    latitude: number;
    countryFlag: string;
    street: string;
  };
};

export type SignupResponse = {
  status: boolean;
  path: string;
  statusCode: number;
  result: boolean;
};
export type EmailOtpConfirmResponse = {
  status: boolean;
  path: string;
  statusCode: number;
};
