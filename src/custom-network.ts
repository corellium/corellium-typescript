import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createCustomNetworkEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  /**
   * List all custom networks.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.customNetwork.list();
   */
  list: async () => {
    const response = await api.GET('/v1/network/connections');

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Create a custom network by ID.
   * @param body The custom network OpenVPN confguration.
   * @param body.name The name of the custom network.
   * @param body.config The OpenVPN configuration.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.customNetwork.get('123');
   */
  create: async (
    body: paths['/v1/network/connections']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/network/connections', {
      body,
    });

    // Patching bad OpenAPI spec
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (response.error) {
      throw new Error(
        // Patching bad OpenAPI spec
        (response as unknown as { error: { error: string } }).error.error
      );
    }

    return response.data;
  },

  /**
   * Update a custom network.
   * @param customNetworkId The custom network ID.
   * @param body The custom network OpenVPN confguration.
   * @param body.name The name of the custom network.
   * @param body.config The OpenVPN configuration.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.customNetwork.update('123', { name, config });
   */
  update: async (
    customNetworkId: paths['/v1/network/connections/{id}']['patch']['parameters']['path']['id'],
    /*
     * Patching bad OpenAPI spec
     * body: paths['/v1/network/connections/{id}']['patch']['requestBody']['content']['application/json']
     */
    body: {
      name?: string;
      config?: string;
    }
  ) => {
    // There's also PUT but I think that overwrites the entire object
    const response = await api.PATCH('/v1/network/connections/{id}', {
      params: {
        path: {
          customNetworkId,
        },
      },
      body: {
        name: body.name,
        provider: 'openvpn',
        config: {
          config: body.config,
        },
      },
    });

    // Patching bad OpenAPI spec
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (response.error) {
      throw new Error(
        // Patching bad OpenAPI spec
        (response as unknown as { error: { error: string } }).error.error
      );
    }

    return response.data;
  },

  /**
   * Delete a custom network.
   * @param customNetworkId The custom network ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.customNetwork.delete('123');
   */
  delete: async (
    customNetworkId: paths['/v1/network/connections/{id}']['delete']['parameters']['path']['id']
  ) => {
    const response = await api.DELETE('/v1/network/connections/{id}', {
      params: {
        path: {
          id: customNetworkId,
        },
      },
    });

    // Patching bad OpenAPI spec
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (response.error) {
      throw new Error(
        // Patching bad OpenAPI spec
        (response as unknown as { error: { error: string } }).error.error
      );
    }

    return response.data;
  },

  providers: {
    /**
     * List all custom network providers.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.customNetwork.providers.list();
     */
    list: async () => {
      const response = await api.GET('/v1/network/providers');

      if (response.error) {
        throw new Error(response.error.error ?? response.response.statusText);
      }

      return response.data;
    },
  },
});
