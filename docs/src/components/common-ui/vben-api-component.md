---
outline: deep
---

# Vben ApiComponent Api component wrapper

The API "wrapper" provided by the framework is generally not used independently. It is mainly used to wrap other components and provide the target component with the ability to automatically obtain remote data, but still maintains the original usage of the target component.

::: info is written in front

We use ApiComponent to wrap the Select and TreeSelect components in the component adapters of each application, so that these components can automatically obtain remote data and generate options. If necessary, other similar components (such as Cascader) can be packaged by themselves by referring to the sample code.

:::

## Basic usage

Pass in the definition of other components through `component` and configure other related properties (mainly some name mapping). The packaging component will obtain data through `api` (`beforerFetch` and `afterFetch` will be called before and after `api` is run respectively), use `resultField` to extract the array from it, and use `valueField` and `label Field` and so on to extract value and label from the data (if `childrenField` is provided, each level of data will be recursively processed as a tree structure), and then the processed data will be passed to the target through the properties specified by `optionsPropName` components.

::: details wraps the cascading selector and starts loading remote data when the drop-down is clicked.

```vue
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
```

:::

## API

### Props

| Property name | Description | Type | Default value |
| --- | --- | --- | --- |
| modelValue(v-model) | current value | `any` | - |
| component | The component to be packaged (hereinafter referred to as the target component) | `Component` | - |
| numberToString | Whether to convert value from number to string | `boolean` | `false` |
| api | Function to get data | `(arg?: any) => Promise<OptionsItem[] \| Record<string, any>>` | - |
| params | Parameters passed to api | `Record<string, any>` | - |
| resultField | Extract the field name of the options array from the results returned by the api | `string` | - |
| labelField | label field name | `string` | `label` |
| childrenField | Child data field name, available for components that require hierarchical data | `string` | `` |
| valueField | value field name | `string` | `value` |
| optionsPropName | The property name of the target component to receive options data | `string` | `options` |
| modelPropName | The two-way binding property name of the target component, the default is modelValue. Some components may be value | `string` | `modelValue` |
| immediate | Whether to call the api immediately | `boolean` | `true` |
| alwaysLoad | Request data every time a `visibleEvent` event occurs | `boolean` | `false` |
| beforeFetch | The callback function before the api request | `AnyPromiseFunction<any, any>` | - |
| afterFetch | The callback function after the api request | `AnyPromiseFunction<any, any>` | - |
| options | Pass in option data directly, and also serve as backup data when the api returns empty data | `OptionsItem[]` | - |
| visibleEvent | The name of the event that triggers re-requesting data | `string` | - |
| loadingSlot | The slot name of the target component, used to display a "loading" icon | `string` | - |