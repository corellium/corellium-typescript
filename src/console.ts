import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createConsoleEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  get: async (instanceId: string) => {
    const response = await api.GET('/v1/instances/{instanceId}/console', {
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
