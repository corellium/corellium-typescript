import type createFetchClient from 'openapi-fetch';
import type { components, paths } from '../types/corellium';

export const createProjectEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  /**
   * Get a project by ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.project.get('123');
   */
  get: async (
    projectId: paths['/v1/projects/{projectId}']['get']['parameters']['path']['projectId']
  ) => {
    const response = await api.GET('/v1/projects/{projectId}', {
      params: {
        path: {
          projectId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Create a new project.
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
   * @example const response = await corellium.project.create({ name: 'My Project' });
   */
  create: async (
    body: Omit<
      paths['/v1/projects']['post']['requestBody']['content']['application/json'],
      'settings'
    > & {
      settings: Omit<
        components['schemas']['ProjectSettings'],
        'internet-access'
      > & {
        internetAccess: boolean;
      };
    }
  ) => {
    const response = await api.POST('/v1/projects', {
      body: {
        ...body,
        settings: {
          ...body.settings,
          'internet-access': body.settings.internetAccess,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Delete a project by ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.project.delete('123');
   */
  delete: async (
    projectId: paths['/v1/projects/{projectId}']['delete']['parameters']['path']['projectId']
  ) => {
    const response = await api.DELETE('/v1/projects/{projectId}', {
      params: {
        path: {
          projectId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * List all projects.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.project.list();
   */
  list: async () => {
    const response = await api.GET('/v1/projects');

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Update a project by ID.
   * @param projectId The project ID.
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
   * @example const response = await corellium.project.update('123', { name: 'My Project' });
   */
  update: async (
    projectId: paths['/v1/projects/{projectId}']['patch']['parameters']['path']['projectId'],
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
      throw new Error(response.error.error);
    }

    return response.data;
  },

  device: {
    /**
     * List all devices in a project.
     * @param projectId The project ID.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.project.device.list('123');
     */
    list: async (
      projectId: paths['/v1/projects/{projectId}/instances']['get']['parameters']['path']['projectId']
    ) => {
      const response = await api.GET('/v1/projects/{projectId}/instances', {
        params: {
          path: {
            projectId,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },
  },

  vpn: {
    /**
     * Get the VPN configuration for a project.
     * @param projectId The project ID.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.project.vpn.get('123');
     */
    get: async (
      projectId: paths['/v1/projects/{projectId}/vpnconfig/{format}']['get']['parameters']['path']['projectId']
    ) => {
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
        throw new Error(response.error.error);
      }

      return response.data;
    },
  },

  keys: {
    /**
     * List all keys in a project.
     * @param projectId The project ID.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.project.keys.list('123');
     */
    list: async (
      projectId: paths['/v1/projects/{projectId}/keys']['get']['parameters']['path']['projectId']
    ) => {
      const response = await api.GET('/v1/projects/{projectId}/keys', {
        params: {
          path: {
            projectId,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },

    /**
     * Add a key to a project.
     * @param projectId The project ID.
     * @param body The key data.
     * @param body.kind The key kind e.g. `ssh` or `adb`.
     * @param body.name The key name e.g. `My Key`.
     * @param body.key The key e.g. `ssh-rsa ...`.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.project.keys.add('123', { kind: 'ssh', name: 'My Key', key: 'ssh-rsa ...' });
     */
    add: async (
      projectId: paths['/v1/projects/{projectId}/keys']['post']['parameters']['path']['projectId'],
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
        throw new Error(response.error.error);
      }

      return response.data;
    },

    /**
     * Delete a key from a project.
     * @param projectId The project ID.
     * @param keyId The key ID.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.project.keys.delete('123', '456');
     */
    delete: async (
      projectId: paths['/v1/projects/{projectId}/keys/{keyId}']['delete']['parameters']['path']['projectId'],
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
        throw new Error(response.error.error);
      }

      return response.data;
    },
  },
});
