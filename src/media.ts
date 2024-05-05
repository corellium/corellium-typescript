import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createMediaEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  start: async (
    body: paths['/v1/instances/{instanceId}/media/play']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/instances/{instanceId}/media/play', {
      params: {
        path: {
          instanceId,
        },
      },
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  stop: async () => {
    const response = await api.POST('/v1/instances/{instanceId}/media/stop', {
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
