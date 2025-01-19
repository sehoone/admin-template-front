<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

const [Modal] = useVbenModal({
  draggable: true,
});
</script>
<template>
  <Modal title="Drag and drop example"> modal content </Modal>
</template>
