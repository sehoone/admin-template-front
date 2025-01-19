#External modules

In addition to the external modules introduced by default in the project, sometimes we also need to introduce other external modules. Let’s take [ant-design-vue](https://antdv.com/components/overview) as an example:

## Install dependencies

::: tip Install dependencies to the specified package

- Since the project uses [pnpm](https://pnpm.io/) as the package management tool, we need to use the `pnpm` command to install dependencies.
- The Monorepo module is used to manage projects, so we need to install dependencies under the specified package. Please make sure you have entered the specified package directory before installing dependencies.

:::

```bash
# cd /path/to/your/package
pnpm add ant-design-vue
```

## use

### Global introduction

```ts
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);

app.use(Antd).mount('#app');
```

#### use

```vue
<template>
  <a-button>text</a-button>
</template>
```

### Local introduction

```vue
<script setup lang="ts">
import { Button } from 'ant-design-vue';
</script>

<template>
  <Button>text</Button>
</template>
```

::: warning note

- If the component has dependent styles, you need to introduce the style file again

:::