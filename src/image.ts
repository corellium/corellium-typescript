import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createImageEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  /**
   * List all images.
   * @param projectId The project ID to filter images by.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.image.list();
   */
  list: async (projectId?: string) => {
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

  /**
   * Create a new image.
   * @param body The request body.
   * @param body.type The type of the image e.g. `binary`.
   * @param body.encoding The encoding of the image e.g. `plain`.
   * @param body.encapsulated Whether the uploaded file is encapsulated inside a zip file e.g. `true`.
   * @param body.name The name of the image.
   * @param body.project The project ID.
   * @param body.instance The instance ID.
   * @param body.file The image file.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.image.create({ type: 'binary', encoding: 'plain', encapsulated: true, name: 'My Image', project: 'projectId', instance: 'instanceId', file: File });
   */
  create: async (
    body: Omit<
      paths['/v1/images']['post']['requestBody']['content']['multipart/form-data'],
      'file'
    > & {
      file: File;
    }
  ) => {
    let response;

    if (body.file) {
      const form = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        form.append(key, value as never);
      })

      response = await api.POST('/v1/images', {body: form as never});
    } else {
      response = await api.POST('/v1/images', {
        body: body as never,
      });
    }

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Get an image.
   * @param imageId The image ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.image.get('123');
   */
  get: async (
    imageId: paths['/v1/images/{imageId}']['get']['parameters']['path']['imageId']
  ) => {
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

  /**
   * Update an image.
   * @param imageId The image ID.
   * @param body The request body.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.image.update('123', File);
   */
  update: async (
    imageId: paths['/v1/images/{imageId}']['post']['parameters']['path']['imageId'],
    body: paths['/v1/images/{imageId}']['post']['requestBody']['content']['binary']
  ) => {
    const response = await api.POST('/v1/images/{imageId}', {
      params: {
        path: {
          imageId,
        },
      },

      // @ts-expect-error - Need to figure this out
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Delete an image.
   * @param imageId The image ID.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.image.delete('123');
   */
  delete: async (
    imageId: paths['/v2/images/{imageId}']['delete']['parameters']['path']['imageId']
  ) => {
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
