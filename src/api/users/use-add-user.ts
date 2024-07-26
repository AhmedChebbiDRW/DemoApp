import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { User } from './types';

type Variables = { age: number; mode: string; size: number; marques: string[] };
type Response = User;

export const useAddUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'users/add',
      method: 'POST',
      data: variables,
    }).then((response) => response.data.result),
});
