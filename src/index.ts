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
import { createProjectsEndpoints } from './projects';
import { createWebplayerEndpoints } from './webplayer';
import { createTokenEndpoints } from './token';
import { createMatrixEndpoints } from './matrix';
import type { paths as corePaths } from '../types/corellium';
import type { paths as matrixPaths } from '../types/matrix';
import { generateToken } from './lib/token';

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

      return fetch(request, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    };

    const api = createFetchClient<corePaths>({
      baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
      fetch: patchedFetch,
    });

    const matrixApi = createFetchClient<matrixPaths>({
      baseUrl: new URL('/api/v1/services/matrix', baseUrl).toString(),
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
      fetch: patchedFetch,
    });

    this.auth = createAuthEndpoints(api);
    this.authProvider = createAuthProviderEndpoints(api);
    this.customNetwork = createCustomNetworkEndpoints(api);
    this.devices = createDevicesEndpoints(api);
    this.projects = createProjectsEndpoints(api);
    this.image = createImageEndpoints(api);
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
      matrix: createMatrixEndpoints(api, matrixApi, deviceId, baseUrl),
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

export { Corellium };
