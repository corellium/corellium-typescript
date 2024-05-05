import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createConnectEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  getQuickConnectUrl: async (instanceId: string) => {
    const response = await api.GET(
      '/v2/instances/{instanceId}/quickConnectCommand',
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
