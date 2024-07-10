import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createProfileEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  /**
   * List all profiles on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').profile.list();
   */
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

  /**
   * Install a profile on the device.
   * @param body The profile data.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').profile.install(File);
   */
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

  /**
   * Delete a profile from the device.
   * @param profileId The profile ID to delete.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').profile.delete('123');
   */
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
