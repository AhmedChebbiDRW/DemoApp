export type User = {
  id: number;
  accessToken: string;
  refreshToken: string;
  email: string;
  status?: string;
  isNewUser: boolean;
  age?: number | null;
  mode?: string | null;
  size?: number | null;
  marques?: string[] | null;
};
