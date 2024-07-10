import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/corellium';

export const createAuthEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>
) => ({
  /**
   * Change the password of the user.
   * @param body The request body.
   * @param body.userId The user ID.
   * @param body.oldPassword The old password.
   * @param body.newPassword The new password.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.auth.changePassword({ userId, oldPassword, newPassword });
   */
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
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Reset the password of the user.
   * @param body The request body.
   * @param body.token The reset password token.
   * @param body.totpToken The TOTP token.
   * @param body.newPassword The new password.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.auth.resetPassword({ token, totpToken, newPassword });
   */
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
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Send a reset password email to the user.
   * @param body The request body.
   * @param body.email The email address of the user.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.auth.sendResetPasswordEmail({ email });
   */
  sendResetPasswordEmail: async (
    body: paths['/v1/users/send-reset-link']['post']['requestBody']['content']['application/json']
  ) => {
    const response = await api.POST('/v1/users/send-reset-link', {
      body,
    });

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },

  /**
   * Agree to the terms of service.
   * @returns The response data.
   * @throws {Error} The error message.
   * @example const response = await corellium.auth.consent();
   */
  consent: async () => {
    const response = await api.POST('/v1/users/agree', {});

    if (response.error) {
      throw new Error(response.error.error ?? response.response.statusText);
    }

    return response.data;
  },
});
