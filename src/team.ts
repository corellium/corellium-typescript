import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createTeamEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  list: async () => {
    const response = await api.GET('/v1/teams');

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  get: async (teamId: string) => {
    const teams = await createTeamEndpoints(api).list();

    return teams.find(({ id }) => id === teamId);
  },

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
