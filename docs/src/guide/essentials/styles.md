# style

::: tip Preface

For the Vue project, [Official Document](https://vuejs.org/api/sfc-css-features.html#deep-selectors) has a relatively detailed introduction to the syntax. Here we mainly introduce the style file structure in the project. and use.

:::

## Project structure

The style files in the project are stored in `@vben/styles`, including some global styles, such as reset styles, global variables, etc. It inherits the styles and capabilities of `@vben-core/design` and can be overridden according to project needs. .

##Scsss

`scss` is used as the style preprocessor in the project, and the features of `scss` can be used in the project, such as variables, functions, mixins, etc.

```vue
<style lang="scss" scoped>
$font-size: 30px;

.box {
  .title {
    color: green;
    font-size: $font-size;
  }
}
</style>
```

## Postcss

If you are not used to using `scss`, you can also use `postcss`, which is a more powerful style processor and can use more plug-ins. The project has built-in [postcss-nested](https://github.com/ postcss/postcss-nested) plug-in, configured with `Css Variables`, can completely replace `scss`.

```vue
<style scoped>
.box {
  --font-size: 30px;
  .title {
    color: green;
    font-size: var(--font-size);
  }
}
</style>
```

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) is integrated into the project. You can use the class name of `tailwindcss` in the project to quickly build pages.

```vue
<template>
  <div class="bg-white p-4">
    <p class="text-green">hello world</p>
  </div>
</template>
```

## BEM specification

Another option for style conflicts is to use the `BEM` specification. If you choose `scss`, it is recommended to use the `BEM` naming convention to better manage styles. The project provides the `useNamespace` function by default, which can easily generate a namespace.

```vue
<script lang="ts" setup>
import { useNamespace } from '@vben/hooks';

const { b, e, is } = useNamespace('menu');
</script>
<template>
  <div :class="[b()]">
    <div :class="[e('item'), is('active', true)]">item1</div>
  </div>
</template>
<style lang="scss" scoped>
// If you use it within an application, this line of code can be omitted. It has been introduced globally in all applications.
@use '@vben/styles/global' as *;
@include b('menu') {
  color: black;

  @include e('item') {
    background-color: black;

    @include is('active') {
      background-color: red;
    }
  }
}
</style>
```

## CSS Modules

To solve the problem of style conflict, another solution is to use `CSS Modules` modular solution. How to use it is as follows.

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

For more usage, see [CSS Modules official documentation](https://vuejs.org/api/sfc-css-features.html#css-modules).