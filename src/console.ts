import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createConsoleEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  /**
   * Get the console output of the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').console.get();
   */
  get: async () => {
    const response = await api.GET('/v1/instances/{instanceId}/console', {
      params: {
        path: {
          instanceId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },
});
