---
outline: deep
---

# Log in

This article introduces how to transform your own application login page and how to quickly connect to the login page interface.

## Login page adjustment

If you want to adjust the title, description, icon and toolbar of the login page, you can do so by configuring the parameters of the `AuthPageLayout` component.

![login](/guide/login.png)

Just configure the `props` parameters of `AuthPageLayout` in `src/layouts/auth.vue` under the application:

```vue {2-7}
<AuthPageLayout
  :copyright="true"
  :toolbar="true"
  :toolbarList="['color', 'language', 'layout', 'theme']"
  :app-name="appName"
  :logo="logo"
  :page-description="$t('authentication.pageDesc')"
  :page-title="$t('authentication.pageTitle')"
>
</AuthPageLayout>
```

## Login form adjustment

If you want to adjust the relevant content of the login form, you can configure the `AuthenticationLogin` component parameters in `src/views/_core/authentication/login.vue` under the application:

```vue
<AuthenticationLogin
  :loading="authStore.loginLoading"
  @submit="authStore.authLogin"
/>
```

::: details AuthenticationLogin component parameters

```ts
{
  /**
   * @zh_CN Verification code login path
   */
  codeLoginPath?: string;
  /**
   * @zh_CN Forgot password path
   */
  forgetPasswordPath?: string;

  /**
   * @zh_CN Whether it is in loading processing state
   */
  loading?: boolean;

  /**
   * @zh_CN QR code login path
   */
  qrCodeLoginPath?: string;

  /**
   * @zh_CN registration path
   */
  registerPath?: string;

  /**
   * @zh_CN Whether to display verification code to log in
   */
  showCodeLogin?: boolean;
  /**
   * @zh_CN Whether to display forgotten password
   */
  showForgetPassword?: boolean;

  /**
   * @zh_CN Whether to display QR code for login
   */
  showQrcodeLogin?: boolean;

  /**
   * @zh_CN Whether to display the registration button
   */
  showRegister?: boolean;

  /**
   * @zh_CN Whether to display remember account
   */
  showRememberMe?: boolean;

  /**
   * @zh_CN Whether to display third-party login
   */
  showThirdPartyLogin?: boolean;

  /**
   * @zh_CN Login box subtitle
   */
  subTitle?: string;

  /**
   * @zh_CN Login box title
   */
  title?: string;

}
```

:::

::: tip Note

If these configurations cannot meet your needs, you can implement the login form and related login logic by yourself or submit a `PR` to us.

:::

## Interface docking process

Here we will quickly introduce how to quickly connect your own backend.

### Preconditions

- First of all, the back-end service used by the document, the format returned by the interface is unified as follows:

```ts
interface HttpResponse<T = any> {
  /**
   * 0 means success, other means failure
   * 0 means success, others means fail
   */
  code: number;
  data: T;
  message: string;
}
```

If you do not conform to this format, you need to read the [Server Interaction](../essentials/server.md) document first and modify your `request.ts` configuration.

- Secondly, you need to change the local proxy address to your real backend address first. You can configure it in `vite.config.mts` under the application:

```ts
import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            //Change this to your real interface address
            target: 'http://localhost:5320/api',
            ws: true,
          },
        },
      },
    },
  };
});
```

### Login interface

In order to log in normally, your backend needs to provide at least `2-3` interfaces:

- Login interface

The interface address can be modified in `src/api/core/auth` under the application. The following is the default interface address:

```ts
/**
 * Log in
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/auth/login', data);
}

/** Just make sure that the return value of the login interface has the `accessToken` field */
export interface LoginResult {
  accessToken: string;
}
```

- Obtain user information interface

The interface address can be modified in `src/api/core/user` under the application. The following is the default interface address:

```ts
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user/info');
}

/** Just make sure that the return value of the login interface has the following fields. You can use more fields by yourself */
export interface UserInfo {
  roles: string[];
  realName: string;
}
```

- Obtain permission code (optional)

This interface is used to obtain the user's permission code. The permission code is used to control the user's permissions. The interface address can be modified in `src/api/core/auth` under the application. The following is the default interface address:

```ts
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes');
}
```

If you don't need this permission, you can simply change the code to return an empty array.

```ts {2}
export async function getAccessCodesApi() {
  // Return an empty array here
  return [];
}
```