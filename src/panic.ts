import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createPanicEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  list: async () => {
    const response = await api.GET('/v1/instances/{instanceId}/panics', {
      params: {
        path: {
          instanceId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  clear: async () => {
    const response = await api.DELETE('/v1/instances/{instanceId}/panics', {
      params: {
        path: {
          instanceId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },
});
