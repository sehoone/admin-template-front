<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

const data = ref();

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    console.info('onConfirm');
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      data.value = drawerApi.getData<Record<string, any>>();
    }
  },
});
</script>
<template>
  <Drawer title="Data Sharing Example">
    <div class="flex-col-center">Externally pass data: {{ data }}</div>
  </Drawer>
</template>
