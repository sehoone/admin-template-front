---
outline: deep
---

# Vben Drawer drawer

The drawer component provided by the framework supports functions such as `automatic height` and `loading`.

> If there is no parameter description in the document, you can try to find it in the online examples

::: info is written in front

If you feel that the encapsulation of existing components is not ideal enough, or does not fully meet your needs, you can directly use native components, or encapsulate a suitable component yourself. The components provided by the framework are not binding. Whether to use them or not depends entirely on your needs and freedom.

:::

::: tip README

In the sample code below, there are some internationalization and theme color mismatch problems. These problems only appear in the document. These problems will not occur in actual use. They can be ignored and do not need to be entangled.

:::

## Basic usage

Use `useVbenDrawer` to create the most basic modal box.

<DemoPreview dir="demos/vben-drawer/basic" />

## Component extraction

The content in Drawer is generally more complex in business, so we can extract the content in Drawer for easy reuse. Through the `connectedComponent` parameter, inner and outer components can be connected without any other operations.

<DemoPreview dir="demos/vben-drawer/extra" />

## Automatically calculate height

The pop-up window will automatically calculate the height of the content. If it exceeds a certain height, a scroll bar will appear. It will also be combined with the `loading` effect and the `prepend-footer` slot.

<DemoPreview dir="demos/vben-drawer/auto-height" />

##Use API

Through `drawerApi` you can call the drawer's method and use `setState` to update the drawer's state.

<DemoPreview dir="demos/vben-drawer/dynamic" />

## Data sharing

If you use the `connectedComponent` parameter, then the internal and external components will share data, such as some form backfilling and other operations. You can use `drawerApi` to obtain data and set data, and cooperate with `onOpenChange` to meet most needs.

<DemoPreview dir="demos/vben-drawer/shared-data" />

:::info NOTE

- The processing priority of `VbenDrawer` component pairs and parameters is `slot` > `props` > `state` (state updated through api and useVbenDrawer parameters). If you have passed in `slot` or `props`, then `setState` will not take effect. In this case, you can update the state through `slot` or `props`.
- If you use the `connectedComponent` parameter, then there will be 2 `useVbenDrawer`. At this time, if the same parameter is set at the same time, the internal one will prevail (that is, the code that does not set connectedComponent). For example, if `onConfirm` is set at the same time, the internal `onConfirm` shall prevail. Except for the `onOpenChange` event, it will be triggered both internally and externally.
- When using the `connectedComponent` parameter, you can configure the `destroyOnClose` attribute to decide whether to destroy the `connectedComponent` component when closing the pop-up window (re-create the `connectedComponent` component, which will destroy all its internal variables, status, Data, etc. are restored to their initial state).
- If the default behavior of the drawer does not meet your expectations, you can modify the parameters of `setDefaultDrawerProps` in `src\bootstrap.ts` to set the default properties, such as hiding the full-screen button by default, modifying the default ZIndex, etc.

:::

## API

```ts
// Drawer is a pop-up window component
// drawerApi is the pop-up window method
const [Drawer, drawerApi] ​​= useVbenDrawer({
  //properties
  // event
});
```

### Props

All properties can be passed into the first parameter of `useVbenDrawer`.

| Property name | Description | Type | Default value |
| --- | --- | --- | --- |
| appendToMain | Whether to mount to the content area (mounted to the body by default) | `boolean` | `false` |
| connectedComponent | Connect another Modal component | `Component` | - |
| destroyOnClose | Destroy `connectedComponent` on close | `boolean` | `false` |
| title | title | `string\|slot` | - |
| titleTooltip | Title prompt information | `string\|slot` | - |
| description | Description information | `string\|slot` | - |
| isOpen | Pop-up window open status | `boolean` | `false` |
| loading | Pop-up window loading status | `boolean` | `false` |
| closable | Show close button | `boolean` | `true` |
| closeIconPlacement | Close button position | `'left'\|'right'` | `right` |
| modal | display mask | `boolean` | `true` |
| header | display header | `boolean` | `true` |
| footer | show footer | `boolean\|slot` | `true` |
| confirmLoading | Confirm button loading status | `boolean` | `false` |
| closeOnClickModal | Click the mask to close the pop-up window | `boolean` | `true` |
| closeOnPressEscape | esc close the pop-up window | `boolean` | `true` |
| confirmText | Confirm button text | `string\|slot` | `Confirm` |
| cancelText | Cancel button text | `string\|slot` | `Cancel` |
| placement | drawer pop-up position | `'left'\|'right'\|'top'\|'bottom'` | `right` |
| showCancelButton | Show cancel button | `boolean` | `true` |
| showConfirmButton | Show confirmation button text | `boolean` | `true` |
| class | modal class, width is configured through this | `string` | - |
| contentClass | class of modal content area | `string` | - |
| footerClass | The class of the modal bottom area | `string` | - |
| headerClass | The class of the modal top area | `string` | - |
| zIndex | ZIndex level of the drawer | `number` | `1000` |
| overlayBlur | mask blur | `number` | - |

::: info appendToMain

`appendToMain` can specify that the drawer is mounted to the content area. When the drawer is opened, parts outside the content area (tab bar, navigation menu, etc.) will not be blocked. By default, the drawer will be mounted on the body. However: when mounted to the content area, the `Page` component as the root container of the page needs to set the `auto-content-height` attribute so that the drawer can correctly calculate the height.

:::

###Event

The following events will only take effect if passed in `useVbenDrawer({onCancel:()=>{}})`.

| Event name | Description | Type | Version limit |
| --- | --- | --- | --- |
| onBeforeClose | Triggered before closing, return `false` to disable closing | `()=>boolean` | --- |
| onCancel | Triggered by clicking the cancel button | `()=>void` | --- |
| onClosed | Triggered when the closing animation finishes playing | `()=>void` | >5.5.2 |
| onConfirm | Triggered by clicking the confirm button | `()=>void` | --- |
| onOpenChange | Triggered when closing or opening a pop-up window | `(isOpen:boolean)=>void` | --- |
| onOpened | Triggered when the open animation finishes playing | `()=>void` | >5.5.2 |

### Slots

In addition to the above attribute types including `slot`, the content of the pop-up window can also be customized through slots.

| slot name | description |
| -------------- | ------------------- |
| default | Default slot - pop-up content |
| prepend-footer | Left side of cancel button |
| append-footer | Right side of cancel button |
| close-icon | close button icon |
| extra | Extra content (right side of title) |

### drawerApi

| Method | Description | Type |
| --- | --- | --- |
| setState | Dynamically set pop-up window state attributes | `(((prev: ModalState) => Partial<ModalState>)\| Partial<ModalState>)=>drawerApi` |
| open | Open pop-up window | `()=>void` |
| close | Close the pop-up window | `()=>void` |
| setData | Set shared data | `<T>(data:T)=>drawerApi` |
| getData | Get shared data | `<T>()=>T` |
| useStore | Get reactive status | - |