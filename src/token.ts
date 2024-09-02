import type { components } from '../types/corellium';

export const createTokenEndpoints = (
  baseUrl: string,
  Authorization: string
) => ({
  /**
   * Generate an API Token for the current user.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.token.create();
   */
  create: async () => {
    const url = new URL('/api/v1/auth/apitoken', baseUrl);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as components['schemas']['ApiToken'];
  },

  /**
   * Delete the API Token for the current user.
   * @returns `void`.
   * @throws {Error} The error message.
   * @example await corellium.token.delete();
   */
  delete: async () => {
    const url = new URL('/api/v1/auth/apitoken', baseUrl);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  },
});
