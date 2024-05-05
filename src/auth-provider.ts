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

  delete: async (domainId: string, providerId: string) => {
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

  list: async (domainId: string) => {
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
