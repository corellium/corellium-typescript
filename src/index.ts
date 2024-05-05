/* eslint-disable new-cap, @typescript-eslint/member-ordering */

import createFetchClient from 'openapi-fetch';
import { createDeviceEndpoints } from './device';
import { createCoreTraceEndpoints } from './coretrace';
import { createHyperTraceEndpoints } from './hypertrace';
import { createKernelHookEndpoints } from './kernel-hook';
import { createImageEndpoints } from './image';
import { createProjectEndpoints } from './project';
import { createSnapshotEndpoints } from './snapshot';
import type { paths } from '../types/corellium';

type CorelliumOptions = {
  accessToken: string;
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

  public coretrace = this.api ? createCoreTraceEndpoints(this.api) : null;
  public device = this.api ? createDeviceEndpoints(this.api) : null;
  public hypertrace = this.api ? createHyperTraceEndpoints(this.api) : null;
  public kernelHook = this.api ? createKernelHookEndpoints(this.api) : null;
  public image = this.api ? createImageEndpoints(this.api) : null;
  public project = this.api ? createProjectEndpoints(this.api) : null;
  public snapshot = this.api ? createSnapshotEndpoints(this.api) : null;
}

export default Corellium;
