# Commonly used functions

A collection of some commonly used functions.

## Login authentication expired

When the interface returns the `401` status code, the framework will consider that the login authentication has expired, and the login timeout will jump to the login page or open a login pop-up window. You can configure `preferences.ts` in the application directory:

### Jump to login page

Login timeout will jump to the login page

```ts
import { defineOverridesPreferences } from '@vben/preferences';

export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    loginExpiredMode: 'page',
  },
});
```

### Open the login pop-up window

Login timeout will open a login pop-up window

![](/guide/login-expired.png)

Configuration:

```ts
import { defineOverridesPreferences } from '@vben/preferences';

export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    loginExpiredMode: 'modal',
  },
});
```

## Dynamic title

-Default value: `true`

After it is enabled, the title of the web page changes with the `title` of the route. Just turn it on or off in `preferences.ts` in the application directory.

```ts
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    dynamicTitle: true,
  },
});
```

## Page watermark

- Default value: `false`

After turning it on, the watermark will be displayed on the web page. You can turn it on or off in `preferences.ts` in the application directory.

```ts
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    watermark: true,
  },
});
```

If you want to update the content of the watermark, you can do so. For parameters, please refer to [watermark-js-plus](https://zhensherlock.github.io/watermark-js-plus/):

```ts
import { useWatermark } from '@vben/hooks';

const { destroyWatermark, updateWatermark } = useWatermark();

await updateWatermark({
  //watermark content
  content: 'hello my watermark',
});
```