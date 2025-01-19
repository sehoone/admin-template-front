<script lang="ts" setup>
import { useVbenDrawer, VbenButton } from '@vben/common-ui';

import ExtraDrawer from './drawer.vue';

const [Drawer, drawerApi] = useVbenDrawer({
  // Connect the detached components
  connectedComponent: ExtraDrawer,
});

function open() {
  drawerApi
    .setData({
      content: 'Externally passed data content',
      payload: 'Externally passed data payload',
    })
    .open();
}
</script>

<template>
  <div>
    <Drawer />

    <VbenButton @click="open">Open</VbenButton>
  </div>
</template>
