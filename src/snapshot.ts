import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createSnapshotEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId?: string
) => ({
  list: async () => {
    if (!instanceId) {
      throw new Error('instanceId is required');
    }

    const response = await api.GET('/v1/instances/{instanceId}/snapshots', {
      params: {
        path: {
          instanceId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  get: async (
    snapshotId: paths['/v1/snapshots/{snapshotId}']['get']['parameters']['path']['snapshotId']
  ) => {
    if (instanceId) {
      const response = await api.GET(
        '/v1/instances/{instanceId}/snapshots/{snapshotId}',
        {
          params: {
            path: {
              instanceId,
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
    body: paths['/v1/instances/{instanceId}/snapshots']['post']['requestBody']['content']['application/json']
  ) => {
    if (!instanceId) {
      throw new Error('instanceId is required');
    }

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
    snapshotId: paths['/v1/snapshots/{snapshotId}']['delete']['parameters']['path']['snapshotId']
  ) => {
    if (instanceId) {
      const response = await api.DELETE(
        '/v1/instances/{instanceId}/snapshots/{snapshotId}',
        {
          params: {
            path: {
              instanceId,
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
    body: paths['/v1/instances/{instanceId}/snapshots/{snapshotId}']['patch']['requestBody']['content']['application/json']
  ) => {
    if (instanceId) {
      const response = await api.PATCH(
        '/v1/instances/{instanceId}/snapshots/{snapshotId}',
        {
          params: {
            path: {
              instanceId,
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
    snapshotId: paths['/v1/instances/{instanceId}/snapshots/{snapshotId}/restore']['post']['parameters']['path']['snapshotId']
  ) => {
    if (!instanceId) {
      throw new Error('instanceId is required');
    }

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

    allow: async (
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

    revoke: async (
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
