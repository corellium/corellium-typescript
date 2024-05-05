import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createDevicesEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  /**
   * Create a new device.
   * @param body The request body.
   * @param body.project The project ID.
   * @param body.name The name of the device.
   * @param body.flavor The flavor of the device e.g. `ranchu`, `iphone8plus`, etc.
   * @param body.os The OS version of the device e.g. `14.0.0`.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.devices.create({ project: 'projectId', name: 'My New Device', flavor: 'ranchu', os: '14.0.0' });
   */
  create: async (
    body: paths['/v1/instances']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/instances', {
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * List all devices.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.devices.list();
   */
  list: async () => {
    const response = await api.GET('/v1/instances');

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Search for a device by name.
   * @param name The name of the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.devices.search('My Device');
   */
  search: async (name: string) => {
    const response = await api.GET('/v1/instances', {
      params: {
        query: {
          name,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },
});
