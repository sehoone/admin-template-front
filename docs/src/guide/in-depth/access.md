---
outline: deep
---

#Permissions

The framework has two built-in permission control methods:

- Determine whether menus or buttons are accessible by user role
- Determine whether menus or buttons are accessible through the interface

## Front-end access control

**Implementation Principle**: Fixed hard-coded route permissions on the front end, specifying what permissions the route has to view. Only common routes are initialized, and routes that require permission to access are not added to the routing table. After logging in or obtaining the user role in other ways, traverse the routing table through the role, obtain the routing table that the role can access, generate the routing table, and then add it to the routing instance through `router.addRoute` to implement permission filtering.

**Disadvantages**: Permissions are relatively unrestricted. If the role is changed in the background, the front desk also needs to be changed accordingly. Suitable for systems with fixed roles

### Steps

- Make sure the current mode is front-end access control mode

Adjust `preferences.ts` in the corresponding application directory to ensure `accessMode='frontend'`.

```ts
import { defineOverridesPreferences } from '@vben/preferences';

export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    //Default value, optional
    accessMode: 'frontend',
  },
});
```

- Configure routing permissions

**If not configured, it will be visible by default**

```ts {3}
 {
    meta: {
      authority: ['super'],
    },
},
```

- Ensure that the role returned by the interface matches the permissions of the routing table

You can view `src/store/auth` under the application and find the following code,

```ts
// To set the login user information, you need to ensure that userInfo.roles is an array and contains the permissions in the routing table.
// For example: userInfo.roles=['super', 'admin']
authStore.setUserInfo(userInfo);
```

At this point, the configuration has been completed. You need to ensure that after logging in, the role returned by the interface matches the permissions of the routing table, otherwise you will not be able to access it.

### Menu is visible but access is prohibited

Sometimes, we need the menu to be visible, but access is prohibited. This can be achieved in the following way. Set `menuVisibleWithForbidden` to `true`. At this time, the menu is visible, but access is prohibited, and the 403 page will be redirected.

```ts
{
    meta: {
      menuVisibleWithForbidden: true,
    },
},
```

## Backend access control

**Implementation principle**: The routing table is dynamically generated through the interface and returned following a certain data structure. The front end processes the data into a recognizable structure as needed, and then adds it to the routing instance through `router.addRoute` to achieve dynamic generation of permissions.

**Disadvantages**: The backend needs to provide data structures that comply with specifications, and the frontend needs to process the data structures, which is suitable for systems with more complex permissions.

### Steps

- Make sure the current mode is backend access control mode

Adjust `preferences.ts` in the corresponding application directory to ensure `accessMode='backend'`.

```ts
import { defineOverridesPreferences } from '@vben/preferences';

export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    accessMode: 'backend',
  },
});
```

- Ensure that the menu data structure returned by the interface is correct

You can view `src/router/access.ts` under the application and find the following code,

```ts {5}
async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  return await generateAccessible(preferences.app.accessMode, {
    fetchMenuListAsync: async () => {
      // This interface is the menu data returned by the backend
      return await getAllMenus();
    },
  });
}
```

- The interface returns menu data, please see the comments

:::Details interface returns menu data example

```ts
const dashboardMenus = [
  {
    // BasicLayout is fixed here and cannot be changed.
    component: 'BasicLayout',
    meta: {
      order: -1,
      title: 'page.dashboard.title',
    },
    name: 'Dashboard',
    path: '/',
    redirect: '/analytics',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        // Here is the path to the page, you need to remove views/ and .vue
        component: '/dashboard/analytics/index',
        meta: {
          affixTab: true,
          title: 'page.dashboard.analytics',
        },
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: '/dashboard/workspace/index',
        meta: {
          title: 'page.dashboard.workspace',
        },
      },
    ],
  },
];
```

:::

At this point, the configuration has been completed. You need to ensure that the menu returned by the interface is in the correct format after logging in, otherwise it will be inaccessible.

## Fine-grained control of buttons

In some cases, we need fine-grained control of buttons. We can use interfaces or roles to control the display of buttons.

### Permission code

The permission code is the permission code returned by the interface. The permission code is used to determine whether the button is displayed. The logic is under `src/store/auth`:

```ts
const [fetchUserInfoResult, accessCodes] = await Promise.all([
  fetchUserInfo(),
  getAccessCodes(),
]);

userInfo = fetchUserInfoResult;
authStore.setUserInfo(userInfo);
accessStore.setAccessCodes(accessCodes);
```

