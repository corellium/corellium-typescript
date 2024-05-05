import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createCustomNetworkEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  list: async () => {
    const response = await api.GET('/v1/network/connections');

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  create: async (
    /*
     * Patching bad OpenAPI spec
     * body: paths['/v1/network/connections']['post']['requestBody']['content']['application/json']
     */
    body: {
      provider: 'openvpn';
      name: string;
      config: {
        config: string;
      };
    }
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

  update: async (
    customNetworkId: string,
    /*
     * Patching bad OpenAPI spec
     * body: paths['/v1/network/connections/{id}']['patch']['requestBody']['content']['application/json']
     */
    body: {
      name?: string;
      config?: {
        config: string;
      };
    }
  ) => {
    // There's also PUT but I think that overwrites the entire object
    const response = await api.PATCH('/v1/network/connections/{id}', {
      params: {
        path: {
          customNetworkId,
        },
      },
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

  delete: async (customNetworkId: string) => {
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
    list: async () => {
      const response = await api.GET('/v1/network/providers');

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },
  },
});
