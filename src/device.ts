import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createDeviceEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({
  delete: async () => {
    const response = await api.DELETE('/v1/instances/{instanceId}', {
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

  get: async () => {
    const response = await api.GET('/v1/instances/{instanceId}', {
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

  update: async (
    body: paths['/v1/instances/{instanceId}']['patch']['requestBody']['content']['application/json']
  ) => {
    const response = await api.PATCH('/v1/instances/{instanceId}', {
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

  start: async () => {
    const response = await api.POST('/v1/instances/{instanceId}/start', {
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

  stop: async () => {
    // There's also /v1/instances/{instanceId}/agent/v1/system/shutdown - not sure what the difference is
    const response = await api.POST('/v1/instances/{instanceId}/stop', {
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

  reboot: async () => {
    const response = await api.POST('/v1/instances/{instanceId}/reboot', {
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

  pause: async () => {
    const response = await api.POST('/v1/instances/{instanceId}/pause', {
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

  resume: async () => {
    const response = await api.POST('/v1/instances/{instanceId}/unpause', {
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

  lock: async () => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/agent/v1/system/lock',
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

  unlock: async () => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/agent/v1/system/unlock',
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

  websocket: {
    get: async () => {
      const response = await api.GET('/v1/instances/{instanceId}/console', {
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
  },

  status: async () => {
    // We also have access to setState but we have other endpoints for that
    const response = await api.GET('/v2/instances/{instanceId}/state', {
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

  gpio: {
    list: async () => {
      const response = await api.GET('/v1/instances/{instanceId}/gpios', {
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

    set: async (
      body: paths['/v1/instances/{instanceId}/gpios']['put']['requestBody']['content']['application/json']
    ) => {
      const response = await api.PUT('/v1/instances/{instanceId}/gpios', {
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
  },

  sensors: {
    list: async () => {
      const response = await api.GET('/v1/instances/{instanceId}/peripherals', {
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

    set: async (
      body: paths['/v1/instances/{instanceId}/peripherals']['put']['requestBody']['content']['application/json']
    ) => {
      const response = await api.PUT('/v1/instances/{instanceId}/peripherals', {
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
  },

  restoreBackup: async (
    body: paths['/v1/instances/{instanceId}/restoreBackup']['post']['requestBody']
  ) => {
    const response = await api.POST(
      '/v1/instances/{instanceId}/restoreBackup',
      {
        params: {
          path: {
            instanceId,
          },
        },
        // Patching bad OpenAPI spec
        body: body as unknown as Record<string, never>,
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  takeScreenshot: async (
    format: paths['/v1/instances/{instanceId}/screenshot.{format}']['get']['parameters']['path']['format'],
    /*
     * Patching bad OpenAPI spec
     * scale?: paths['/v1/instances/{instanceId}/screenshot.{format}']['get']['parameters']['query']
     */
    scale?: number
  ) => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/screenshot.{format}',
      {
        params: {
          path: {
            instanceId,
            format,
          },
          query: {
            scale,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  rotate: async (
    orientation:
      | 'landscape-inverted'
      | 'landscape'
      | 'portrait-inverted'
      | 'portrait'
  ) => {
    const orientationMap = {
      portrait: 1,
      'portrait-inverted': 2,
      landscape: 3,
      'landscape-inverted': 4,
    };

    const response = await api.POST('/v1/instances/{instanceId}/rotate', {
      params: {
        path: {
          instanceId,
        },
      },
      body: {
        orientation: orientationMap[
          orientation
        ] as paths['/v1/instances/{instanceId}/rotate']['post']['requestBody']['content']['application/json']['orientation'],
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  input: async (
    body: paths['/v1/instances/{instanceId}/input']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/instances/{instanceId}/input', {
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

  upgrade: async (
    body: paths['/v1/instances/{instanceId}/upgrade']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/instances/{instanceId}/upgrade', {
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

  ready: async () => {
    const response = await api.GET(
      '/v1/instances/{instanceId}/agent/v1/app/ready',
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

  hostname: {
    set: async (
      body: paths['/v1/instances/{instanceId}/agent/v1/system/setHostname']['post']['requestBody']['content']['application/json']
    ) => {
      const response = await api.POST(
        '/v1/instances/{instanceId}/agent/v1/system/setHostname',
        {
          params: {
            path: {
              instanceId,
            },
          },
          body,
        }
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },
  },

  property: {
    get: async (
      body: paths['/v1/instances/{instanceId}/agent/v1/system/getprop']['post']['requestBody']['content']['application/json']
    ) => {
      const response = await api.POST(
        '/v1/instances/{instanceId}/agent/v1/system/getprop',
        {
          params: {
            path: {
              instanceId,
            },
          },
          body,
        }
      );

      if (response.error) {
        throw new Error(response.error.error);
      }

      return response.data;
    },
  },
});
