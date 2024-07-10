import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createHyperTraceEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  /**
   * Start HyperTrace on the device.
   * @param body The request body.
   * @param body.ranges The ranges to trace e.g. `[['0x1000', '0x2000']]`
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').hypertrace.start({ ranges: [['0x1000', '0x2000']] });
   */
  start: async (
    body: paths['/v1/instances/{instanceId}/btrace/enable']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/btrace/enable',
      {
        params: {
          path: {
            instanceId,
          },
        },
        body,
      }
    );

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Stop HyperTrace on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').hypertrace.stop();
   */
  stop: async () => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/btrace/disable',
      {
        params: {
          path: {
            instanceId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Get HyperTrace ranges on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').hypertrace.ranges();
   */
  ranges: async () => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/btrace-kcrange',
      {
        params: {
          path: {
            instanceId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Pre-authorize a HyperTrace download.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').hypertrace.authorize();
   */
  authorize: async () => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/btrace-authorize',
      {
        params: {
          path: {
            instanceId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Clear HyperTrace logs on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').hypertrace.clear();
   */
  clear: async () => {
    const response = await api.DELETE('/v1/instances/{instanceId}/btrace', {
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
