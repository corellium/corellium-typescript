import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createNetworkMonitorEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  download: async (instanceId: string) => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/networkMonitor.pcap',
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

  start: async (instanceId: string) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/sslsplit/enable',
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
      '/v1/instances/{instanceId}/sslsplit/disable',
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

  advanced: {
    start: async (
      instanceId: string,
      body: paths['/v1/instances/{instanceId}/netdump/enable']['post']['requestBody']
    ) => {
      const response = await api.POST(
        '/v1/instances/{instanceId}/netdump/enable',
        {
          params: {
            path: {
              instanceId,
            },
          },
          body: body ?? {},
        }
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },

    stop: async (instanceId: string) => {
      const response = await api.POST(
        '/v1/instances/{instanceId}/netdump/disable',
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

    download: async (instanceId: string) => {
      const response = await api.GET(
        '/v1/instances/{instanceId}/netdump.pcap',
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
});
