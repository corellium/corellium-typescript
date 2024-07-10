import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createUserEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  /**
   * Create a user.
   * @param body The request body.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.user.create(body);
   */
  create: async (
    body: paths['/v1/users']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/users', {
      body,
    });

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Delete a user.
   * @param userId The user ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.user.delete('123');
   */
  delete: async (
    userId: paths['/v1/users/{userId}']['delete']['parameters']['path']['userId']
  ) => {
    const response = await api.DELETE('/v1/users/{userId}', {
      params: {
        path: {
          userId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Update a user.
   * @param userId The user ID.
   * @param body The request body.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.user.update('123', body);
   */
  update: async (
    userId: paths['/v1/users/{userId}']['patch']['parameters']['path']['userId'],
    body: paths['/v1/users/{userId}']['patch']['requestBody']['content']['application/json']
  ) => {
    const response = await api.PATCH('/v1/users/{userId}', {
      params: {
        path: {
          userId,
        },
      },
      body,
    });

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },
});
