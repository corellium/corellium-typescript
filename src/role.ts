import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createRoleEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  /**
   * List all roles.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.role.list();
   */
  list: async () => {
    const response = await api.GET('/v1/roles');

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Add a role for a user or team to a project.
   * @param projectId The project ID.
   * @param roleId The role ID.
   * @param options The user or team ID.
   * @param options.userId The user ID.
   * @param options.teamId The team ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.role.add('123', '456', { userId: '789' });
   * @example const response = await corellium.role.add('123', '456', { teamId: '789' });
   */
  add: async (
    projectId: paths['/v1/roles/projects/{projectId}/users/{userId}/roles/{roleId}']['put']['parameters']['path']['projectId'],
    roleId: paths['/v1/roles/projects/{projectId}/users/{userId}/roles/{roleId}']['put']['parameters']['path']['roleId'],
    options:
      | {
          teamId: paths['/v1/roles/projects/{projectId}/teams/{teamId}/roles/{roleId}']['put']['parameters']['path']['teamId'];
        }
      | {
          userId: paths['/v1/roles/projects/{projectId}/users/{userId}/roles/{roleId}']['put']['parameters']['path']['userId'];
        }
  ) => {
    if ('userId' in options) {
      const response = await api.PUT(
        '/v1/roles/projects/{projectId}/users/{userId}/roles/{roleId}',
        {
          params: {
            path: {
              roleId,
              projectId,
              userId: options.userId,
            },
          },
        }
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    }

    const response = await api.PUT(
      '/v1/roles/projects/{projectId}/teams/{teamId}/roles/{roleId}',
      {
        params: {
          path: {
            roleId,
            projectId,
            teamId: options.teamId,
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
   * Delete a role for a user or team from a project.
   * @param projectId The project ID.
   * @param roleId The role ID.
   * @param options The user or team ID.
   * @param options.userId The user ID.
   * @param options.teamId The team ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.role.delete('123', '456', { userId: '789' });
   * @example const response = await corellium.role.delete('123', '456', { teamId: '789' });
   */
  delete: async (
    projectId: paths['/v1/roles/projects/{projectId}/users/{userId}/roles/{roleId}']['delete']['parameters']['path']['projectId'],
    roleId: paths['/v1/roles/projects/{projectId}/users/{userId}/roles/{roleId}']['delete']['parameters']['path']['roleId'],
    options:
      | {
          teamId: paths['/v1/roles/projects/{projectId}/teams/{teamId}/roles/{roleId}']['delete']['parameters']['path']['teamId'];
        }
      | {
          userId: paths['/v1/roles/projects/{projectId}/users/{userId}/roles/{roleId}']['delete']['parameters']['path']['userId'];
        }
  ) => {
    if ('userId' in options) {
      const response = await api.DELETE(
        '/v1/roles/projects/{projectId}/users/{userId}/roles/{roleId}',
        {
          params: {
            path: {
              roleId,
              projectId,
              userId: options.userId,
            },
          },
        }
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    }

    const response = await api.DELETE(
      '/v1/roles/projects/{projectId}/teams/{teamId}/roles/{roleId}',
      {
        params: {
          path: {
            roleId,
            projectId,
            teamId: options.teamId,
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
