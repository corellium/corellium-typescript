import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createTeamEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  /**
   * List all teams.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.team.list();
   */
  list: async () => {
    const response = await api.GET('/v1/teams');

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Get a team.
   * @param teamId The team ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.team.get('123');
   */
  get: async (teamId: string) => {
    const teams = await createTeamEndpoints(api).list();

    return teams.find(({ id }) => id === teamId);
  },

  /**
   * Create a team.
   * @param body The request body.
   * @param body.name The team name.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.team.create({ name: 'Team' });
   */
  create: async (
    body: paths['/v1/teams']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/teams', {
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Update a team.
   * @param teamId The team ID.
   * @param body The request body.
   * @param body.name The team name.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.team.update('123', { name: 'Team' });
   */
  update: async (
    teamId: paths['/v1/teams/{teamId}']['patch']['parameters']['path']['teamId'],
    body: paths['/v1/teams/{teamId}']['patch']['requestBody']['content']['application/json']
  ) => {
    const response = await api.PATCH('/v1/teams/{teamId}', {
      params: {
        path: {
          teamId,
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
   * Delete a team.
   * @param teamId The team ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.team.delete('123');
   */
  delete: async (
    teamId: paths['/v1/teams/{teamId}']['delete']['parameters']['path']['teamId']
  ) => {
    const response = await api.DELETE('/v1/teams/{teamId}', {
      params: {
        path: {
          teamId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  users: {
    /**
     * Add a user to a team.
     * @param teamId The team ID.
     * @param userId The user ID.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.team.users.create('123', '456');
     */
    create: async (
      teamId: paths['/v1/teams/{teamId}/users/{userId}']['put']['parameters']['path']['teamId'],
      userId: paths['/v1/teams/{teamId}/users/{userId}']['put']['parameters']['path']['userId']
    ) => {
      const response = await api.PUT('/v1/teams/{teamId}/users/{userId}', {
        params: {
          path: {
            teamId,
            userId,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },

    /**
     * Delete a user from a team.
     * @param teamId The team ID.
     * @param userId The user ID.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.team.users.delete('123', '456');
     */
    delete: async (
      teamId: paths['/v1/teams/{teamId}/users/{userId}']['delete']['parameters']['path']['teamId'],
      userId: paths['/v1/teams/{teamId}/users/{userId}']['delete']['parameters']['path']['userId']
    ) => {
      const response = await api.DELETE('/v1/teams/{teamId}/users/{userId}', {
        params: {
          path: {
            teamId,
            userId,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },
  },
});
