import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createPanicEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  /**
   * List all panics on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').panic.list();
   */
  list: async () => {
    const response = await api.GET('/v1/instances/{instanceId}/panics', {
      params: {
        path: {
          instanceId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Clear all panics on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').panic.clear();
   */
  clear: async () => {
    const response = await api.DELETE('/v1/instances/{instanceId}/panics', {
      params: {
        path: {
          instanceId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },
});
