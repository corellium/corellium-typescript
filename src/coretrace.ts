import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createCoreTraceEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  start: async () => {
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

  stop: async () => {
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

  threads: async () => {
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

  clear: async () => {
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
