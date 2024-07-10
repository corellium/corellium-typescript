import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createDevicesEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  /**
   * Create a new device.
   * @param body The request body.
   * @param body.project The project ID.
   * @param body.name The name of the device.
   * @param body.flavor The flavor of the device e.g. `ranchu`, `iphone6`, `iphone6plus`, `ipodtouch6`, `ipadmini4wifi`, `iphone6s`, `iphone6splus`, `iphonese`, `iphone7`, `iphone7plus`, `iphone8`, `iphone8plus`, `iphonex`, `iphonexs`, `iphonexsmax`, `iphonexsmaxww`, `iphonexr`, `iphone11`, `iphone11pro`, `iphone11promax`, `iphonese2`, `iphone12m`, `iphone12`, `iphone12p`, `iphone12pm`, `iphone13`, `iphone13m`, `iphone13p`, `iphone13pm`.
   * @param body.os The OS version of the device e.g. `14.0.0`.
   * @param body.patches The patches to apply to the device e.g. `jailbroken` | `corelliumd` | `nonjailbroken`
   * @param body.bootOptions The boot options of the device.
   * @param body.bootOptions.kernelSlide The Kernel slide value for an iOS device. Defaults to zero. When set to an empty value, the slide will be randomized.
   * @param body.bootOptions.udid Predefined Unique Device ID (UDID) for iOS device
   * @param body.bootOptions.screen Change the screen metrics for Ranchu devices `XxY[:DPI]`, e.g. `720x1280:280`
   * @param body.bootOptions.additionalTags An array of addition features to utilize e.g. `["kalloc", "gpu", "no-keyboard", "nodevmode", "sep-cons-ext", "iboot-jailbreak", "llb-jailbreak", "rom-jailbreak"]`
   * @param body.bootOptions.kernel Custom kernel to pass to the device on creation
   * @param body.bootOptions.vmmio[] Paremeters to export a VM address space range (and IRQ & DMA functionality) over TCP to different models running on different machines or inside a different VM e.g. `{ start: 0x100000000, size: 0x1000000, irq: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], port: 1234 }`
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.devices.create({ project: 'projectId', name: 'My New Device', flavor: 'ranchu', os: '14.0.0' });
   */
  create: async ({
    patches,
    ...body
  }: Omit<
    paths['/v1/instances']['post']['requestBody']['content']['application/json'],
    'patches'
  > & {
    patches: 'corelliumd' | 'jailbroken' | 'nonjailbroken';
  }) => {
    const response = await api.POST('/v1/instances', {
      body: {
        ...body,
        patches: [patches],
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * List all devices.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.devices.list();
   */
  list: async () => {
    const response = await api.GET('/v1/instances');

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  /**
   * Search for a device by name.
   * @param name The name of the device.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.devices.search('My Device');
   */
  search: async (name: string) => {
    const response = await api.GET('/v1/instances', {
      params: {
        query: {
          name,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },
});
