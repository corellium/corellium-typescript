import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createFileEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  /**
   * Get a file from a device.
   * @param filePath The path of the file to get e.g. `/etc/hosts`
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').file('/etc/hosts').get();
   */
  get: async (
    filePath: paths['/v1/instances/{instanceId}/agent/v1/file/device/{filePath}']['get']['parameters']['path']['filePath']
  ) => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/agent/v1/file/device/{filePath}',
      {
        params: {
          path: {
            instanceId,
            filePath,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Create a file on a device.
   * @param filePath The path of the file to create e.g. `/etc/hosts`
   * @param body The file content.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').file('/etc/hosts').create('/etc/hosts', File);
   */
  create: async (
    filePath: paths['/v1/instances/{instanceId}/agent/v1/file/device/{filePath}']['put']['parameters']['path']['filePath'],
    body: paths['/v1/instances/{instanceId}/agent/v1/file/device/{filePath}']['put']['requestBody']['content']['application/octet-stream']
  ) => {
    const response = await api.PUT(
      '/v1/instances/{instanceId}/agent/v1/file/device/{filePath}',
      {
        params: {
          path: {
            instanceId,
            filePath,
          },
        },
        body,
      }
    );

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Delete a file from a device.
   * @param filePath The path of the file to delete e.g. `/etc/hosts`
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').file('/etc/hosts').delete();
   */
  delete: async (
    filePath: paths['/v1/instances/{instanceId}/agent/v1/file/device/{filePath}']['delete']['parameters']['path']['filePath']
  ) => {
    const response = await api.DELETE(
      '/v1/instances/{instanceId}/agent/v1/file/device/{filePath}',
      {
        params: {
          path: {
            instanceId,
            filePath,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Generate a temporary filename.
   * @description Returns a temporary random filename that is guranteed to be unique on the device's filesystem at the time of invocation of this method.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').file.generateFilename();
   */
  generateFilename: async () => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/agent/v1/file/temp',
      {
        params: {
          path: {
            instanceId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Update a file on a device.
   * @param filePath The path of the file to update e.g. `/etc/hosts`
   * @param body The file content.
   * @param body.path The new path of the file e.g. `/etc/hosts`
   * @param body.mode The new mode of the file e.g. `644`
   * @param body.uid The new owner of the file e.g. `0`
   * @param body.gid The new group of the file e.g. `0`
   */
  update: async (
    filePath: paths['/v1/instances/{instanceId}/agent/v1/file/device/{filePath}']['patch']['parameters']['path']['filePath'],
    body: paths['/v1/instances/{instanceId}/agent/v1/file/device/{filePath}']['patch']['requestBody']['content']['application/json']
  ) => {
    const response = await api.PATCH(
      '/v1/instances/{instanceId}/agent/v1/file/device/{filePath}',
      {
        params: {
          path: {
            instanceId,
            filePath,
          },
        },
        body,
      }
    );

    // Patching bad OpenAPI spec
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (response.error) {
      throw new Error(
        // Patching bad OpenAPI spec
        (response as unknown as { error: { error: string } }).error.error
      );
    }

    return response.data;
  },
});
