import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { EmailOtpConfirmResponse } from './types';

type Variables = { email: string; otp: string };
type Response = EmailOtpConfirmResponse;

export const useEmailOtpConfirm = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    client({
      url: 'auth/email/confirm',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
