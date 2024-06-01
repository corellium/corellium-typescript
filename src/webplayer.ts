import type { components } from '../types/corellium';

export const createWebplayerEndpoints = (
  baseUrl: string,
  apiToken: string
) => ({
  /**
   * Get a webplayer session.
   * @param sessionId The session ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.webplayer.get('123');
   */
  get: async (sessionId: string) => {
    const url = new URL(`/api/v1/webplayer/${sessionId}`, baseUrl);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as components['schemas']['WebPlayerSession'];
  },

  /**
   * List all webplayer sessions.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.webplayer.list();
   */
  list: async () => {
    const url = new URL('/webplayer', baseUrl);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as components['schemas']['WebPlayerSession'][];
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
        Authorization: `Bearer ${apiToken}`,
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
    const url = new URL('/webplayer', baseUrl);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  },

  /**
   * Delete a webplayer session.
   * @param sessionId The session ID.
   * @throws {Error} The error message.
   * @example await corellium.webplayer.delete('123');
   */
  delete: async (sessionId: string) => {
    const url = new URL(`/api/v1/webplayer/${sessionId}`, baseUrl);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  },
});
