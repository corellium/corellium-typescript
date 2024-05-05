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
  accessToken: string;
  endpoint?: string;
};

class Corellium {
  private accessToken: string;
  private endpoint = 'https://app.corellium.com/';
  private api: ReturnType<typeof createFetchClient<paths>> = {} as never;

  public constructor(options: CorelliumOptions) {
    this.accessToken = options.accessToken;

    if (options.endpoint) {
      this.endpoint = options.endpoint;
    }

    this.api = createFetchClient<paths>({
      baseUrl: this.endpoint,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  public auth = createAuthEndpoints(this.api);
  public authProvider = createAuthProviderEndpoints(this.api);
  public customNetwork = createCustomNetworkEndpoints(this.api);
  public devices = createDevicesEndpoints(this.api);
  public image = createImageEndpoints(this.api);
  public model = createModelEndpoints(this.api);
  public project = createProjectEndpoints(this.api);
  public role = createRoleEndpoints(this.api);
  public snapshot = createSnapshotEndpoints(this.api);
  public team = createTeamEndpoints(this.api);
  public user = createUserEndpoints(this.api);

  public device(deviceId: string) {
    return {
      ...createDeviceEndpoints(this.api, deviceId),
      app: createAppEndpoints(this.api, deviceId),
      connect: createConnectEndpoints(this.api, deviceId),
      console: createConsoleEndpoints(this.api, deviceId),
      coreTrace: createCoreTraceEndpoints(this.api, deviceId),
      file: createFileEndpoints(this.api, deviceId),
      hyperTrace: createHyperTraceEndpoints(this.api, deviceId),
      kernelHook: createKernelHookEndpoints(this.api, deviceId),
      media: createMediaEndpoints(this.api, deviceId),
      messaging: createMessagingEndpoints(this.api, deviceId),
      networkMonitor: createNetworkMonitorEndpoints(this.api, deviceId),
      panic: createPanicEndpoints(this.api, deviceId),
      portForwarding: createPortForwardingEndpoints(this.api, deviceId),
      profile: createProfileEndpoints(this.api, deviceId),
      snapshot: createSnapshotEndpoints(this.api, deviceId),
    };
  }
}

export { Corellium };
