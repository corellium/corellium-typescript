import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createMatrixEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  /**
   * List all hooks installed on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').kernelHook.list();
   */
  list: async () => {
    const response = await api.GET('/v1/instances/{instanceId}/hooks', {
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

  /**
   * Create a new hook on the device.
   * @param body The request body.
   * @param body.label The label of the hook e.g. `My hook`.
   * @param body.address The address of the hook e.g. `0xfffffff006ae8864`.
   * @param body.patch The patch of the hook e.g. `print("Hello, world\n")`.
   * @param body.patchType The patch type of the hook - `csmfcc` or `csmfvm`.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').kernelHook.create({ label: 'My hook', address: '0xfffffff006ae8864', patch: 'print("Hello, world\n")', patchType: 'csmfcc' });
   */
  create: async (
    body: paths['/v1/instances/{instanceId}/hooks']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/instances/{instanceId}/hooks', {
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
   * Get a hook from the device.
   * @param hookId The ID of the hook to get e.g. `123`.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').kernelHook.get('123');
   */
  get: async (
    hookId: paths['/v1/hooks/{hookId}']['get']['parameters']['path']['hookId']
  ) => {
    const response = await api.GET('/v1/hooks/{hookId}', {
      params: {
        path: {
          hookId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Update a hook on the device.
   * @param hookId The ID of the hook to update e.g. `123`.
   * @param body The request body.
   * @param body.label The label of the hook e.g. `My hook`.
   * @param body.address The address of the hook e.g. `0xfffffff006ae8864`.
   * @param body.patch The patch of the hook e.g. `print("Hello, world\n")`.
   * @param body.patchType The patch type of the hook - `csmfcc` or `csmfvm`.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').kernelHook.update('123', { label: 'My hook', address: '0xfffffff006ae8864', patch: 'print("Hello, world\n")', patchType: 'csmfcc' });
   */
  update: async (
    hookId: paths['/v1/hooks/{hookId}']['put']['parameters']['path']['hookId'],
    body: paths['/v1/hooks/{hookId}']['put']['requestBody']['content']['application/json']
  ) => {
    const response = await api.PUT('/v1/hooks/{hookId}', {
      params: {
        path: {
          hookId,
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
   * Delete a hook from the device.
   * @param hookId The ID of the hook to delete e.g. `123`.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').kernelHook.delete('123');
   */
  delete: async (
    hookId: paths['/v1/hooks/{hookId}']['delete']['parameters']['path']['hookId']
  ) => {
    const response = await api.DELETE('/v1/hooks/{hookId}', {
      params: {
        path: {
          hookId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Execute all hooks on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').kernelHook.run();
   */
  run: async () => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/hooks/execute',
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

  /**
   * Clear all hooks on the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').kernelHook.clear();
   */
  clear: async () => {
    const response = await api.POST('/v1/instances/{instanceId}/hooks/clear', {
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
