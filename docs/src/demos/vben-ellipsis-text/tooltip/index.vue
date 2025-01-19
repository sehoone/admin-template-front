<script lang="ts" setup>
import { EllipsisText } from '@vben/common-ui';
</script>
<template>
  <EllipsisText :max-width="240">
    The lonely sea monster who lives in my heart, the king of pain, is starting
    to get tired of the light of the deep sea, the stagnant waves
    <template #tooltip>
      <div style="text-align: center">
        "Qinhuangdao"<br />The loneliness that lives in my heart<br />The lonely
        sea monster, the king of pain<br />Begins to get tired The light of the
        deep sea, the stagnant waves
      </div>
    </template>
  </EllipsisText>
</template>
