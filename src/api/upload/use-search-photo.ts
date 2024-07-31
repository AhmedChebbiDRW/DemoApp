import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { SearchPhotoResponse } from './types';

type Variables = { imageUrl: string };
type Response = SearchPhotoResponse;

export const useSearchPhoto = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'search/with/url',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
