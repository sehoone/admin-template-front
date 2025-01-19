# Component library switching

`Vue Admin` allows you to freely choose the component library. The current default component library for the demo site is `Ant ​​Design Vue`, which is consistent with the old version. At the same time, the framework also has built-in `Element Plus` version and `Naive UI` version, you can choose according to your preferences.

## Add new component library application

If you want to use other component libraries, you only need to follow these steps:

1. Create a new folder within `apps`, for example `apps/web-xxx`.
2. Change the `name` field of `apps/web-xxx/package.json` to `web-xxx`.
3. Remove other component library dependencies and code, and replace the corresponding logic with your component library. There are not many changes that need to be made.
4. Adjust the language files in `locales`.
5. Adjust the components in `app.vue`.
6. Adapt the theme of the component library to fit with `Vben Admin`.
7. Adjust the application name in `.env`
8. Add the `dev:xxx` script to the Okura root directory
9. Execute `pnpm install` to install dependencies