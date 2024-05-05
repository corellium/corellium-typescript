import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createAppEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  list: async (instanceId: string) => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/agent/v1/app/apps',
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

  run: async (instanceId: string, bundleId: string) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/run',
      {
        params: {
          path: {
            instanceId,
            bundleId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  install: async (
    instanceId: string,
    body: paths['/v1/instances/{instanceId}/agent/v1/app/install']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/agent/v1/app/install',
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

  uninstall: async (instanceId: string, bundleId: string) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/uninstall',
      {
        params: {
          path: {
            instanceId,
            bundleId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  statuses: async (instanceId: string) => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/agent/v1/app/apps/update',
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

  icons: async (instanceId: string, bundleIds: string[]) => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/agent/v1/app/icons',
      {
        params: {
          path: {
            instanceId,
          },
          query: {
            bundleID: bundleIds,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  kill: async (instanceId: string, bundleId: string) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/kill',
      {
        params: {
          path: {
            instanceId,
            bundleId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },
});
