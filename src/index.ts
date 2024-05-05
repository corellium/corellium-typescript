import createFetchClient from 'openapi-fetch';
import { createCoreTraceEndpoints } from './coretrace';
import { createHyperTraceEndpoints } from './hypertrace';
import { createKernelHookEndpoints } from './kernel-hook';
import { createImageEndpoints } from './image';
import { createProjectEndpoints } from './project';
import { createSnapshotEndpoints } from './snapshot';
import { createTeamEndpoints } from './team';
import { createUserEndpoints } from './user';
import { createAuthEndpoints } from './auth';
import { createAppEndpoints } from './app';
import { createFileEndpoints } from './file';
import { createProfileEndpoints } from './profile';
import { createAuthProviderEndpoints } from './auth-provider';
import { createNetworkMonitorEndpoints } from './network-monitor';
import { createRoleEndpoints } from './role';
import { createCustomNetworkEndpoints } from './custom-network';
import { createModelEndpoints } from './model';
import { createConsoleEndpoints } from './console';
import { createPanicEndpoints } from './panic';
import { createMediaEndpoints } from './media';
import { createPortForwardingEndpoints } from './port-forwarding';
import { createMessagingEndpoints } from './messaging';
import { createConnectEndpoints } from './connect';
import { createDeviceEndpoints } from './device';
import { createDevicesEndpoints } from './devices';
import type { paths } from '../types/corellium';

type CorelliumOptions = {
  endpoint?: string;
};

class Corellium {
  // Declare endpoint properties here
  public auth!: ReturnType<typeof createAuthEndpoints>;
  public authProvider!: ReturnType<typeof createAuthProviderEndpoints>;
  public customNetwork!: ReturnType<typeof createCustomNetworkEndpoints>;
  public device!: (
    deviceId: string
  ) => ReturnType<typeof createDeviceEndpoints>;
  public devices!: ReturnType<typeof createDevicesEndpoints>;
  public image!: ReturnType<typeof createImageEndpoints>;
  public model!: ReturnType<typeof createModelEndpoints>;
  public project!: ReturnType<typeof createProjectEndpoints>;
  public role!: ReturnType<typeof createRoleEndpoints>;
  public snapshot!: ReturnType<typeof createSnapshotEndpoints>;
  public team!: ReturnType<typeof createTeamEndpoints>;
  public user!: ReturnType<typeof createUserEndpoints>;

  public constructor(apiToken: string, options?: CorelliumOptions) {
    const api = createFetchClient<paths>({
      baseUrl: options?.endpoint
        ? new URL('/api', options.endpoint).toString()
        : 'https://app.corellium.com/api',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
    });

    this.auth = createAuthEndpoints(api);
    this.authProvider = createAuthProviderEndpoints(api);
    this.customNetwork = createCustomNetworkEndpoints(api);
    this.devices = createDevicesEndpoints(api);
    this.image = createImageEndpoints(api);
    this.model = createModelEndpoints(api);
    this.project = createProjectEndpoints(api);
    this.role = createRoleEndpoints(api);
    this.snapshot = createSnapshotEndpoints(api);
    this.team = createTeamEndpoints(api);
    this.user = createUserEndpoints(api);

    this.device = (deviceId: string) => ({
      ...createDeviceEndpoints(api, deviceId),
      app: createAppEndpoints(api, deviceId),
      connect: createConnectEndpoints(api, deviceId),
      console: createConsoleEndpoints(api, deviceId),
      coreTrace: createCoreTraceEndpoints(api, deviceId),
      file: createFileEndpoints(api, deviceId),
      hyperTrace: createHyperTraceEndpoints(api, deviceId),
      kernelHook: createKernelHookEndpoints(api, deviceId),
      media: createMediaEndpoints(api, deviceId),
      messaging: createMessagingEndpoints(api, deviceId),
      networkMonitor: createNetworkMonitorEndpoints(api, deviceId),
      panic: createPanicEndpoints(api, deviceId),
      portForwarding: createPortForwardingEndpoints(api, deviceId),
      profile: createProfileEndpoints(api, deviceId),
      snapshot: createSnapshotEndpoints(api, deviceId),
    });
  }
}

export { Corellium };
