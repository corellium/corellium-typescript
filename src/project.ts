import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createProjectEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  get: async (projectId: string) => {
    const response = await api.GET('/v1/projects/{projectId}', {
      params: {
        path: {
          projectId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  create: async (
    body: paths['/v1/projects']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/projects', {
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  delete: async (projectId: string) => {
    const response = await api.DELETE('/v1/projects/{projectId}', {
      params: {
        path: {
          projectId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  list: async () => {
    const response = await api.GET('/v1/projects');

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  update: async (
    projectId: string,
    body: paths['/v1/projects/{projectId}']['patch']['requestBody']['content']['application/json']
  ) => {
    // Better version of PATCH /v1/projects/{projectId}/settings
    const response = await api.PATCH('/v1/projects/{projectId}', {
      params: {
        path: {
          projectId,
        },
      },
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  instances: async (projectId: string) => {
    const response = await api.GET('/v1/projects/{projectId}/instances', {
      params: {
        path: {
          projectId,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  keys: {
    list: async (projectId: string) => {
      const response = await api.GET('/v1/projects/{projectId}/keys', {
        params: {
          path: {
            projectId,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },

    add: async (
      projectId: string,
      body: paths['/v1/projects/{projectId}/keys']['post']['requestBody']['content']['application/json']
    ) => {
      const response = await api.POST('/v1/projects/{projectId}/keys', {
        params: {
          path: {
            projectId,
          },
        },
        body,
      });

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },

    delete: async (projectId: string, keyId: string) => {
      const response = await api.DELETE(
        '/v1/projects/{projectId}/keys/{keyId}',
        {
          params: {
            path: {
              projectId,
              keyId,
            },
          },
        }
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },
  },
});
