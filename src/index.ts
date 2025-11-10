import createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';
import { createAppEndpoints } from './app';
import { createAuthEndpoints } from './auth';
import { createAuthProviderEndpoints } from './auth-provider';
import { createConnectEndpoints } from './connect';
import { createConsoleEndpoints } from './console';
import { createCoreTraceEndpoints } from './coretrace';
import { createCustomNetworkEndpoints } from './custom-network';
import { createDeviceEndpoints } from './device';
import { createDevicesEndpoints } from './devices';
import { createFileEndpoints } from './file';
import { createHyperTraceEndpoints } from './hypertrace';
import { createImageEndpoints } from './image';
import { createKernelHookEndpoints } from './kernel-hook';
import { generateToken } from './lib/token';
import { createMatrixEndpoints } from './matrix';
import { createMediaEndpoints } from './media';
import { createMessagingEndpoints } from './messaging';
import { createModelEndpoints } from './model';
import { createNetworkMonitorEndpoints } from './network-monitor';
import { createPanicEndpoints } from './panic';
import { createPortForwardingEndpoints } from './port-forwarding';
import { createProfileEndpoints } from './profile';
import { createProjectEndpoints } from './project';
import { createProjectsEndpoints } from './projects';
import { createRoleEndpoints } from './role';
import { createSnapshotEndpoints } from './snapshot';
import { createTeamEndpoints } from './team';
import { createTokenEndpoints } from './token';
import { createUserEndpoints } from './user';
import { createWebplayerEndpoints } from './webplayer';

type CorelliumOptions = {
  endpoint?: string;
};

type AuthenticationMethod =
  | string
  | {
      username: string;
      password: string;
    };

class Corellium {
  public auth!: ReturnType<typeof createAuthEndpoints>;
  public authProvider!: ReturnType<typeof createAuthProviderEndpoints>;
  public customNetwork!: ReturnType<typeof createCustomNetworkEndpoints>;
  public device!: (deviceId: string) => ReturnType<
    typeof createDeviceEndpoints
  > & {
    app: ReturnType<typeof createAppEndpoints>;
    connect: ReturnType<typeof createConnectEndpoints>;
    console: ReturnType<typeof createConsoleEndpoints>;
    coreTrace: ReturnType<typeof createCoreTraceEndpoints>;
    file: ReturnType<typeof createFileEndpoints>;
    hyperTrace: ReturnType<typeof createHyperTraceEndpoints>;
    kernelHook: ReturnType<typeof createKernelHookEndpoints>;
    matrix: ReturnType<typeof createMatrixEndpoints>;
    media: ReturnType<typeof createMediaEndpoints>;
    messaging: ReturnType<typeof createMessagingEndpoints>;
    networkMonitor: ReturnType<typeof createNetworkMonitorEndpoints>;
    panic: ReturnType<typeof createPanicEndpoints>;
    portForwarding: ReturnType<typeof createPortForwardingEndpoints>;
    profile: ReturnType<typeof createProfileEndpoints>;
    snapshot: ReturnType<typeof createSnapshotEndpoints>;
  };
  public devices!: ReturnType<typeof createDevicesEndpoints>;
  public image!: ReturnType<typeof createImageEndpoints>;
  public model!: ReturnType<typeof createModelEndpoints>;
  public projects!: ReturnType<typeof createProjectsEndpoints>;
  public project!: (
    projectId: string
  ) => ReturnType<typeof createProjectEndpoints>;
  public role!: ReturnType<typeof createRoleEndpoints>;
  public snapshot!: ReturnType<typeof createSnapshotEndpoints>;
  public team!: ReturnType<typeof createTeamEndpoints>;
  public token!: ReturnType<typeof createTokenEndpoints>;
  public user!: ReturnType<typeof createUserEndpoints>;
  public webplayer!: ReturnType<typeof createWebplayerEndpoints>;

  /**
   * Create a new Corellium TypeScript SDK instance.
   * @param apiToken The Corellium API token e.g. `1234567890abcdef`.
   * @param options The Corellium SDK options.
   * @param options.endpoint The Corellium API endpoint e.g. `https://acme.enterprise.corellium.com`.
   * @returns The Corellium TypeScript SDK instance.
   * @example const corellium = new Corellium('1234567890abcdef');
   */
  public constructor(
    authentication: AuthenticationMethod,
    options?: CorelliumOptions
  ) {
    const baseUrl = options?.endpoint
      ? new URL('/api', options.endpoint).toString()
      : 'https://app.corellium.com/api';
    const Authorization =
      typeof authentication === 'string' ? `Bearer ${authentication}` : '';

    const patchedFetch = async (request: Request) => {
      if (typeof authentication === 'string') {
        return fetch(request);
      }

      // User has provided a username / password.
      const { token } = await generateToken(baseUrl, authentication);
      request.headers.set('Authorization', `Bearer ${token}`);

      return fetch(request);
    };

    const api = createFetchClient<paths>({
      baseUrl,
      headers: {
        Authorization,
      },
      fetch: patchedFetch,
    });

    this.auth = createAuthEndpoints(api);
    this.authProvider = createAuthProviderEndpoints(api);
    this.customNetwork = createCustomNetworkEndpoints(api);
    this.image = createImageEndpoints(api);
    this.devices = createDevicesEndpoints(api, this.image);
    this.projects = createProjectsEndpoints(api);
    this.model = createModelEndpoints(api);
    this.role = createRoleEndpoints(api);
    this.snapshot = createSnapshotEndpoints(api);
    this.team = createTeamEndpoints(api);
    this.token = createTokenEndpoints(baseUrl, Authorization);
    this.user = createUserEndpoints(api);
    this.webplayer = createWebplayerEndpoints(api, baseUrl, Authorization);

    /**
     * Create a device pointer.
     * @param deviceId The device ID.
     * @returns The device endpoints.
     * @example const device = corellium.device('123');
     * @example const apps = await corellium.device('123').app.list();
     */
    this.device = (deviceId: string) => ({
      ...createDeviceEndpoints(api, deviceId, baseUrl),
      app: createAppEndpoints(api, deviceId),
      connect: createConnectEndpoints(api, deviceId, baseUrl),
      console: createConsoleEndpoints(api, deviceId),
      coreTrace: createCoreTraceEndpoints(api, deviceId),
      file: createFileEndpoints(api, deviceId),
      hyperTrace: createHyperTraceEndpoints(api, deviceId),
      kernelHook: createKernelHookEndpoints(api, deviceId),
      matrix: createMatrixEndpoints(api, deviceId, baseUrl),
      media: createMediaEndpoints(api, deviceId),
      messaging: createMessagingEndpoints(api, deviceId),
      networkMonitor: createNetworkMonitorEndpoints(api, deviceId),
      panic: createPanicEndpoints(api, deviceId),
      portForwarding: createPortForwardingEndpoints(api, deviceId),
      profile: createProfileEndpoints(api, deviceId),
      snapshot: createSnapshotEndpoints(api, deviceId),
    });

    /**
     * Create a project pointer.
     * @param projectId The project ID.
     * @returns The project endpoints.
     * @example const project = corellium.project('123');
     * @example const devices = await corellium.project('123').devices.list();
     */
    this.project = (projectId: string) =>
      createProjectEndpoints(api, projectId);
  }
}

export * as errors from './errors';
export { Corellium };
