import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { LoginResponse } from './types';

type Variables = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
};
type Response = LoginResponse;

export const useGoogleRegister = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    client({
      url: 'auth/google/mobile-register',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
