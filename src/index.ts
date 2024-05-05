/* eslint-disable new-cap, @typescript-eslint/member-ordering */

import createFetchClient from 'openapi-fetch';
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

  public device = {
    create: async (
      body: paths['/v1/instances']['post']['requestBody']['content']['application/json']
    ): Promise<unknown> =>
      this.api?.POST('/v1/instances', {
        body,
      }),

    delete: async (instanceId: string): Promise<unknown> =>
      this.api?.DELETE(`/v1/instances/{instanceId}`, {
        params: {
          path: {
            instanceId,
          },
        },
      }),

    get: async (instanceId: string): Promise<unknown> =>
      this.api?.GET(`/v1/instances/{instanceId}`, {
        params: {
          path: {
            instanceId,
          },
        },
      }),

    list: async (): Promise<unknown> => this.api?.GET('/v1/instances'),

    search: async (name: string): Promise<unknown> =>
      this.api?.GET('/v1/instances', {
        params: {
          query: {
            name,
          },
        },
      }),
  };
}

export default Corellium;
