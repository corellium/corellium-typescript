import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createSnapshotEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  get: async (
    snapshotId: paths['/v1/snapshots/{snapshotId}']['get']['parameters']['path']['snapshotId'],
    options?: {
      instanceId?: paths['/v1/instances/{instanceId}/snapshots']['get']['parameters']['path']['instanceId'];
    }
  ) => {
    if (options?.instanceId) {
      const response = await api.GET(
        '/v1/instances/{instanceId}/snapshots/{snapshotId}',
        {
          params: {
            path: {
              instanceId: options.instanceId,
              snapshotId,
            },
          },
        }
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    }

    const response = await api.GET('/v1/snapshots/{snapshotId}', {
      params: {
        path: {
          snapshotId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  create: async (
    instanceId: paths['/v1/instances/{instanceId}/snapshots']['post']['parameters']['path']['instanceId'],
    body: paths['/v1/instances/{instanceId}/snapshots']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/instances/{instanceId}/snapshots', {
      params: {
        path: {
          instanceId,
        },
      },
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  delete: async (
    snapshotId: paths['/v1/snapshots/{snapshotId}']['delete']['parameters']['path']['snapshotId'],
    options?: {
      instanceId?: paths['/v1/instances/{instanceId}/snapshots/{snapshotId}']['delete']['parameters']['path']['instanceId'];
    }
  ) => {
    if (options?.instanceId) {
      const response = await api.DELETE(
        '/v1/instances/{instanceId}/snapshots/{snapshotId}',
        {
          params: {
            path: {
              instanceId: options.instanceId,
              snapshotId,
            },
          },
        }
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    }

    const response = await api.DELETE('/v1/snapshots/{snapshotId}', {
      params: {
        path: {
          snapshotId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  update: async (
    snapshotId: paths['/v1/snapshots/{snapshotId}']['patch']['parameters']['path']['snapshotId'],
    body: paths['/v1/instances/{instanceId}/snapshots/{snapshotId}']['patch']['requestBody']['content']['application/json'],
    options?: {
      instanceId?: paths['/v1/instances/{instanceId}/snapshots/{snapshotId}']['patch']['parameters']['path']['instanceId'];
    }
  ) => {
    if (options?.instanceId) {
      const response = await api.PATCH(
        '/v1/instances/{instanceId}/snapshots/{snapshotId}',
        {
          params: {
            path: {
              instanceId: options.instanceId,
              snapshotId,
            },
          },
          body,
        }
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    }

    const response = await api.PATCH('/v1/snapshots/{snapshotId}', {
      params: {
        path: {
          snapshotId,
        },
      },
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  restore: async (
    snapshotId: paths['/v1/instances/{instanceId}/snapshots/{snapshotId}/restore']['post']['parameters']['path']['snapshotId'],
    instanceId: paths['/v1/instances/{instanceId}/snapshots/{snapshotId}/restore']['post']['parameters']['path']['instanceId']
  ) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/snapshots/{snapshotId}/restore',
      {
        params: {
          path: {
            snapshotId,
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

  sharing: {
    create: async (
      snapshotId: paths['/v1/snapshots/{snapshotId}/share']['post']['parameters']['path']['snapshotId'],
      body: paths['/v1/snapshots/{snapshotId}/share']['post']['requestBody']['content']['application/json']
    ) => {
      const response = await api.POST('/v1/snapshots/{snapshotId}/share', {
        params: {
          path: {
            snapshotId,
          },
        },
        body,
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },

    addAccess: async (
      snapshotId: paths['/v1/snapshots/{snapshotId}/permissions']['post']['parameters']['path']['snapshotId'],
      body: paths['/v1/snapshots/{snapshotId}/permissions']['post']['requestBody']['content']['application/json']
    ) => {
      const response = await api.POST(
        '/v1/snapshots/{snapshotId}/permissions',
        {
          params: {
            path: {
              snapshotId,
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

    removeAccess: async (
      snapshotId: paths['/v1/snapshots/{snapshotId}/permissions']['delete']['parameters']['path']['snapshotId'],
      body: paths['/v1/snapshots/{snapshotId}/permissions']['delete']['requestBody']['content']['application/json']
    ) => {
      const response = await api.DELETE(
        '/v1/snapshots/{snapshotId}/permissions',
        {
          params: {
            path: {
              snapshotId,
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

    list: async () => {
      const response = await api.GET('/v1/snapshots/shared');

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },
  },
});
