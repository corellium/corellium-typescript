import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createCoreTraceEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  start: async (instanceId: string) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/btrace/enable',
      {
        params: {
          path: {
            instanceId,
          },
        },

        // Patching bad OpenAPI spec
        body: {},
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
