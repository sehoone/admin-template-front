<script lang="ts" setup>
import { useVbenDrawer, VbenButton } from '@vben/common-ui';

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    console.info('onConfirm');
  },
  title: 'Dynamic modification configuration example',
});

function handleUpdateTitle() {
  drawerApi.setState({ title: 'Internal dynamic title' });
}
</script>
<template>
  <Drawer>
    <div class="flex-col-center">
      <VbenButton class="mb-3" type="primary" @click="handleUpdateTitle()">
        Dynamically modify the title internally
      </VbenButton>
    </div>
  </Drawer>
</template>
