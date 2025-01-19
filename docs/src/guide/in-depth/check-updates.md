# Check for updates

## introduce

You may want to check for updates when there are updates to the website. The framework provides this function. By regularly checking for updates, you can configure the `checkUpdatesInterval` and `enableCheckUpdates` fields in the application's preferences.ts file to enable and set the time interval (unit: minutes) for checking for updates.

```ts
import { defineOverridesPreferences } from '@vben/preferences';

export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    // Whether to enable checking for updates
    enableCheckUpdates: true,
    //The time interval for checking updates, in minutes
    checkUpdatesInterval: 1,
  },
});
```

## Effect

When an update is detected, a prompt box will pop up asking the user whether to refresh the page:

![check-updates](/guide/update-notice.png)

## Replace with other check update methods

If you need to check for updates in other ways, such as more flexibly controlling update logic through interfaces (such as forcing refresh, displaying updated content, etc.), you can modify `src/widgets/check-updates/ below `@vben/layouts` check-updates.vue` file to achieve.

```ts
//This can be replaced with your check update logic
async function getVersionTag() {
  try {
    const response = await fetch('/', {
      cache: 'no-cache',
      method: 'HEAD',
    });

    return (
      response.headers.get('etag') || response.headers.get('last-modified')
    );
  } catch {
    console.error('Failed to fetch version tag');
    return null;
  }
}
```