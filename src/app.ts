import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createAppEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  /**
   * List all apps installed on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').app.list();
   */
  list: async () => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/agent/v1/app/apps',
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
   * Run an app on the device.
   * @param bundleId The bundle ID of the app to run e.g. `com.corellium.cafe`
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').app.run('com.corellium.cafe');
   */
  run: async (
    bundleId: paths['/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/run']['post']['parameters']['path']['bundleId']
  ) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/run',
      {
        params: {
          path: {
            instanceId,
            bundleId,
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
   * Install an app on the device.
   * @param body The request body.
   * @param body.path The path to the app to install.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').app.install({ path });
   */
  install: async (
    body: paths['/v1/instances/{instanceId}/agent/v1/app/install']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/agent/v1/app/install',
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

  /**
   * Uninstall an app from the device.
   * @param bundleId The bundle ID of the app to uninstall e.g. `com.corellium.cafe`
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').app.uninstall('com.corellium.cafe');
   */
  uninstall: async (
    bundleId: paths['/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/uninstall']['post']['parameters']['path']['bundleId']
  ) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/uninstall',
      {
        params: {
          path: {
            instanceId,
            bundleId,
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
   * Get the status of the app.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').app.statuses();
   */
  statuses: async () => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/agent/v1/app/apps/update',
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
   * Get the icon of the app.
   * @param bundleIds The bundle IDs of the apps to get the icons for.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').app.icons(['com.corellium.cafe', 'com.apple.mobilesafari']);
   */
  icons: async (
    bundleIds: paths['/v1/instances/{instanceId}/agent/v1/app/icons']['get']['parameters']['query']['bundleID']
  ) => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/agent/v1/app/icons',
      {
        params: {
          path: {
            instanceId,
          },
          query: {
            bundleID: bundleIds,
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
   * Kill an app on the device.
   * @param bundleId The bundle ID of the app to kill e.g. `com.corellium.cafe`
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').app.kill('com.corellium.cafe');
   */
  kill: async (
    bundleId: paths['/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/kill']['post']['parameters']['path']['bundleId']
  ) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/agent/v1/app/apps/{bundleId}/kill',
      {
        params: {
          path: {
            instanceId,
            bundleId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  openGApps: {
    /**
     * Install OpenGApps on the device.
     * @param body The request body.
     * @param body.url The URL to the OpenGApps package e.g. `http://downloads.sourceforge.net/project/opengapps/arm64/20220119/open_gapps-arm64-11.0-pico-20220119.zip?r=&ts=1653516572&use_mirror=gigenet`
     * @param body.hash The hash of the OpenGApps package e.g. `58398bf7628f38ef07eaeb3abe26f3ebf0474f4d5ecdac0852bd5de3c15cc828`
     * @param body.fingerprint The fingerprint of the OpenGApps package e.g. `google/flame/flame:11/RP1A.200720.009/6720564:user/release-keys__2020-09-05`
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').app.openGApps.install({ url, hash, fingerprint });
     */
    install: async (
      /*
       * Patching bad OpenAPI spec
       * body: paths['/v1/instances/{instanceId}/agent/v1/system/install-opengapps']['post']['requestBody']['content']['application/json']
       */
      body: {
        url: string;
        hash: string;
        fingerprint: string;
      }
    ) => {
      const response = await api.POST(
        '/v1/instances/{instanceId}/agent/v1/system/install-opengapps',
        {
          params: {
            path: {
              instanceId,
            },
          },
          body: body as unknown as paths['/v1/instances/{instanceId}/agent/v1/system/install-opengapps']['post']['requestBody']['content']['application/json'],
        }
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },
  },
});
