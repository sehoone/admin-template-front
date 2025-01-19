<script lang="ts" setup>
import { ApiComponent } from '@vben/common-ui';

import { Cascader } from 'ant-design-vue';

const treeData: Record<string, any> = [
  {
    label: 'Zhejiang',
    value: 'zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: '西湖',
          },
          {
            value: 'sudi',
            label: 'Sudi',
          },
        ],
      },
      {
        value: 'jiaxing',
        label: 'Jiaxing',
        children: [
          {
            value: 'wuzhen',
            label: 'Wuzhen',
          },
          {
            value: 'meihuazhou',
            label: 'Meihuazhou',
          },
        ],
      },
      {
        value: 'zhoushan',
        label: 'Zhoushan',
        children: [
          {
            value: 'putuoshan',
            label: 'Putuo Mountain',
          },
          {
            value: 'taohuadao',
            label: 'Peach Blossom Island',
          },
        ],
      },
    ],
  },
  {
    label: 'Jiangsu',
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'China Gate',
          },
          {
            value: 'zijinshan',
            label: 'Purple Mountain',
          },
          {
            value: 'yuhuatai',
            label: 'Yuhuatai',
          },
        ],
      },
    ],
  },
];
/**
 * Simulate request interface
 */
function fetchApi(): Promise<Record<string, any>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(treeData);
    }, 1000);
  });
}
</script>
<template>
  <ApiComponent
    :api="fetchApi"
    :component="Cascader"
    :immediate="false"
    children-field="children"
    loading-slot="suffixIcon"
    visible-event="onDropdownVisibleChange"
  />
</template>
