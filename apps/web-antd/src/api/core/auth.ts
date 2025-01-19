import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** Login interface parameters */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** Login interface return value */
  export interface LoginResult {
    accessToken: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * Log in
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/auth/login', data);
}

/**
 * Refresh accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * Log out
 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout', {
    withCredentials: true,
  });
}

/**
 * Get user permission code
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes');
}
