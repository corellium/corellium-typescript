import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createConnectEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  getQuickConnectUrl: async (
    instanceId: paths['/v2/instances/{instanceId}/quickConnectCommand']['get']['parameters']['path']['instanceId']
  ) => {
    const response = await api.GET(
      '/v2/instances/{instanceId}/quickConnectCommand',
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

  eth0IP: {
    get: async (
      instanceId: paths['/v1/instances/{instanceId}/agent/v1/system/network']['get']['parameters']['path']['instanceId']
    ) => {
      const response = await api.GET(
        '/v1/instances/{instanceId}/agent/v1/system/network',
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
  },

  adbAuthSetting: {
    get: async (
      instanceId: paths['/v1/instances/{instanceId}/agent/v1/system/adbauth']['get']['parameters']['path']['instanceId']
    ) => {
      const response = await api.GET(
        '/v1/instances/{instanceId}/agent/v1/system/adbauth',
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

    set: async (
      instanceId: paths['/v1/instances/{instanceId}/agent/v1/system/adbauth']['put']['parameters']['path']['instanceId'],
      body: paths['/v1/instances/{instanceId}/agent/v1/system/adbauth']['put']['requestBody']['content']['application/json']
    ) => {
      const response = await api.PUT(
        '/v1/instances/{instanceId}/agent/v1/system/adbauth',
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
