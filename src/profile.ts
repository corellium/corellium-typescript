import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createProfileEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  list: async () => {
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

  delete: async (
    profileId: paths['/v1/instances/{instanceId}/agent/v1/profile/profiles/{profileId}']['delete']['parameters']['path']['profileId']
  ) => {
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
