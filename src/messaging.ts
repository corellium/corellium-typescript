import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createMessagingEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  /**
   * Send an SMS message to a device (iOS only)
   * @param body - The message to send
   * @param body.number - The phone number to send the message to
   * @param body.message - The message to send
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.messaging.receive({ number: '+1234567890', message: 'Hello, World!' });
   */
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
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },
});
