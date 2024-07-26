import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { User } from './types';

type Response = User[];
type Variables = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useUsers = createQuery<Response, Variables, AxiosError>({
  queryKey: ['users'],
  fetcher: () => {
    return client.get(`users`).then((response) => response.data.posts);
  },
});
