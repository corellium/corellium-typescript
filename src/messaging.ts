import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createMessagingEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  // How do you specify the message?
  receive: async () => {
    const response = await api.POST('/v1/instances/{instanceId}/message', {
      params: {
        path: {
          instanceId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },
});
