import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createProfileEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  list: async (instanceId: string) => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/agent/v1/profile/profiles',
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

  install: async (
    instanceId: string,
    body: paths['/v1/instances/{instanceId}/agent/v1/profile/install']['post']['requestBody']['content']['application/octet-stream']
  ) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/agent/v1/profile/install',
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

  delete: async (instanceId: string, profileId: string) => {
    const response = await api.DELETE(
      '/v1/instances/{instanceId}/agent/v1/profile/profiles/{profileId}',
      {
        params: {
          path: {
            instanceId,
            profileId,
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
