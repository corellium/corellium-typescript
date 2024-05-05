import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createAuthEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  login: async (
    body: paths['/v1/auth/login']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/auth/login', {
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  changePassword: async (body: {
    userId: paths['/v1/users/change-password']['post']['requestBody']['content']['application/json']['user'];
    oldPassword: paths['/v1/users/change-password']['post']['requestBody']['content']['application/json']['old-password'];
    newPassword: paths['/v1/users/change-password']['post']['requestBody']['content']['application/json']['new-password'];
  }) => {
    const response = await api.POST('/v1/users/change-password', {
      body: {
        user: body.userId,
        'old-password': body.oldPassword,
        'new-password': body.newPassword,
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  resetPassword: async (body: {
    token: paths['/v1/users/reset-password']['post']['requestBody']['content']['application/json']['token'];
    totpToken: paths['/v1/users/reset-password']['post']['requestBody']['content']['application/json']['totpToken'];
    newPassword: paths['/v1/users/reset-password']['post']['requestBody']['content']['application/json']['new-password'];
  }) => {
    const response = await api.POST('/v1/users/reset-password', {
      body: {
        token: body.token,
        totpToken: body.totpToken,
        'new-password': body.newPassword,
      },
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  sendResetPasswordEmail: async (
    body: paths['/v1/users/send-reset-link']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/users/send-reset-link', {
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },

  consent: async () => {
    const response = await api.POST('/v1/users/agree', {});

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  },
});
