# Server interaction and data mock

::: tip description

This document introduces how to use Mock data and interact with the server in a development environment. The technologies involved are:

- [Nitro](https://nitro.unjs.io/) A lightweight backend server that can be deployed anywhere, and the project is used as a Mock server.
- [axios](https://axios-http.com/docs/intro) is used to send HTTP requests to interact with the server.

:::

## Development environment interaction

If the front-end application and the back-end interface server do not run on the same host, you need to proxy interface requests to the interface server in the development environment. If it is the same host, you can directly request the specific interface address.

### Local development cross-domain configuration

::: tip tip

The local development cross-domain configuration project has been configured. If you have other needs, you can add or adjust the configuration by yourself.

:::

#### Configure the local development interface address

Configure the interface address in the `.env.development` file in the project root directory, here it is configured as `/api`:

```bash
VITE_GLOB_API_URL=/api
```

#### Configure development server agent

When developing the environment, if you need to handle cross-domain processing, the interface address is configured in the `vite.config.mts` file in the corresponding application directory:

```ts{8-16}
// apps/web-antd/vite.config.mts
import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    vite: {
      server: {
        proxy: {// [!code focus:11]
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock proxy target address
            target: 'http://localhost:5320/api',
            ws: true,
          },
        },
      },
    },
  };
});
```

#### Interface request

According to the above configuration, we can use `/api` as the prefix for interface requests in the front-end project, for example:

```ts
import axios from 'axios';

axios.get('/api/user').then((res) => {
  console.log(res);
});
```

At this point, the request will be proxied to `http://localhost:5320/api/user`.

::: warning note

From the Network view of the browser console, the request is `http://localhost:5555/api/user`. This is because the proxy configuration does not change the URL of the local request.

:::

### No cross-domain configuration

If there is no cross-domain problem, you can directly ignore the [Configure Development Server Agent](./server.md#Configure Development Server Agent) configuration and directly set the interface address to `VITE_GLOB_API_URL`

Configure the interface address in the `.env.development` file in the project root directory:

```bash
VITE_GLOB_API_URL=https://mock-napi.vben.pro/api
```

## Production environment interaction

### Interface address configuration

Configure the interface address in the `.env.production` file in the project root directory:

```bash
VITE_GLOB_API_URL=https://mock-napi.vben.pro/api
```

::: tip How to dynamically modify the interface address in packaging

Variables beginning with `VITE_GLOB_*` in the `.env` file will be injected into the `_app.config.js` file during packaging. Just refresh the page after modifying the corresponding interface address in `dist/_app.config.js`. There is no need to package multiple times according to different environments. One package can be used for deployment in multiple different interface environments.

:::

### Cross-domain processing

If cross-domain problems occur in the production environment, you can use the `nginx` proxy interface address or enable `cors` in the background for processing (refer to the mock service).

## Interface request configuration

The project comes with basic request configuration based on the `axios` package by default, and the core is provided by the `@vben/request` package. The project does not have too many packages, but simply encapsulates some commonly used configurations. If you have other needs, you can add or adjust the configurations yourself. For different apps, different component libraries and `store` may be used, so in the `src/api/request.ts` folder in the application directory, there is a corresponding request configuration file, such as `web-antd` The `src/api/request.ts` file under the project can be configured according to your own needs.

### Request example

#### GET request

```ts
import { requestClient } from '#/api/request';

export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user/info');
}
```

#### POST/PUT request

```ts
import { requestClient } from '#/api/request';

export async function saveUserApi(user: UserInfo) {
  return requestClient.post<UserInfo>('/user', user);
}

export async function saveUserApi(user: UserInfo) {
  return requestClient.put<UserInfo>('/user', user);
}

export async function saveUserApi(user: UserInfo) {
  const url = user.id ? `/user/${user.id}` : '/user/';
  return requestClient.request<UserInfo>(url, {
    data: user,
    // or PUT
    method: user.id ? 'PUT' : 'POST',
  });
}
```

#### DELETE request

```ts
import { requestClient } from '#/api/request';

export async function deleteUserApi(user: UserInfo) {
  return requestClient.delete<boolean>(`/user/${user.id}`, user);
}
```

### Request configuration

`src/api/request.ts` in the application can be configured according to the needs of your own application:

```ts
/**
 * This file can be adjusted according to business logic
 */
import type { HttpResponse } from '@vben/request';

import { useAppConfig } from '@vben/hooks';
import { preferences } from '@vben/preferences';
import {
  authenticateResponseInterceptor,
  errorMessageResponseInterceptor,
  RequestClient,
} from '@vben/request';
import { useAccessStore } from '@vben/stores';

import { message } from 'ant-design-vue';

import { useAuthStore } from '#/store';

import { refreshTokenApi } from './core';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

function createRequestClient(baseURL: string) {
  const client = new RequestClient({
    baseURL,
  });

  /**
   * Re-authentication logic
   */
  async function doReAuthenticate() {
    console.warn('Access token or refresh token is invalid or expired. ');
    const accessStore = useAccessStore();
    const authStore = useAuthStore();
    accessStore.setAccessToken(null);
    if (
      preferences.app.loginExpiredMode === 'modal' &&
      accessStore.isAccessChecked
    ) {
      accessStore.setLoginExpired(true);
    } else {
      await authStore.logout();
    }
  }

  /**
   * Refresh token logic
   */
  async function doRefreshToken() {
    const accessStore = useAccessStore();
    const resp = await refreshTokenApi();
    const newToken = resp.data;
    accessStore.setAccessToken(newToken);
    return newToken;
  }

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null;
  }

  // Request header processing
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore();

      config.headers.Authorization = formatToken(accessStore.accessToken);
      config.headers['Accept-Language'] = preferences.app.locale;
      return config;
    },
  });

  //response data deconstruction
  client.addResponseInterceptor<HttpResponse>({
    fulfilled: (response) => {
      const { data: responseData, status } = response;

      const { code, data } = responseData;

      if (status >= 200 && status < 400 && code === 0) {
        return data;
      }
      throw Object.assign({}, response, { response });
    },
  });

  //Token expiration processing
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken,
      enableRefreshToken: preferences.app.enableRefreshToken,
      formatToken,
    }),
  );

  //General error handling, if you do not enter the above error handling logic, you will enter here
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      // This can be customized according to the business. You can get the information in the error for customized processing and make different prompts according to different codes instead of directly using message.error to prompt msg.
      //The error field returned by the current mock interface is error or message
      const responseData = error?.response?.data ?? {};
      const errorMessage = responseData?.error ?? responseData?.message ?? '';
      // If there is no error message, a prompt will be given based on the status code.
      message.error(errorMessage || msg);
    }),
  );

  return client;
}

export const requestClient = createRequestClient(apiURL);

export const baseRequestClient = new RequestClient({ baseURL: apiURL });
```

### Multiple interface addresses

Just create multiple `requestClient`, such as:

```ts
const { apiURL, otherApiURL } = useAppConfig(
  import.meta.env,
  import.meta.env.PROD,
);

export const requestClient = createRequestClient(apiURL);

export const otherRequestClient = createRequestClient(otherApiURL);
```

## Refresh Token

The logic for refreshing Token is provided by default in the project. You only need to follow the following configuration to enable it:

- Make sure the configuration to refresh Token is currently enabled

Adjust `preferences.ts` in the corresponding application directory and ensure `enableRefreshToken='true'`.

```ts
import { defineOverridesPreferences } from '@vben/preferences';

export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    enableRefreshToken: true,
  },
});
```

Just configure the `doRefreshToken` method in `src/api/request.ts`:

```ts
//Adjust here to your token format
function formatToken(token: null | string) {
  return token ? `Bearer ${token}` : null;
}

/**
 * Refresh token logic
 */
async function doRefreshToken() {
  const accessStore = useAccessStore();
  //Adjust here to your refresh token interface
  const resp = await refreshTokenApi();
  const newToken = resp.data;
  accessStore.setAccessToken(newToken);
  return newToken;
}
```

## Data Mock

::: tip Production environment Mock

The new version no longer supports production environment mocks, please use real interfaces.

:::

Mock data is an essential part of the front-end development process and a key link that separates front-end and front-end development. By simulating request data and even logic through the interface agreed with the server in advance, front-end development can be made independent and will not be blocked by the development process of the server.

The project uses [Nitro](https://nitro.unjs.io/) for local mock data processing. The principle is to start an additional backend service locally, which is a real backend service that can process requests and return data.

### Nitro use

The Mock service code is located in the `apps/backend-mock` directory. There is no need to start it manually. It has been integrated into the project. You only need to run `pnpm dev` in the project root directory. After successful operation, the console will print `http: //localhost:5320/api`, visit this address to view the mock service.

[Nitro](https://nitro.unjs.io/) has simple syntax and can be configured and developed according to your own needs. For specific configuration, please view [Nitro Documentation](https://nitro.unjs.io/).

## Close the Mock service

The essence of mock is a real back-end service. If you do not need the mock service, you can configure `VITE_NITRO_MOCK=false` in the `.env.development` file in the project root directory to turn off the mock service.

```bash
# .env.development
VITE_NITRO_MOCK=false
```