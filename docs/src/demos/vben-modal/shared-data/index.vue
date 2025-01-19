<script lang="ts" setup>
import { useVbenModal, VbenButton } from '@vben/common-ui';

import ExtraModal from './modal.vue';

const [Modal, modalApi] = useVbenModal({
  // Connect the detached components
  connectedComponent: ExtraModal,
});

function openModal() {
  modalApi
    .setData({
      content: 'Externally passed data content',
      payload: 'Externally passed data payload',
    })
    .open();
}
</script>

<template>
  <div>
    <Modal />

    <VbenButton @click="openModal">Open</VbenButton>
  </div>
</template>
