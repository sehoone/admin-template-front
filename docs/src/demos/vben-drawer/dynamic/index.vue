<script lang="ts" setup>
import { useVbenDrawer, VbenButton } from '@vben/common-ui';

import ExtraDrawer from './drawer.vue';

const [Drawer, drawerApi] = useVbenDrawer({
  // Connect the detached components
  connectedComponent: ExtraDrawer,
});

function open() {
  drawerApi.open();
}

function handleUpdateTitle() {
  drawerApi.setState({ title: 'External dynamic title' }).open();
}
</script>

<template>
  <div>
    <Drawer />

    <VbenButton @click="open">Open</VbenButton>
    <VbenButton class="ml-2" type="primary" @click="handleUpdateTitle">
      Modify title externally and open
    </VbenButton>
  </div>
</template>
