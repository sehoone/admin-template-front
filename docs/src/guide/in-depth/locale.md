#internationalization

The project has integrated [Vue i18n](https://kazupon.github.io/vue-i18n/), and has configured Chinese and English language packages.

## IDE plug-in

If you use the vscode development tool, it is recommended to install the [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) plug-in. It can help you manage international copywriting more conveniently. After installing the plug-in, you can see the corresponding language content in your code in real time:

![](/public/guide/locale.png)

## Configure default language

You only need to override the default preference settings. In the corresponding application, find the `src/preferences.ts` file and modify the value of `locale`:

```ts {3}
export const overridesPreferences = defineOverridesPreferences({
  app: {
    locale: 'en-US',
  },
});
```

## Dynamically switch language

Switching languages ​​consists of two parts:

- Update preferences
- Load the corresponding language pack

```ts
import type { SupportedLanguagesType } from '@vben/locales';
import { loadLocaleMessages } from '@vben/locales';
import { updatePreferences } from '@vben/preferences';

async function updateLocale(value: string) {
  // 1. Update preferences
  const locale = value as SupportedLanguagesType;
  updatePreferences({
    app: {
      locale,
    },
  });
  // 2. Load the corresponding language pack
  await loadLocaleMessages(locale);
}

updateLocale('en-US');
```

## Add translated text

::: warning note

- Please do not put business translation text in `@vben/locales`, so that business and general translation text can be better managed.
- When there are multiple language packs, when adding translation text, you need to add corresponding text in all language packs.

:::

To add translation text, you only need to find `src/locales/langs/` in the corresponding application and add the corresponding text, for example:

**src/locales/langs/zh-CN/\*.json**

````ts
```json
{
  "about": {
    "desc": "Vben Admin is a modern management template."
  }
}
````

**src/locales/langs/en-US.ts**

````ts
```json
{
  "about": {
    "desc": "Vben Admin is a modern management template."
  }
}
````

## Use translated text

Through `@vben/locales`, you can easily use translated text:

### used in code

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@vben/locales';

const items = computed(() => [{ title: $t('about.desc') }]);
</script>
<template>
  <div>{{ $t('about.desc') }}</div>
  <template v-for="item in items.value">
    <div>{{ item.title }}</div>
  </template>
</template>
```

## Add new language pack

If you need to add a new language pack, you need to follow the following steps:

- Add the corresponding language pack file in the `packages/locales/langs` directory, for example: `zh-TW.json`, and translate the corresponding text.
- In the corresponding application, find the `src/locales/langs` file and add the corresponding language package `zh-TW.json`
- In `packages/constants/src/core.ts`, add the corresponding language:

  ```ts
  export interface LanguageOption {
    label: string;
    value: 'en-US' | 'zh-CN'; // [!code --]
    value: 'en-US' | 'zh-CN' | 'zh-TW'; // [!code ++]
  }
  export const SUPPORT_LANGUAGES: LanguageOption[] = [
    {
      label: 'Simplified Chinese',
      value: 'zh-CN',
    },
    {
      label: 'English',
      value: 'en-US',
    },
    {
      label: 'Traditional Chinese', // [!code ++]
      value: 'zh-TW', // [!code ++]
    },
  ];
  ```

- In `packages/locales/typing.ts`, add Typescript type:

  ```ts
  export type SupportedLanguagesType = 'en-US' | 'zh-CN'; // [!code --]
  export type SupportedLanguagesType = 'en-US' | 'zh-CN' | 'zh-TW'; // [!code ++]
  ```

At this point, you can use the new language pack in the project.

## Interface switching language function

If you want to turn off the language switching display button on the interface, find the `src/preferences.ts` file in the corresponding application and modify the value of `locale`:

```ts {3}
export const overridesPreferences = defineOverridesPreferences({
  widget: {
    languageToggle: false,
  },
});
```

## Remotely load language pack

::: tip tip

When making an interface request through the `request` tool that comes with the project, the default request header will include [Accept-Language](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept -Language), the server can perform dynamic data internationalization processing based on the request header.

:::

Each application has an independent language package, which can cover the common language configuration. You can obtain the corresponding language package through remote loading. You only need to find `src/locales/index.ts in the corresponding application. ` file, modify the `loadMessages` method:

```ts {3-4}
async function loadMessages(lang: SupportedLanguagesType) {
  const [appLocaleMessages] = await Promise.all([
    // Just modify it here to load data through the remote interface.
    localesMap[lang](),
    loadThirdPartyMessage(lang),
  ]);
  return appLocaleMessages.default;
}
```

## Third-party language pack

The internationalization methods of third-party component libraries or plug-ins used in different applications may be inconsistent, so they need to be handled differently. If you need to introduce a third-party language pack, you can find the `src/locales/index.ts` file in the corresponding application and modify the `loadThirdPartyMessage` method:

```ts
/**
 * Load the language pack of dayjs
 * @param lang
 */
async function loadDayjsLocale(lang: SupportedLanguagesType) {
  let locale;
  switch (lang) {
    case 'zh-CN': {
      locale = await import('dayjs/locale/zh-cn');
      break;
    }
    case 'en-US': {
      locale = await import('dayjs/locale/en');
      break;
    }
    // Use English by default
    default: {
      locale = await import('dayjs/locale/en');
    }
  }
  if (locale) {
    dayjs.locale(locale);
  } else {
    console.error(`Failed to load dayjs locale for ${lang}`);
  }
}
```

## Remove internationalization

First of all, it is not recommended to remove internationalization, because internationalization is a good development habit, but if you really need to remove internationalization, you can directly use Chinese copywriting and keep the language pack that comes with the project. The overall development experience will not be affected. The steps to remove internationalization are as follows:

- Hide the language switching button on the interface, see: [Interface switching language function] (#Interface switching language function)
- To modify the default language, see: [Configure default language](#Configure default language)
- To turn off the warning prompt of `vue-i18n`, in the `src/locales/index.ts` file, modify `missingWarn` to `false`:

  ```ts
  async function setupI18n(app: App, options: LocaleSetupOptions = {}) {
    await coreSetup(app, {
      defaultLocale: preferences.app.locale,
      loadMessages,
      missingWarn: !import.meta.env.PROD, // [!code --]
      missingWarn: false, // [!code ++]
      ...options,
    });
  }
  ```