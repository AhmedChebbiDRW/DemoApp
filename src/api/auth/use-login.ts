import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { LoginResponse } from './types';

type Variables = { email: string; password: string };
type Response = LoginResponse;

export const useLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'auth/email/login/mobile',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
