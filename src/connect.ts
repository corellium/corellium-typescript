import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';
import { sendCommand } from './lib/command';

export const createConnectEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string,
  baseUrl: string
) => ({
  quickConnect: {
    /**
     * Get the quick connect command.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').connect.quickConnect.get();
     */
    get: async () => {
      const response = await api.GET(
        '/v2/instances/{instanceId}/quickConnectCommand',
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

  eth0IP: {
    /**
     * Get the IP address of the eth0 interface.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').connect.eth0IP.get();
     */
    get: async () => {
      const response = await api.GET(
        '/v1/instances/{instanceId}/agent/v1/system/network',
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

  adbAuthSetting: {
    /**
     * Get the ADB authentication setting.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').connect.adbAuthSetting.get();
     */
    get: async () => {
      const response = await api.GET(
        '/v1/instances/{instanceId}/agent/v1/system/adbauth',
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
     * Set the ADB authentication setting.
     * @param body The request body.
     * @param body.enabled Whether ADB authentication is enabled.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').connect.adbAuthSetting.set({ enabled });
     */
    set: async (
      body: paths['/v1/instances/{instanceId}/agent/v1/system/adbauth']['put']['requestBody']['content']['application/json']
    ) => {
      const response = await api.PUT(
        '/v1/instances/{instanceId}/agent/v1/system/adbauth',
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
        throw new Error(response.error.error);
      }

      return response.data;
    },
  },

  wifi: {
    connect: async () =>
      sendCommand(api, instanceId, baseUrl, 'wifi', 'connect'),
    disconnect: async () =>
      sendCommand(api, instanceId, baseUrl, 'wifi', 'disconnect'),
  },
});
