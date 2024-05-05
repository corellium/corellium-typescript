import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createCoreTraceEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  /**
   * Start CoreTrace on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').coretrace.start();
   */
  start: async () => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/strace/enable',
      {
        params: {
          path: {
            instanceId,
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
   * Stop CoreTrace on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').coretrace.stop();
   */
  stop: async () => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/strace/disable',
      {
        params: {
          path: {
            instanceId,
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
   * Get running threads of CoreTrace on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').coretrace.get();
   */
  threads: async () => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/strace/thread-list',
      {
        params: {
          path: {
            instanceId,
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
   * Clear CoreTrace logs on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').coretrace.log();
   */
  clear: async () => {
    const response = await api.DELETE('/v1/instances/{instanceId}/strace', {
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
