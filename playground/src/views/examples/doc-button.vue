<script lang="ts" setup>
import { VBEN_DOC_URL } from '@vben/constants';
import { openWindow } from '@vben/utils';

import { Button } from 'ant-design-vue';

const props = defineProps<{ path: string }>();

function handleClick() {
  // If there is no .html, a 404 error may occur when opening the page
  const path =
    VBEN_DOC_URL +
    (props.path.toLowerCase().endsWith('.html')
      ? props.path
      : `${props.path}.html`);
  openWindow(path);
}
</script>

<template>
  <Button @click="handleClick">View Component Documentation</Button>
</template>
