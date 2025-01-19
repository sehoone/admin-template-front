<script lang="ts" setup>
import { useVbenModal, VbenButton } from '@vben/common-ui';

import ExtraModal from './modal.vue';

const [Modal, modalApi] = useVbenModal({
  // Connect the detached components
  connectedComponent: ExtraModal,
});

function openModal() {
  modalApi.open();
}

function handleUpdateTitle() {
  modalApi.setState({ title: 'External dynamic title' }).open();
}
</script>

<template>
  <div>
    <Modal />

    <VbenButton @click="openModal">Open</VbenButton>
    <VbenButton class="ml-2" type="primary" @click="handleUpdateTitle">
      Modify title externally and open
    </VbenButton>
  </div>
</template>
