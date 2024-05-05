import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createFileEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
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
      throw new Error(response.error.error);
    }

    return response.data;
  },

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
      throw new Error(response.error.error);
    }

    return response.data;
  },

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
      throw new Error(response.error.error);
    }

    return response.data;
  },

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
      throw new Error(response.error.error);
    }

    return response.data;
  },

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
