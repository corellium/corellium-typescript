import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createAppEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  list: async (
    instanceId: paths['/v1/instances/{instanceId}/agent/v1/app/apps']['get']['parameters']['path']['instanceId']
  ) => {
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

  run: async (
    instanceId: paths['/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/run']['post']['parameters']['path']['instanceId'],
    bundleId: paths['/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/run']['post']['parameters']['path']['bundleId']
  ) => {
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
    instanceId: paths['/v1/instances/{instanceId}/agent/v1/app/install']['post']['parameters']['path']['instanceId'],
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

  uninstall: async (
    instanceId: paths['/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/uninstall']['post']['parameters']['path']['instanceId'],
    bundleId: paths['/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/uninstall']['post']['parameters']['path']['bundleId']
  ) => {
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

  statuses: async (
    instanceId: paths['/v1/instances/{instanceId}/agent/v1/app/apps/update']['get']['parameters']['path']['instanceId']
  ) => {
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

  icons: async (
    instanceId: paths['/v1/instances/{instanceId}/agent/v1/app/icons']['get']['parameters']['path']['instanceId'],
    bundleIds: paths['/v1/instances/{instanceId}/agent/v1/app/icons']['get']['parameters']['query']['bundleID']
  ) => {
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

  kill: async (
    instanceId: paths['/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/kill']['post']['parameters']['path']['instanceId'],
    bundleId: paths['/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/kill']['post']['parameters']['path']['bundleId']
  ) => {
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

  openGApps: {
    install: async (
      instanceId: paths['/v1/instances/{instanceId}/agent/v1/system/install-opengapps']['post']['parameters']['path']['instanceId'],
      body: paths['/v1/instances/{instanceId}/agent/v1/system/install-opengapps']['post']['requestBody']['content']['application/json']
    ) => {
      const response = await api.POST(
        '/v1/instances/{instanceId}/agent/v1/system/install-opengapps',
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
  },
});
