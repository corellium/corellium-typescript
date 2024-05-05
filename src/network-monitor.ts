import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createNetworkMonitorEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  /**
   * Download the network monitor pcap file.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').networkMonitor.download();
   */
  download: async () => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/networkMonitor.pcap',
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
   * Start the network monitor on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').networkMonitor.start();
   */
  start: async () => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/sslsplit/enable',
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
   * Stop the network monitor on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').networkMonitor.stop();
   */
  stop: async () => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/sslsplit/disable',
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

  advanced: {
    /**
     * Start the advanced network monitor on the device.
     * @param body The request body.
     * @param body.portRanges A list of port ranges to filter on.
     * @param body.srcPorts A list of source ports to filter on.
     * @param body.dstPorts A list of destination ports to filter on.
     * @param body.ports A list of ports to filter on.
     * @param body.protocols A list of protocols to filter on.
     * @param body.processes A list of processes to filter on.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').networkMonitor.advanced.start({ portRanges: [1, 2, 3] });
     */
    start: async (
      body: paths['/v1/instances/{instanceId}/netdump/enable']['post']['requestBody']
    ) => {
      const response = await api.POST(
        '/v1/instances/{instanceId}/netdump/enable',
        {
          params: {
            path: {
              instanceId,
            },
          },
          body: body ?? {},
        }
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },

    /**
     * Stop the advanced network monitor on the device.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').networkMonitor.advanced.stop();
     */
    stop: async () => {
      const response = await api.POST(
        '/v1/instances/{instanceId}/netdump/disable',
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
     * Download the advanced network monitor pcap file.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').networkMonitor.advanced.download();
     */
    download: async () => {
      const response = await api.GET(
        '/v1/instances/{instanceId}/netdump.pcap',
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
  },
});
