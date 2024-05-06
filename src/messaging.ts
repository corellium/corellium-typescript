import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createMessagingEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  // How do you specify the message?
  receive: async (
    /*
     * Patch bad OpenAPI spec
     * body: paths['/v1/instances/{instanceId}/message']['post']['requestBody']['content']['application/json']
     */
    body: {
      number: string;
      message: string;
    }
  ) => {
    const response = await api.POST('/v1/instances/{instanceId}/message', {
      params: {
        path: {
          instanceId,
        },
      },

      // Patch bad OpenAPI spec
      body: body as never,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },
});
