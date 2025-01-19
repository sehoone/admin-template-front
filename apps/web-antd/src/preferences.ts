import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description project configuration file
 * Only part of the configuration in the project needs to be overwritten. Unnecessary configurations do not need to be overwritten. The default configuration will be automatically used.
 *!!! Please clear the cache after changing the configuration, otherwise it may not take effect
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: import.meta.env.VITE_APP_TITLE,
  },
});
