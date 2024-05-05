import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createPortForwardingEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  // How do you specify the port number?
  create: async (instanceId: string) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/exposeport/enable',
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

  // How do you specify the port number?
  delete: async (instanceId: string) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/exposeport/disable',
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
});
