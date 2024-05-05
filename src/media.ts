import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createMediaEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  /**
   * Play media on the device.
   * @param body The request body.
   * @param body.url The URL of the media to play.
   * @param body.imageId The image ID of the media to play.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').media.play({ url: 'https://example.com/video.mp4' });
   */
  start: async (
    body: paths['/v1/instances/{instanceId}/media/play']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/instances/{instanceId}/media/play', {
      params: {
        path: {
          instanceId,
        },
      },
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Stop media on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').media.stop();
   */
  stop: async () => {
    const response = await api.POST('/v1/instances/{instanceId}/media/stop', {
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
