import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createAuthProviderEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
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
      throw new Error(response.error.error);
    }

    return response.data;
  },

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
      throw new Error(response.error.error);
    }

    return response.data;
  },

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
      throw new Error(response.error.error);
    }

    return response.data;
  },

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
      throw new Error(response.error.error);
    }

    return response.data;
  },
});
