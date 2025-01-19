import type { Router } from 'vue-router';

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { startProgress, stopProgress } from '@vben/utils';

import { accessRoutes, coreRouteNames } from '#/router/routes';
import { useAuthStore } from '#/store';

import { generateAccess } from './access';

/**
 * General guard configuration
 * @param router
 */
function setupCommonGuard(router: Router) {
  // Record loaded pages
  const loadedPaths = new Set<string>();

  router.beforeEach(async (to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    // Page loading progress bar
    if (!to.meta.loaded && preferences.transition.progress) {
      startProgress();
    }
    return true;
  });

  router.afterEach((to) => {
    // Record whether the page is loaded. If it has been loaded, subsequent page switching animations and other effects will not be repeated.

    loadedPaths.add(to.path);

    // Close the page loading progress bar
    if (preferences.transition.progress) {
      stopProgress();
    }
  });
}

/**
 * Permission to access guard configuration
 * @param router
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const accessStore = useAccessStore();
    const userStore = useUserStore();
    const authStore = useAuthStore();

    // Basic routes, these routes do not require access permission interception
    if (coreRouteNames.includes(to.name as string)) {
      if (to.path === LOGIN_PATH && accessStore.accessToken) {
        return decodeURIComponent(
          (to.query?.redirect as string) ||
            userStore.userInfo?.homePath ||
            DEFAULT_HOME_PATH,
        );
      }
      return true;
    }

    // accessToken check
    if (!accessStore.accessToken) {
      // Explicitly declare that permission access rights are ignored, then access is allowed
      if (to.meta.ignoreAccess) {
        return true;
      }

      // No access rights, jump to the login page
      if (to.fullPath !== LOGIN_PATH) {
        return {
          path: LOGIN_PATH,
          // If not needed, delete query directly
          query:
            to.fullPath === DEFAULT_HOME_PATH
              ? {}
              : { redirect: encodeURIComponent(to.fullPath) },
          // Carry the current page to jump to, and jump to the page again after logging in.
          replace: true,
        };
      }
      return to;
    }

    // Whether dynamic routing has been generated
    if (accessStore.isAccessChecked) {
      return true;
    }

    // Generate routing table
    // List of role IDs owned by the currently logged in user
    const userInfo = userStore.userInfo || (await authStore.fetchUserInfo());
    const userRoles = userInfo.roles ?? [];

    // Generate menus and routes
    const { accessibleMenus, accessibleRoutes } = await generateAccess({
      roles: userRoles,
      router,
      // It will be displayed in the menu, but access will be redirected to 403
      routes: accessRoutes,
    });

    // Save menu information and routing information
    accessStore.setAccessMenus(accessibleMenus);
    accessStore.setAccessRoutes(accessibleRoutes);
    accessStore.setIsAccessChecked(true);
    const redirectPath = (from.query.redirect ??
      (to.path === DEFAULT_HOME_PATH
        ? userInfo.homePath || DEFAULT_HOME_PATH
        : to.fullPath)) as string;

    return {
      ...router.resolve(decodeURIComponent(redirectPath)),
      replace: true,
    };
  });
}

/**
 * Project guard configuration
 * @param router
 */
function createRouterGuard(router: Router) {
  /** General */
  setupCommonGuard(router);
  /** Permission access */
  setupAccessGuard(router);
}

export { createRouterGuard };
