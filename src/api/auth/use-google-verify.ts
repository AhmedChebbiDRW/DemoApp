import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';

type Variables = { idToken: string };
type Response = any;

export const useGoogleVerify = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'auth/google/verify',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
