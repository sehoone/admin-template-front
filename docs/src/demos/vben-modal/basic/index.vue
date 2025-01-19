<script lang="ts" setup>
import { useVbenModal, VbenButton } from '@vben/common-ui';

const [Modal, modalApi] = useVbenModal();
</script>
<template>
  <div>
    <VbenButton @click="() => modalApi.open()">Open</VbenButton>
    <Modal class="w-[600px]" title="Basic Example"> modal content </Modal>
  </div>
</template>
