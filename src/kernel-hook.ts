import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createKernelHookEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  list: async (instanceId: string) => {
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
    instanceId: string,
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

  get: async (hookId: string) => {
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
    hookId: string,
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

  delete: async (hookId: string) => {
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

  run: async (instanceId: string) => {
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

  clear: async (instanceId: string) => {
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
