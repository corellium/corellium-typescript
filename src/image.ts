import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createImageEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  list: async (projectId: string) => {
    const response = await api.GET('/v1/images', {
      params: {
        query: {
          project: projectId,
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

  create: async (
    body: paths['/v1/images']['post']['requestBody']['content']['multipart/form-data']
  ) => {
    const response = await api.POST('/v1/images', {
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  get: async (imageId: string) => {
    const response = await api.GET('/v1/images/{imageId}', {
      params: {
        path: {
          imageId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  update: async (
    imageId: string,
    body: paths['/v1/images/{imageId}']['post']['requestBody']['content']['binary']
  ) => {
    const response = await api.POST('/v1/images/{imageId}', {
      params: {
        path: {
          imageId,
        },
      },

      // @ts-expect-error - TBD, this sucks.
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  delete: async (imageId: string) => {
    const response = await api.DELETE('/v2/images/{imageId}', {
      params: {
        path: {
          imageId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },
});