Find the interface corresponding to `getAccessCodes` and adjust it according to the business logic.

The data structure returned by the permission code is a string array, for example: `['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010']`

With the permission code, you can use the `AccessControl` component and API provided by `@vben/access` to display and hide the buttons.

#### Component method

```vue
<script lang="ts" setup>
import { AccessControl, useAccess } from '@vben/access';

const { accessMode, hasAccessByCodes } = useAccess();
</script>

<template>
  <!-- Type="code" needs to be specified -->
  <AccessControl :codes="['AC_100100']" type="code">
    <Button> Super account is visible ["AC_1000001"] </Button>
  </AccessControl>
  <AccessControl :codes="['AC_100030']" type="code">
    <Button> Admin account is visible ["AC_100010"] </Button>
  </AccessControl>
  <AccessControl :codes="['AC_1000001']" type="code">
    <Button> User account is visible ["AC_1000001"] </Button>
  </AccessControl>
  <AccessControl :codes="['AC_100100', 'AC_100010']" type="code">
    <Button> Super & Admin accounts are visible ["AC_100100","AC_1000001"] </Button>
  </AccessControl>
</template>
```

#### API method

```vue
<script lang="ts" setup>
import { AccessControl, useAccess } from '@vben/access';

const { hasAccessByCodes } = useAccess();
</script>

<template>
  <Button v-if="hasAccessByCodes(['AC_100100'])">
    Super account is visible ["AC_1000001"]
  </Button>
  <Button v-if="hasAccessByCodes(['AC_100030'])">
    Admin account is visible ["AC_100010"]
  </Button>
  <Button v-if="hasAccessByCodes(['AC_1000001'])">
    User account is visible ["AC_1000001"]
  </Button>
  <Button v-if="hasAccessByCodes(['AC_100100', 'AC_1000001'])">
    Super & Admin accounts are visible ["AC_100100","AC_1000001"]
  </Button>
</template>
```

#### Command mode

> The command supports binding single or multiple permission codes. A single permission code can be passed directly into a string or an array, and multiple permission codes can be passed into an array.

```vue
<template>
  <Button class="mr-4" v-access:code="'AC_100100'">
    Super account visible 'AC_100100'
  </Button>
  <Button class="mr-4" v-access:code="['AC_100030']">
    Admin account is visible ["AC_100010"]
  </Button>
  <Button class="mr-4" v-access:code="['AC_1000001']">
    User account is visible ["AC_1000001"]
  </Button>
  <Button class="mr-4" v-access:code="['AC_100100', 'AC_1000001']">
    Super & Admin accounts are visible ["AC_100100","AC_1000001"]
  </Button>
</template>
```

### Role

The role judgment method does not require the permission code returned by the interface, and directly determines whether the button is displayed through the role.

#### Component method

```vue
<script lang="ts" setup>
import { AccessControl } from '@vben/access';
</script>

<template>
  <AccessControl :codes="['super']">
    <Button> Super character is visible </Button>
  </AccessControl>
  <AccessControl :codes="['admin']">
    <Button> Admin role visible </Button>
  </AccessControl>
  <AccessControl :codes="['user']">
    <Button> User role is visible </Button>
  </AccessControl>
  <AccessControl :codes="['super', 'admin']">
    <Button> Super & Admin roles are visible </Button>
  </AccessControl>
</template>
```

#### API method

```vue
<script lang="ts" setup>
import { useAccess } from '@vben/access';

const { hasAccessByRoles } = useAccess();
</script>

<template>
  <Button v-if="hasAccessByRoles(['super'])"> Super account is visible </Button>
  <Button v-if="hasAccessByRoles(['admin'])"> Admin account is visible </Button>
  <Button v-if="hasAccessByRoles(['user'])"> User account is visible </Button>
  <Button v-if="hasAccessByRoles(['super', 'admin'])">
    Super & Admin accounts are visible
  </Button>
</template>
```

#### Command mode

> The command supports binding single or multiple permission codes. A single permission code can be passed directly into a string or an array, and multiple permission codes can be passed into an array.

```vue
<template>
  <Button class="mr-4" v-access:role="'super'"> Super role is visible </Button>
  <Button class="mr-4" v-access:role="['super']"> Super role is visible </Button>
  <Button class="mr-4" v-access:role="['admin']"> Admin role visible </Button>
  <Button class="mr-4" v-access:role="['user']"> User role is visible </Button>
  <Button class="mr-4" v-access:role="['super', 'admin']">
    Super & Admin roles are visible
  </Button>
</template>
```