import type createFetchClient from 'openapi-fetch';
import type { components, paths } from '../types/corellium';

export const createWebplayerEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  baseUrl: string,
  Authorization: string
) => ({
  /**
   * Get a webplayer session.
   * @param sessionId The session ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.webplayer.get('123');
   */
  get: async (sessionId: string) => {
    const response = await api.GET('/v1/webplayer/{sessionId}', {
      params: {
        path: {
          sessionId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * List all webplayer sessions.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.webplayer.list();
   */
  list: async () => {
    const response = await api.GET('/v1/webplayer');

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Refresh a webplayer session.
   * @param sessionId The session ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.webplayer.refresh('123');
   */
  refresh: async (sessionId: string) => {
    const url = new URL(`/api/v1/webplayer/${sessionId}/refresh`, baseUrl);

    const response = await fetch(url, {
      headers: {
        Authorization,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as components['schemas']['WebPlayerSession'];
  },

  /**
   * Create a new webplayer session.
   * @param body The request body.
   * @param body.projectId The project ID.
   * @param body.instanceId The device ID.
   * @param body.expiresIn The session expiration time.
   * @param body.features The session features e.g. `{ apps: true, connect: true }`.
   * @param body.clientId The client ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.webplayer.create({ projectId: '123', instanceId: '456', expiresIn: 3600, features: { apps: true, connect: true }, clientId: '789' });
   */
  create: async (
    body: components['schemas']['WebPlayerCreateSessionRequest']
  ) => {
    const response = await api.POST('/v1/webplayer', {
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Delete a webplayer session.
   * @param sessionId The session ID.
   * @throws {Error} The error message.
   * @example await corellium.webplayer.delete('123');
   */
  delete: async (sessionId: string) => {
    const response = await api.DELETE('/v1/webplayer/{sessionId}', {
      params: {
        path: {
          sessionId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  domains: {
    /**
     * Retrieve the list of allowed domains for all Webplayer sessions.
     * @throws {Error} The error message.
     * @example await corellium.webplayer.domains.list();
     */
    list: async () => {
      const response = await api.GET('/v1/webplayer/allowedDomains');

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },
  },
});
