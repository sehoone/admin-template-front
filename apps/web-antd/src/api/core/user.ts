import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * Get user information
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user/info');
}
