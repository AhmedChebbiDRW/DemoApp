import type { User } from '@/api/users';
import { getItem, removeItem, setItem } from '@/core/storage';

const TOKEN = 'token';
const EMAIL = 'email';

export type TokenType = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type EmailType = {
  email: string;
};

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);

export const getEmail = () => getItem<EmailType>(EMAIL);
export const removeEmail = () => removeItem(EMAIL);
export const setEmail = (value: EmailType) => setItem<EmailType>(EMAIL, value);
