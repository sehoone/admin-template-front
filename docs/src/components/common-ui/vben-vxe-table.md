---
outline: deep
---

# Vben Vxe Table table

The Table list component provided by the framework is based on [vxe-table](https://vxetable.cn/v4/#/grid/api?apiKey=grid) and combined with `Vben Form` for secondary encapsulation.

Among them, the **Form Search** part of the header uses `Vben Form`, and the main part of the form uses the `vxe-grid` component to support paging, sorting, filtering and other functions of the table.

> If there is no parameter description in the document, you can try to find it in the online examples or [vxe-grid official API document](https://vxetable.cn/v4/#/grid/api?apiKey=grid)

::: info is written in front

If you feel that the encapsulation of existing components is not ideal enough, or does not fully meet your needs, you can directly use native components, or encapsulate a suitable component yourself. The components provided by the framework are not binding. Whether to use them or not depends entirely on your needs and freedom.

:::

## Adapter

The bottom layer of the table is implemented using [vxe-table](https://vxetable.cn/#/start/install), so you can use all the functions of `vxe-table`. For different UI frameworks, we provide adapters to better adapt to different UI frameworks.

### Adapter description

Each application can configure its own `vxe-table` adapter according to your own needs. Here is a simple configuration example:

::: details vxe-table table adapter

```ts
import { h } from 'vue';

import { setupVbenVxeTable, useVbenVxeGrid } from '@vben/plugins/vxe-table';

import { Button, Image } from 'ant-design-vue';

import { useVbenForm } from './form';

setupVbenVxeTable({
  configVxeTable: (vxeUI) => {
    vxeUI.setConfig({
      grid: {
        align: 'center',
        border: false,
        columnConfig: {
          resizable: true,
        },
        minHeight: 180,
        formConfig: {
          // Globally disable vxe-table form configuration, use formOptions
          enabled: false,
        },
        proxyConfig: {
          autoLoad: true,
          response: {
            result: 'items',
            total: 'total',
            list: 'items',
          },
          showActiveMsg: true,
          showResponseMsg: false,
        },
        round: true,
        showOverflow: true,
        size: 'small',
      },
    });

    // Table configuration items can be used cellRender: { name: 'CellImage' },
    vxeUI.renderer.add('CellImage', {
      renderTableDefault(_renderOpts, params) {
        const { column, row } = params;
        return h(Image, { src: row[column.field] });
      },
    });

    // Table configuration items can be used cellRender: { name: 'CellLink' },
    vxeUI.renderer.add('CellLink', {
      renderTableDefault(renderOpts) {
        const { props } = renderOpts;
        return h(
          Button,
          { size: 'small', type: 'link' },
          { default: () => props?.text },
        );
      },
    });

    // Here you can extend the global configuration of vxe-table by yourself, such as custom formatting
    // vxeUI.formats.add
  },
  useVbenForm,
});

export { useVbenVxeGrid };

export type * from '@vben/plugins/vxe-table';
```

:::

## Basic table

Use `useVbenVxeGrid` to create the most basic grid.

<DemoPreview dir="demos/vben-vxe-table/basic" />

## Remote loading

By specifying the `query` method of `proxyConfig.ajax`, you can load data remotely.

<DemoPreview dir="demos/vben-vxe-table/remote" />

## Tree table

The data source of the tree table is a flat structure, and you can specify the `treeConfig` configuration item to implement the tree table.

```typescript
treeConfig: {
  transform: true, // Specify the table as a tree table
  parentField: 'parentId', // Parent node field name
  rowField: 'id', // row data field name
},
```

<DemoPreview dir="demos/vben-vxe-table/tree" />

## Fixed header/column

Column fixed optional parameters: `'left' | 'right' | '' | null`

<DemoPreview dir="demos/vben-vxe-table/fixed" />

## Custom cells

There are two ways to implement custom cells

- via `slots` slots
- Customize cells through `customCell`, but add a renderer first

```typescript
// Table configuration items can be used cellRender: { name: 'CellImage' },
vxeUI.renderer.add('CellImage', {
  renderDefault(_renderOpts, params) {
    const { column, row } = params;
    return h(Image, { src: row[column.field] } as any); // Note that the Image component here comes from Antd and needs to be introduced by yourself, otherwise the js Image class will be used
  },
});

// Table configuration items can be used cellRender: { name: 'CellLink' },
vxeUI.renderer.add('CellLink', {
  renderDefault(renderOpts) {
    const { props } = renderOpts;
    return h(
      Button,
      { size: 'small', type: 'link' },
      { default: () => props?.text },
    );
  },
});
```

<DemoPreview dir="demos/vben-vxe-table/custom-cell" />

## Search form

**Form search** part uses `Vben Form form`, refer to [Vben Form form document](/components/common-ui/vben-form).

When form search is enabled, you can configure `search` to `true` in toolbarConfig to have the form display a search form control button in the toolbar area.

<DemoPreview dir="demos/vben-vxe-table/form" />

## Cell editing

Cell editing can be achieved by specifying `editConfig.mode` as `cell`.

<DemoPreview dir="demos/vben-vxe-table/edit-cell" />

## Line editing

Row editing can be achieved by specifying `editConfig.mode` as `row`.

<DemoPreview dir="demos/vben-vxe-table/edit-row" />

## Virtual scrolling

It is enabled through the combination of scroll-y.enabled and scroll-y.gt, where enabled is the total switch, and gt means that it is automatically enabled when the total number of rows is greater than the specified number of rows.

> Refer to [vxe-table official documentation - virtual scrolling](https://vxetable.cn/v4/#/component/grid/scroll/vertical).

<DemoPreview dir="demos/vben-vxe-table/virtual" />

## API

`useVbenVxeGrid` returns an array, the first element is the table component and the second element is the table method.

```vue
<script setup lang="ts">
import { useVbenVxeGrid } from '#/adapter/vxe-table';

// Grid is a table component
// gridApi is the method of table
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {},
  formOptions: {},
  gridEvents: {},
  //properties
  // event
});
</script>

<template>
  <Grid />
</template>
```

### GridApi

The second parameter returned by useVbenVxeGrid is an object that contains some form methods.

| Method name | Description | Type | Description |
| --- | --- | --- | --- |
| setLoading | Set loading status | `(loading)=>void` | - |
| setGridOptions | Set vxe-table grid component parameters | `(options: Partial<VxeGridProps['gridOptions'])=>void` | - |
| reload | Reload the table and initialize it | `(params:any)=>void` | - |
| query | Overloading the table will retain the current paging | `(params:any)=>void` | - |
| grid | vxe-table grid instance | `VxeGridInstance` | - |
| formApi | vbenForm api instance | `FormApi` | - |
| toggleSearchForm | Set the search form display state | `(show?: boolean)=>boolean` | When the parameter is omitted, the form will be switched between showing and hiding states |

## Props

All properties can be passed into the first parameter of `useVbenVxeGrid`.

| Attribute name | Description | Type |
| -------------- | ------------------ | --------------- ---- |
| tableTitle | table title | `string` |
| tableTitleHelp | Table title help information | `string` |
| gridClass | The class of the grid component | `string` |
| gridOptions | Parameters of grid component | `VxeTableGridProps` |
| gridEvents | Grid component triggered ⌚️ | `VxeGridListeners` |
| formOptions | Form parameters | `VbenFormProps` |
| showSearchForm | Whether to display the search form | `boolean` |