import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createModelEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  list: async () => {
    const response = await api.GET('/v1/models');

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

  software: {
    list: async (
      modelId: paths['/v1/models/{model}/software']['get']['parameters']['path']['model']
    ) => {
      const response = await api.GET('/v1/models/{model}/software', {
        params: {
          path: {
            model: modelId,
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
  },
});
