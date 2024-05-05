import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createDevicesEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  create: async (
    body: paths['/v1/instances']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/instances', {
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  list: async () => {
    const response = await api.GET('/v1/instances');

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  search: async (name: string) => {
    const response = await api.GET('/v1/instances', {
      params: {
        query: {
          name,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },
});
