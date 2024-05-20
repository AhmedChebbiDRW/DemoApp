import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { clientTB } from '../common';
import type { Partner } from './types';

type Response = Partner[];
type Variables = void;

export const usePartners = createQuery<Response, Variables, AxiosError>({
  queryKey: ['partners'],
  fetcher: () => {
    return clientTB
      .get(`partner`)
      .then((response) => {
        console.log('🚀 ~ returnclientTB.get ~ response.data:', response);
        return response.data.result.data;
      })
      .catch((error: any) => {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Server Error:', error.response.status);
        } else if (error.request) {
          // Request was made but no response received
          console.error('Network Error:', error.request);
        } else {
          // Something else happened
          console.error('Error:', error.message);
        }
      });
  },
});
