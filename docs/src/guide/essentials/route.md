---
outline: deep
---

# Routing and menu

In the project, the framework provides a basic routing system and automatically generates the corresponding menu structure based on the routing file.

## Route type

Routing is divided into core routing, static routing and dynamic routing. Core routing is the routing built into the framework, including root routing, login routing, 404 routing, etc.; static routing is the routing that has been determined when the project is started; dynamic routing is generally After the user logs in, routes are dynamically generated based on the user's permissions.

Both static routing and dynamic routing will use permission control. You can control permissions by configuring the `authority` field in the `meta` attribute of the route. You can refer to [Routing Permission Control](https://github.com/vbenjs/vue-vben -admin/blob/main/playground/src/router/routes/modules/demos.ts).

### Core routing

Core routing is the routing built into the framework, including root routing, login routing, 404 routing, etc. The core routing configuration is in the `src/router/routes/core` directory under the application.

::: tip

Core routing is mainly used for the basic functions of the framework. Therefore, it is not recommended to place business-related routing in core routing. It is recommended to place business-related routing in static routing or dynamic routing.

:::

### Static routing

The configuration of static routing is in the `src/router/routes/index` directory under the application. Open the commented file content:

::: tip

Permission control is controlled through the `authority` field in the `meta` attribute of the route. If your page project does not require permission control, you do not need to set the `authority` field.

:::

```ts
// If necessary, you can open comments and create folders yourself
// const externalRouteFiles = import.meta.glob('./external/**/*.ts', { eager: true }); // [!code --]
const staticRouteFiles = import.meta.glob('./static/**/*.ts', { eager: true }); // [!code ++]
/** Dynamic routing */
const dynamicRoutes: RouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);

/** External route list. Layout is not required to access these pages. It may be used to embed in other systems */
// const externalRoutes: RouteRecordRaw[] = mergeRouteModules(externalRouteFiles) // [!code --]
const externalRoutes: RouteRecordRaw[] = []; // [!code --]
const externalRoutes: RouteRecordRaw[] = mergeRouteModules(externalRouteFiles); // [!code ++]
```

### Dynamic routing

The configuration of dynamic routing is in the `src/router/routes/modules` directory of the corresponding application. All routing files are stored in this directory. The content format of each file is as follows, which is consistent with the routing configuration format of Vue Router. The following is the configuration of secondary routing and multi-level routing.

## Route definition

The configuration methods of static routing and dynamic routing are the same. The following is the configuration of secondary routing and multi-level routing:

### Secondary routing

::: details Secondary routing sample code

```ts
import type { RouteRecordRaw } from 'vue-router';

import { VBEN_LOGO_URL } from '@vben/constants';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      badgeType: 'dot',
      badgeVariants: 'destructive',
      icon: VBEN_LOGO_URL,
      order: 9999,
      title: $t('page.vben.title'),
    },
    name: 'VbenProject',
    path: '/vben-admin',
    redirect: '/vben-admin/about',
    children: [
      {
        name: 'VbenAbout',
        path: '/vben-admin/about',
        component: () => import('#/views/_core/about/index.vue'),
        meta: {
          badgeType: 'dot',
          badgeVariants: 'destructive',
          icon: 'lucide:copyright',
          title: $t('page.vben.about'),
        },
      },
    ],
  },
];

export default routes;
```

:::

### Multi-level routing

::: tip

- If there are no special circumstances, the `redirect` attribute of the parent route does not need to be specified and will point to the first child route by default.

:::

::: details Multi-level routing sample code

```ts
import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('demos.title'),
    },
    name: 'Demos',
    path: '/demos',
    redirect: '/demos/access',
    children: [
      // Nested menu
      {
        meta: {
          icon: 'ic:round-menu',
          title: $t('demos.nested.title'),
        },
        name: 'NestedDemos',
        path: '/demos/nested',
        redirect: '/demos/nested/menu1',
        children: [
          {
            name: 'Menu1Demo',
            path: '/demos/nested/menu1',
            component: () => import('#/views/demos/nested/menu-1.vue'),
            meta: {
              icon: 'ic:round-menu',
              keepAlive: true,
              title: $t('demos.nested.menu1'),
            },
          },
          {
            name: 'Menu2Demo',
            path: '/demos/nested/menu2',
            meta: {
              icon: 'ic:round-menu',
              keepAlive: true,
              title: $t('demos.nested.menu2'),
            },
            redirect: '/demos/nested/menu2/menu2-1',
            children: [
              {
                name: 'Menu21Demo',
                path: '/demos/nested/menu2/menu2-1',
                component: () => import('#/views/demos/nested/menu-2-1.vue'),
                meta: {
                  icon: 'ic:round-menu',
                  keepAlive: true,
                  title: $t('demos.nested.menu2_1'),
                },
              },
            ],
          },
          {
            name: 'Menu3Demo',
            path: '/demos/nested/menu3',
            meta: {
              icon: 'ic:round-menu',
              title: $t('demos.nested.menu3'),
            },
            redirect: '/demos/nested/menu3/menu3-1',
            children: [
              {
                name: 'Menu31Demo',
                path: 'menu3-1',
                component: () => import('#/views/demos/nested/menu-3-1.vue'),
                meta: {
                  icon: 'ic:round-menu',
                  keepAlive: true,
                  title: $t('demos.nested.menu3_1'),
                },
              },
              {
                name: 'Menu32Demo',
                path: 'menu3-2',
                meta: {
                  icon: 'ic:round-menu',
                  title: $t('demos.nested.menu3_2'),
                },
                redirect: '/demos/nested/menu3/menu3-2/menu3-2-1',
                children: [
                  {
                    name: 'Menu321Demo',
                    path: '/demos/nested/menu3/menu3-2/menu3-2-1',
                    component: () =>
                      import('#/views/demos/nested/menu-3-2-1.vue'),
                    meta: {
                      icon: 'ic:round-menu',
                      keepAlive: true,
                      title: $t('demos.nested.menu3_2_1'),
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
```

:::

## Add new page

To add a new page, you only need to add a route and corresponding page components.

### Add route

Add a routing object in the corresponding routing file, as follows:

```ts
import type { RouteRecordRaw } from 'vue-router';

import { VBEN_LOGO_URL } from '@vben/constants';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'mdi:home',
      title: $t('page.home.title'),
    },
    name: 'Home',
    path: '/home',
    redirect: '/home/index',
    children: [
      {
        name: 'HomeIndex',
        path: '/home/index',
        component: () => import('#/views/home/index.vue'),
        meta: {
          icon: 'mdi:home',
          title: $t('page.home.index'),
        },
      },
    ],
  },
];

export default routes;
```

### Add page components

Under `#/views/home/`, add an `index.vue` file as follows:

```vue
<template>
  <div>
    <h1>home page</h1>
  </div>
</template>
```

### verify

The page has been added here. Just visit `http://localhost:5555/home/index` and the corresponding page will appear.

## Routing configuration

Routing configuration items are mainly in the `meta` attribute of object routing. The following are commonly used configuration items:

```ts {5-8}
const routes = [
  {
    name: 'HomeIndex',
    path: '/home/index',
    meta: {
      icon: 'mdi:home',
      title: $t('page.home.index'),
    },
  },
];
```

::: details Routing Meta configuration type definition

```ts
interface RouteMeta {
  /**
   * Activate icon (menu)
   */
  activeIcon?: string;
  /**
   * The currently activated menu, sometimes you don’t want to activate the existing menu and need to activate the parent menu.
   */
  activePath?: string;
  /**
   * Whether to pin the tab page
   * @default false
   */
  affixTab?: boolean;
  /**
   * Fixed tab order
   * @default 0
   */
  affixTabOrder?: number;
  /**
   * Requires specific role identification to access
   * @default []
   */
  authority?: string[];
  /**
   * Logo
   */
  badge?: string;
  /**
   * Logo type
   */
  badgeType?: 'dot' | 'normal';
  /**
   *Logo color
   */
  badgeVariants?:
    | 'default'
    | 'destructive'
    | 'primary'
    | 'success'
    | 'warning'
    | string;
  /**
   * The children of the current route are not displayed in the menu
   * @default false
   */
  hideChildrenInMenu?: boolean;
  /**
   * The current route is not displayed in breadcrumbs
   * @default false
   */
  hideInBreadcrumb?: boolean;
  /**
   * The current route is not displayed in the menu
   * @default false
   */
  hideInMenu?: boolean;
  /**
   * The current route is not displayed on the tab page
   * @default false
   */
  hideInTab?: boolean;
  /**
   * Icon (menu/tab)
   */
  icon?: string;
  /**
   * iframe address
   */
  iframeSrc?: string;
  /**
   * Ignore permissions and can access directly
   * @default false
   */
  ignoreAccess?: boolean;
  /**
   * Turn on KeepAlive cache
   */
  keepAlive?: boolean;
  /**
   * External link-jump path
   */
  link?: string;
  /**
   * Whether the route has been loaded
   */
  loaded?: boolean;
  /**
   * Maximum number of open tabs
   * @default false
   */
  maxNumOfOpenTab?: number;
  /**
   * The menu can be seen, but access will be redirected to 403
   */
  menuVisibleWithForbidden?: boolean;
  /**
   * The current route does not use the basic layout (only takes effect at the top level)
   */
  noBasicLayout?: boolean;
  /**
   *Opens in new window
   */
  openInNewWindow?: boolean;
  /**
   * Used for routing->menu sorting
   */
  order?: number;
  /**
   * Parameters carried by the menu
   */
  query?: Recordable;
  /**
   * title name
   */
  title: string;
}
```

:::

### title

- Type: `string`
-Default value:`''`

The title used to configure the page, which will be displayed in menus and tabs. Generally used in conjunction with internationalization.

### icon

- Type: `string`
-Default value:`''`

The icon used to configure the page will be displayed in menus and tabs. It is generally used in conjunction with the icon library. If it is an `http` link, the image will be automatically loaded.

### activeIcon

- Type: `string`
-Default value:`''`

The activation icon used to configure the page, which will be displayed in the menu. Generally, it will be used with the icon library. If it is an `http` link, the image will be automatically loaded.

### keepAlive

- Type: `boolean`
- Default value: `false`

Used to configure whether to enable caching on the page. When enabled, the page will be cached and will not be reloaded. It is only valid when the tab is enabled.

### hideInMenu

- Type: `boolean`
- Default value: `false`

Used to configure whether the page is hidden in the menu. After hiding, the page will not be displayed in the menu.

### hideInTab

- Type: `boolean`
- Default value: `false`

Used to configure whether the page is hidden in the tab page. After hiding, the page will not be displayed in the tab page.

### hideInBreadcrumb

- Type: `boolean`
- Default value: `false`

Used to configure whether the page is hidden in breadcrumbs. After hiding, the page will not be displayed in breadcrumbs.

### hideChildrenInMenu

- Type: `boolean`
- Default value: `false`

Used to configure whether the subpages of the page are hidden in the menu. After hiding, the subpages will not be displayed in the menu.

### authority

- Type: `string[]`
- Default value: `[]`

Used to configure the permissions of the page. Only users with corresponding permissions can access the page. If not configured, no permissions are required.

### badge

- Type: `string`
-Default value:`''`

The logo used to configure the page will be displayed in the menu.

### badgeType

- Type: `'dot' | 'normal'`
-Default value: `'normal'`

Used to configure the logo type of the page, `dot` is the little red dot, `normal` is the text.

### badgeVariants

- Type: `'default' | 'destructive' | 'primary' | 'success' | 'warning' | string`
-Default value: `'success'`

Used to configure the logo color of the page.

### activePath

- Type: `string`
-Default value:`''`

Used to configure the currently activated menu. Sometimes the page is not displayed in the menu and is used when the parent menu needs to be activated.

###affixTab

- Type: `boolean`
- Default value: `false`

Used to configure whether the page should pin the tab page. After the page is pinned, the page cannot be closed.

### affixTabOrder

- Type: `number`
- Default value: `0`

Used to configure the sorting of fixed tab pages in ascending order.

### iframeSrc

- Type: `string`
-Default value:`''`

Used to configure the `iframe` address of the embedded page. After setting, the corresponding page will be embedded in the current page.

### ignoreAccess

- Type: `boolean`
- Default value: `false`

Used to configure whether the page ignores permissions and can be accessed directly.

### link

- Type: `string`
-Default value:`''`

Used to configure external link jump paths, which will open in a new window.

### maxNumOfOpenTab

- Type: `number`
- Default value: `-1`

Used to configure the maximum number of open tabs. After setting, the earliest opened tab will be automatically closed when a new tab is opened (only effective when a tab with the same name is opened).

### menuVisibleWithForbidden

- Type: `boolean`
- Default value: `false`

The page for configuration can be seen in the menu, but access will be redirected to 403.

### openInNewWindow

- Type: `boolean`
- Default value: `false`

When set to `true`, the page will be opened in a new window.

### order

- Type: `number`
- Default value: `0`

Used to configure the sorting of pages and used to route to menu sorting.

_Note:_ Sorting is only valid for first-level menus. The sorting of second-level menus needs to be set in code order in the corresponding first-level menus.

### query

- Type: `Recordable`
- Default value: `{}`

Menu parameters used to configure the page will be passed to the page in the menu.

### noBasicLayout

- Type: `boolean`
- Default value: `false`

Used to configure the current route not to use the basic layout and only takes effect at the top level. By default, all routes will be wrapped in the basic layout (including top and side navigation components). If your page does not need these components, you can set `noBasicLayout` to `true`.

## Route refresh

The route refresh method is as follows:

```vue
<script setup lang="ts">
import { useRefresh } from '@vben/hooks';

const { refresh } = useRefresh();

// Refresh the current route
refresh();
</script>
```