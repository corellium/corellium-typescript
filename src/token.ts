import type { components } from '../types/corellium';

export const createTokenEndpoints = (baseUrl: string, apiToken: string) => ({
  /**
   * Generate an API Token for the current user.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.token.create();
   */
  create: async () => {
    const url = new URL(`/apitoken`, baseUrl);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = (await response.json()) as components['schemas']['ApiToken'];

    return data;
  },

  /**
   * Delete the API Token for the current user.
   * @returns `void`.
   * @throws {Error} The error message.
   * @example await corellium.token.delete();
   */
  delete: async () => {
    const url = new URL(`/apitoken`, baseUrl);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  },
});
