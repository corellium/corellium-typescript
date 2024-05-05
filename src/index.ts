/* eslint-disable new-cap, @typescript-eslint/member-ordering */

import createFetchClient from 'openapi-fetch';
import { createDeviceEndpoints } from './device';
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
import type { paths } from '../types/corellium';

type CorelliumOptions = {
  accessToken: paths['/v1/auth/login']['post']['requestBody']['content']['application/json']['properties']['accessToken'];
  endpoint?: string;
};

class Corellium {
  private accessToken: string;
  private endpoint = 'https://app.corellium.com/';
  private api: ReturnType<typeof createFetchClient<paths>> | null = null;

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

  public auth = this.api ? createAuthEndpoints(this.api) : null;
  public authProvider = this.api ? createAuthProviderEndpoints(this.api) : null;
  public app = this.api ? createAppEndpoints(this.api) : null;
  public connect = this.api ? createConnectEndpoints(this.api) : null;
  public customNetwork = this.api
    ? createCustomNetworkEndpoints(this.api)
    : null;
  public console = this.api ? createConsoleEndpoints(this.api) : null;
  public coretrace = this.api ? createCoreTraceEndpoints(this.api) : null;
  public device = this.api ? createDeviceEndpoints(this.api) : null;
  public file = this.api ? createFileEndpoints(this.api) : null;
  public hypertrace = this.api ? createHyperTraceEndpoints(this.api) : null;
  public kernelHook = this.api ? createKernelHookEndpoints(this.api) : null;
  public image = this.api ? createImageEndpoints(this.api) : null;
  public media = this.api ? createMediaEndpoints(this.api) : null;
  public messaging = this.api ? createMessagingEndpoints(this.api) : null;
  public model = this.api ? createModelEndpoints(this.api) : null;
  public networkMonitor = this.api
    ? createNetworkMonitorEndpoints(this.api)
    : null;
  public panic = this.api ? createPanicEndpoints(this.api) : null;
  public portForwarding = this.api
    ? createPortForwardingEndpoints(this.api)
    : null;
  public profile = this.api ? createProfileEndpoints(this.api) : null;
  public project = this.api ? createProjectEndpoints(this.api) : null;
  public role = this.api ? createRoleEndpoints(this.api) : null;
  public snapshot = this.api ? createSnapshotEndpoints(this.api) : null;
  public team = this.api ? createTeamEndpoints(this.api) : null;
  public user = this.api ? createUserEndpoints(this.api) : null;
}

export default Corellium;
