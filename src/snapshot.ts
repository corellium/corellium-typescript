import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createSnapshotEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId?: string
) => ({
  /**
   * List all snapshots.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').snapshot.list();
   */
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
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Get a snapshot.
   * @param snapshotId The snapshot ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.snapshot.get('123');
   * @example const response = await corellium.device('123').snapshot.get('123');
   */
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
        throw new Error(response.error.error ?? response.response.statusText);
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
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Create a snapshot.
   * @param body The snapshot data.
   * @param body.name The snapshot name.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').snapshot.create({ name: 'Snapshot' });
   */
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
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Delete a snapshot.
   * @param snapshotId The snapshot ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.snapshot.delete('123');
   * @example const response = await corellium.device('123').snapshot.delete('123');
   */
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
        throw new Error(response.error.error ?? response.response.statusText);
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
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Update a snapshot.
   * @param snapshotId The snapshot ID.
   * @param body The snapshot data.
   * @param body.name The snapshot name.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.snapshot.update('123', { name: 'Snapshot' });
   * @example const response = await corellium.device('123').snapshot.update('123', { name: 'Snapshot' });
   */
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
        throw new Error(response.error.error ?? response.response.statusText);
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
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Restore a snapshot.
   * @param snapshotId The snapshot ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').snapshot.restore('123');
   */
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
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  sharing: {
    /**
     * Share a snapshot.
     * @param snapshotId The snapshot ID.
     * @param body The sharing data.
     * @param body.sharingType The sharing type e.g. `publicLink`, `domainRestrictedLink`, `passwordPublicLink` or `emailInvite.`.
     * @param body.password The password for the sharing type `passwordPublicLink`.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.snapshot.sharing.create('123', { sharingType: 'publicLink' });
     */
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
        throw new Error(response.error.error ?? response.response.statusText);
      }

      return response.data;
    },

    /**
     * Allow access to a shared snapshot.
     * @param snapshotId The snapshot ID.
     * @param body The sharing data.
     * @param body.members The members to allow access e.g. `['jane@acme.com', 'john@acme.com']`.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.snapshot.sharing.allow('123', { members: ['jane@acme.com', 'john@acme.com'] });
     */
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
        throw new Error(response.error.error ?? response.response.statusText);
      }

      return response.data;
    },

    /**
     * Revoke access to a shared snapshot.
     * @param snapshotId The snapshot ID.
     * @param body The sharing data.
     * @param body.members The members to revoke access  e.g. `['jane@acme.com', 'john@acme.com']`.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.snapshot.sharing.revoke('123', { members: ['jane@acme.com', 'john@acme.com'] });
     */
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
        throw new Error(response.error.error ?? response.response.statusText);
      }

      return response.data;
    },

    /**
     * List all shared snapshots.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.snapshot.sharing.list();
     */
    list: async () => {
      const response = await api.GET('/v1/snapshots/shared');

      if (response.error) {
        throw new Error(response.error.error ?? response.response.statusText);
      }

      return response.data;
    },

    /**
     * Accept a snapshot shared with you.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example await corellium.snapshot.sharing.accept({ sharingType: 'passwordPublicLink', password: 'abcd' });
     */
    accept: async (
      body: paths['/v1/snapshots/accept']['post']['requestBody']['content']['application/json']
    ) => {
      const response = await api.POST('/v1/snapshots/accept', {
        body,
      });

      if (response.error) {
        throw new Error(response.error.error ?? response.response.statusText);
      }

      return response.data;
    },
  },
});
