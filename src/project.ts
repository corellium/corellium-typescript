import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createProjectEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  projectId: string
) => ({
  /**
   * Get a project by ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.project('123').get();
   */
  get: async () => {
    const response = await api.GET('/v1/projects/{projectId}', {
      params: {
        path: {
          projectId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Delete a project by ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.project('123').delete();
   */
  delete: async () => {
    const response = await api.DELETE('/v1/projects/{projectId}', {
      params: {
        path: {
          projectId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Update a project by ID.
   * @param body The project settings.
   * @param body.name The project name.
   * @param body.settings The project settings.
   * @param body.settings.internetAccess Whether the project has internet access.
   * @param body.settings.connection The project connection.
   * @param body.settings.dhcp Whether the project uses DHCP.
   * @param body.quotas The project quotas.
   * @param body.quotas.cores The project core quota.
   * @param body.quotas.instances The project instance quota.
   * @param body.quotas.ram The project RAM quota.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.project('123').update({ name: 'My Project' });
   */
  update: async (
    body: paths['/v1/projects/{projectId}']['patch']['requestBody']['content']['application/json']
  ) => {
    // Better version of PATCH /v1/projects/{projectId}/settings
    const response = await api.PATCH('/v1/projects/{projectId}', {
      params: {
        path: {
          projectId,
        },
      },
      body,
    });

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  device: {
    /**
     * List all devices in a project.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.project('123').device.list();
     */
    list: async () => {
      const response = await api.GET('/v1/projects/{projectId}/instances', {
        params: {
          path: {
            projectId,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.error ?? response.response.statusText);
      }

      return response.data;
    },
  },

  vpn: {
    /**
     * Get the VPN configuration for a project.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.project('123').vpn.get();
     */
    get: async () => {
      const response = await api.GET(
        '/v1/projects/{projectId}/vpnconfig/{format}',
        {
          params: {
            path: {
              projectId,
              format: 'ovpn',
            },
          },
        }
      );

      if (response.error) {
        throw new Error(response.error.error ?? response.response.statusText);
      }

      return response.data;
    },
  },

  keys: {
    /**
     * List all keys in a project.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.project('123').keys.list();
     */
    list: async () => {
      const response = await api.GET('/v1/projects/{projectId}/keys', {
        params: {
          path: {
            projectId,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.error ?? response.response.statusText);
      }

      return response.data;
    },

    /**
     * Add a key to a project.
     * @param body The key data.
     * @param body.kind The key kind e.g. `ssh` or `adb`.
     * @param body.name The key name e.g. `My Key`.
     * @param body.key The key e.g. `ssh-rsa ...`.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.project('123').keys.add({ kind: 'ssh', name: 'My Key', key: 'ssh-rsa ...' });
     */
    add: async (
      body: paths['/v1/projects/{projectId}/keys']['post']['requestBody']['content']['application/json']
    ) => {
      const response = await api.POST('/v1/projects/{projectId}/keys', {
        params: {
          path: {
            projectId,
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
     * Delete a key from a project.
     * @param keyId The key ID.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.project('123').keys.delete('456');
     */
    delete: async (
      keyId: paths['/v1/projects/{projectId}/keys/{keyId}']['delete']['parameters']['path']['keyId']
    ) => {
      const response = await api.DELETE(
        '/v1/projects/{projectId}/keys/{keyId}',
        {
          params: {
            path: {
              projectId,
              keyId,
            },
          },
        }
      );

      if (response.error) {
        throw new Error(response.error.error ?? response.response.statusText);
      }

      return response.data;
    },
  },
});
