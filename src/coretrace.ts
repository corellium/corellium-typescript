import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createCoreTraceEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  start: async (instanceId: string) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/strace/enable',
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

  stop: async (instanceId: string) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/strace/disable',
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

  threads: async (instanceId: string) => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/strace/thread-list',
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
    const response = await api.DELETE('/v1/instances/{instanceId}/strace', {
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
