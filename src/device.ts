import WebSocket from 'ws';
import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createDeviceEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string,
  baseUrl: string
) => ({
  /**
   * Delete a device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').delete();
   */
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

  /**
   * Get a device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').get();
   */
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

  /**
   * Update a device.
   * @param body The request body.
   * @param body.name The name of the device.
   * @param body.state The state of the device e.g. `on`, `off`, `paused`, `deleting`.
   * @param body.os The OS version of the device e.g. `14.0.0`.
   * @param body.bootOptions The boot options of the device.
   * @param body.bootOptions.bootArgs Boot arguments to provide to the kernel
   * @param body.bootOptions.restoreBootArgs Boot arguments to provide to the kernel when restoring
   * @param body.bootOptions.udid UDID of the device
   * @param body.bootOptions.ecid Assigned ECID
   * @param body.bootOptions.randomSeed Random seed to provide to boot if any
   * @param body.bootOptions.pac Enable PAC
   * @param body.bootOptions.aprr Enable APRR
   * @param body.bootOptions.additionalTags Additional tags to provide to boot
   * @param body.proxy The proxy settings for the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').update({ name: 'My Device' });
   */
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

  /**
   * Start the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').start();
   */
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

  /**
   * Stop the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').stop();
   */
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

  /**
   * Reboot the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').reboot();
   */
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

  /**
   * Pause the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').pause();
   */
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

  /**
   * Resume the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').resume();
   */
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

  /**
   * Lock the device (iOS only)
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').lock();
   */
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

  /**
   * Unlock the device (iOS only)
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').unlock();
   */
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
    /**
     * Get the websocket URL for the device.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').websocket.get();
     */
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

  state: {
    /**
     * Get the status of the device.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').state.get();
     */
    get: async () => {
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
  },

  gpio: {
    /**
     * Get the GPIO list of the device.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').gpio.list();
     */
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

    /**
     * Set the GPIO list of the device.
     * @param body The request body.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').gpio.set({ button: { bitCount: 2 }});
     */
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
    /**
     * Get the sensor list of the device.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').sensors.list();
     */
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

    /**
     * Set the sensor list of the device.
     * @param body The request body.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').sensors.set({ acceleration: acceleration: [0, 9.81, 0] });
     */
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

  /**
   * Restore a backup to the device (iOS only)
   * @param body The request body.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').restoreBackup(body);
   */
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

  /**
   * Take a screenshot of the device.
   * @param format The format of the screenshot.
   * @param scale The scale of the screenshot.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').takeScreenshot(format, scale);
   */
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

  /**
   * Rotate the device.
   * @param orientation The orientation to rotate the device to.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').rotate('landscape');
   */
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

  /**
   * Send input to the device.
   * @param body The request body.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').input([{ buttons: ['finger'], position: [[300, 600]], wait: 0 }]);
   */
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

  /**
   * Upgrade the OS of the device (iOS only)
   * @param body The request body.
   * @param body.os The OS to upgrade to.
   * @param body.osbuild The OS build to upgrade to.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').upgrade({ os: '14.3', osbuild: '18C66' });
   */
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

  /**
   * Determine whether the device is ready.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').ready();
   */
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
    /**
     * Set the hostname of the device.
     * @param body The request body.
     * @param body.hostname The hostname to set.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').hostname.set({ hostname: 'my-hostname' });
     */
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
    /**
     * Get a system property of the device.
     * @param body The request body.
     * @param body.property The property to get.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').property.get({ property: 'corellium.opengapps' });
     */
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

  /**
   * Send a command to the device.
   * @param type Passed in the `type` field of the agent command
   * @param op Passed in the `op` field of the agent command
   * @param params Any other parameters to include in the command
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.device('123').send('app', 'list');'
   */
  send: async (type: string, op: string, params?: Record<string, unknown>) => {
    const device = await createDeviceEndpoints(api, instanceId, baseUrl).get();

    if (!device.agent?.info) {
      throw new Error('No agent info returned');
    }

    const websocketUrl = new URL(`/api/v1/agent/${device.agent.info}`, baseUrl);

    websocketUrl.protocol = 'wss:';

    const id = Math.floor(Math.random() * 1000);
    const props = { type, op, id, ...params };

    // eslint-disable-next-line promise/avoid-new
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(websocketUrl.toString());

      ws.on('close', (code) => {
        if (code !== 1000) {
          reject(new Error(`WebSocket closed with code ${code}`));
          return;
        }

        resolve(null);
      });

      ws.on('error', () => {
        reject(new Error('Error connecting to WebSocket'));
      });

      ws.on('open', () => {
        ws.send(JSON.stringify(props));
      });

      ws.on('message', (message) => {
        if (!Buffer.isBuffer(message)) {
          reject(new Error('Invalid message data, expecting buffer.'));
          return;
        }

        const data = message.toString();

        const content = JSON.parse(data) as Record<string, unknown> & {
          id?: number;
          error?: {
            message: string;
          };
        };

        if (!content.id) {
          reject(new Error('Invalid message data, expecting id.'));
          return;
        }

        if (content.error) {
          reject(new Error(content.error.message));
          return;
        }

        if (id === content.id) {
          resolve(content);
          ws.close();
        }
      });
    });
  },
});
