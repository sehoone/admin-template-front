# icon

::: tip About icon management

- The icons of the project are mainly provided by the `@vben/icons` package. It is recommended to manage them within this package to facilitate unified management and maintenance.
- If you are using `Vscode`, it is recommended to install the [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) plug-in, which can easily find and use icons.

:::

There are several ways to use icons in the project, and you can choose to use them according to the actual situation:

## Iconify icon <Badge text="Recommended" type="tip"/>

Integrated [iconify](https://github.com/iconify/iconify) icon library

### New

New icons can be added in the `packages/icons/src/iconify` directory:

```ts
// packages/icons/src/iconify/index.ts
import { createIconifyIcon } from '@vben-core/icons';

export const MdiKeyboardEsc = createIconifyIcon('mdi:keyboard-esc');
```

### use

```vue
<script setup lang="ts">
import { MdiKeyboardEsc } from '@vben/icons';
</script>

<template>
  <!-- An icon with a width and height of 20px -->
  <MdiKeyboardEsc class="size-5" />
</template>
```

## Svg icon <Badge text="Recommended" type="tip"/>

Instead of using Svg Sprite, Svg icons are introduced directly.

### New

You can add the icon file `test.svg` in the `packages/icons/src/svg/icons` directory, and then introduce it in `packages/icons/src/svg/index.ts`:

```ts
// packages/icons/src/svg/index.ts
import { createIconifyIcon } from '@vben-core/icons';

const SvgTestIcon = createIconifyIcon('svg:test');

export { SvgTestIcon };
```

### use

```vue
<script setup lang="ts">
import { SvgTestIcon } from '@vben/icons';
</script>

<template>
  <!-- An icon with a width and height of 20px -->
  <SvgTestIcon class="size-5" />
</template>
```

## Tailwind CSS Icon

### use

You can use it by directly adding the icon class name of Tailwind CSS. The icon class name can be viewed at [iconify](https://github.com/iconify/iconify):

```vue
<span class="icon-[mdi--ab-testing]"></span>
```