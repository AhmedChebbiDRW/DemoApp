export * from './types';
export * from './use-add-user';
export * from './use-user';
export * from './use-users';
import type { User } from './types';

export const users: User[] = [
  {
    id: 1,
    refreshToken: 'eyJhbG1',
    accessToken: 'eyJhbG1R',
    email: 'keira.king54@hotmail.com',
    status: 'Active',
    isNewUser: false,
    age: 36,
    mode: 'Homme',
    size: 42.5,
    marques: ['ADIDAS', 'GUCCI', 'YEZZY'],
  },
  {
    id: 2,
    refreshToken: 'eyJhbG2',
    accessToken: 'eyJhbG2R',
    email: 'keira.king54@hotmail.com',
    status: 'Active',
    isNewUser: true,
  },
];
