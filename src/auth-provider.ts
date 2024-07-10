import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createAuthProviderEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  /**
   * Update an authentication provider.
   * @param body The request body.
   * @param body.providerType The provider type.
   * @param body.enabled Whether the provider is enabled.
   * @param body.label The provider label.
   * @param body.config The provider configuration.
   * @param body.config.clientId The client ID.
   * @param body.config.clientSecret The client secret.
   * @param body.config.discoveryUrl The discovery URL.
   * @param body.config.invitedOnly Whether the provider is invited only.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.authProvider.update({ providerType, enabled, label, config });
   */
  update: async (
    body: paths['/v1/domain/{domainId}/auth/{providerId}']['put']['requestBody']['content']['application/json']
  ) => {
    const response = await api.PUT('/v1/domain/{domainId}/auth/{providerId}', {
      params: {
        path: {
          domainId: 'string',
          providerId: 'string',
        },
      },
      body,
    });

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Delete an authentication provider.
   * @param domainId The domain ID.
   * @param providerId The provider ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.authProvider.delete(domainId, providerId);
   */
  delete: async (
    domainId: paths['/v1/domain/{domainId}/auth/{providerId}']['delete']['parameters']['path']['domainId'],
    providerId: paths['/v1/domain/{domainId}/auth/{providerId}']['delete']['parameters']['path']['providerId']
  ) => {
    const response = await api.DELETE(
      '/v1/domain/{domainId}/auth/{providerId}',
      {
        params: {
          path: {
            domainId,
            providerId,
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
   * List authentication providers.
   * @param domainId The domain ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.authProvider.get(domainId);
   */
  list: async (
    domainId: paths['/v1/domain/{domainId}/auth']['get']['parameters']['path']['domainId']
  ) => {
    const response = await api.GET('/v1/domain/{domainId}/auth', {
      params: {
        path: {
          domainId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Create an authentication provider.
   * @param body The request body.
   * @param body.providerType The provider type.
   * @param body.enabled Whether the provider is enabled.
   * @param body.label The provider label.
   * @param body.config The provider configuration.
   * @param body.config.clientId The client ID.
   * @param body.config.clientSecret The client secret.
   * @param body.config.discoveryUrl The discovery URL.
   * @param body.config.invitedOnly Whether the provider is invited only.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.authProvider.create({ providerType, enabled, label, config });
   */
  create: async (
    body: paths['/v1/domain/{domainId}/auth']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/domain/{domainId}/auth', {
      params: {
        path: {
          domainId: 'string',
        },
      },
      body,
    });

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },
});
