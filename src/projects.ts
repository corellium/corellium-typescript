import type createFetchClient from 'openapi-fetch';
import type { components, paths } from '../types/corellium';

export const createProjectsEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  /**
   * Create a new project.
   * @param body The project settings.
   * @param body.name The project name.
   * @param body.settings The project settings.
   * @param body.settings.internetAccess Whether the project has internet access.
   * @param body.settings.connection The project connection.
   * @param body.settings.dhcp Whether the project uses DHCP.
   * @param body.quotas The project quotas.
   * @param body.quotas.cores The project core quota.
   * @param body.quotas.instances The project instance quota.
   * @param body.quotas.ram The project RAM quota.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.project.create({ name: 'My Project' });
   */
  create: async (
    body: Omit<
      paths['/v1/projects']['post']['requestBody']['content']['application/json'],
      'settings'
    > & {
      settings: Omit<
        components['schemas']['ProjectSettings'],
        'internet-access'
      > & {
        internetAccess: boolean;
      };
    }
  ) => {
    const response = await api.POST('/v1/projects', {
      body: {
        ...body,
        settings: {
          ...body.settings,
          'internet-access': body.settings.internetAccess,
        },
      },
    });

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * List all projects.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.project.list();
   */
  list: async () => {
    const response = await api.GET('/v1/projects');

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Search for a project by name.
   * @param name The project name.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.project.search('My Project');
   */
  search: async (name: string) => {
    const projects = await createProjectsEndpoints(api).list();

    return projects.find((project) => project.name === name);
  },
});
