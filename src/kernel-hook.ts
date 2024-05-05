import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createKernelHookEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  list: async () => {
    const response = await api.GET('/v1/instances/{instanceId}/hooks', {
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

  create: async (
    body: paths['/v1/instances/{instanceId}/hooks']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/instances/{instanceId}/hooks', {
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

  get: async (
    hookId: paths['/v1/hooks/{hookId}']['get']['parameters']['path']['hookId']
  ) => {
    const response = await api.GET('/v1/hooks/{hookId}', {
      params: {
        path: {
          hookId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  update: async (
    hookId: paths['/v1/hooks/{hookId}']['put']['parameters']['path']['hookId'],
    body: paths['/v1/hooks/{hookId}']['put']['requestBody']['content']['application/json']
  ) => {
    const response = await api.PUT('/v1/hooks/{hookId}', {
      params: {
        path: {
          hookId,
        },
      },
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  delete: async (
    hookId: paths['/v1/hooks/{hookId}']['delete']['parameters']['path']['hookId']
  ) => {
    const response = await api.DELETE('/v1/hooks/{hookId}', {
      params: {
        path: {
          hookId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  run: async () => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/hooks/execute',
      {
        params: {
          path: {
            instanceId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  clear: async () => {
    const response = await api.POST('/v1/instances/{instanceId}/hooks/clear', {
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
