<script lang="ts" setup>
import { useVbenModal, VbenButton } from '@vben/common-ui';

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onConfirm() {
    console.info('onConfirm');
  },
  title: 'Dynamic modification configuration example',
});

const state = modalApi.useStore();

function handleUpdateTitle() {
  modalApi.setState({ title: 'Internal dynamic title' });
}

function handleToggleFullscreen() {
  modalApi.setState((prev) => {
    return { ...prev, fullscreen: !prev.fullscreen };
  });
}
</script>
<template>
  <Modal>
    <div class="flex-col-center">
      <VbenButton class="mb-3" type="primary" @click="handleUpdateTitle()">
        Dynamically modify the title internally
      </VbenButton>
      <VbenButton class="mb-3" @click="handleToggleFullscreen()">
        {{ state.fullscreen ? 'Exit full screen' : 'Open full screen' }}
      </VbenButton>
    </div>
  </Modal>
</template>
