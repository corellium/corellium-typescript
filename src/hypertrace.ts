import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createHyperTraceEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  start: async (
    instanceId: string,
    body: paths['/v1/instances/{instanceId}/btrace/enable']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/btrace/enable',
      {
        params: {
          path: {
            instanceId,
          },
        },
        body,
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  stop: async (instanceId: string) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/btrace/disable',
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

  ranges: async (instanceId: string) => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/btrace-kcrange',
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

  authorize: async (instanceId: string) => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/btrace-authorize',
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
    const response = await api.DELETE('/v1/instances/{instanceId}/btrace', {
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
