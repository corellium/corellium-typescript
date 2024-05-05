import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createUserEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  create: async (
    body: paths['/v1/users']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/users', {
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  delete: async (userId: string) => {
    const response = await api.DELETE('/v1/users/{userId}', {
      params: {
        path: {
          userId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  update: async (
    userId: string,
    body: paths['/v1/users/{userId}']['patch']['requestBody']['content']['application/json']
  ) => {
    const response = await api.PATCH('/v1/users/{userId}', {
      params: {
        path: {
          userId,
        },
      },
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },
});
