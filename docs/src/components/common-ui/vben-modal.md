---
outline: deep
---

# Vben Modal modal box

The modal box component provided by the framework supports `drag`, `full screen`, `automatic height`, `loading` and other functions.

> If there is no parameter description in the document, you can try to find it in the online examples

::: info is written in front

If you feel that the encapsulation of existing components is not ideal enough, or does not fully meet your needs, you can directly use native components, or encapsulate a suitable component yourself. The components provided by the framework are not binding. Whether to use them or not depends entirely on your needs and freedom.

:::

::: tip README

In the sample code below, there are some internationalization and theme color mismatch problems. These problems only appear in the document. These problems will not occur in actual use. They can be ignored and do not need to be entangled.

:::

## Basic usage

Use `useVbenModal` to create the most basic modal box.

<DemoPreview dir="demos/vben-modal/basic" />

## Component extraction

The content in Modal is generally more complex in business, so we can extract the content in Modal to facilitate reuse. Through the `connectedComponent` parameter, inner and outer components can be connected without any other operations.

<DemoPreview dir="demos/vben-modal/extra" />

## Enable drag and drop

The draggable function can be enabled through the `draggable` parameter.

<DemoPreview dir="demos/vben-modal/draggable" />

## Automatically calculate height

The pop-up window will automatically calculate the height of the content. If it exceeds a certain height, a scroll bar will appear. It will also be combined with the `loading` effect and the `prepend-footer` slot.

<DemoPreview dir="demos/vben-modal/auto-height" />

##Use API

Through `modalApi` you can call modal's methods and use `setState` to update modal's state.

<DemoPreview dir="demos/vben-modal/dynamic" />

## Data sharing

If you use the `connectedComponent` parameter, then the internal and external components will share data, such as some form backfilling and other operations. You can use `modalApi` to obtain data and set data, and with `onOpenChange`, it can meet most needs.

<DemoPreview dir="demos/vben-modal/shared-data" />

:::info NOTE

- The processing priority of `VbenModal` component pairs and parameters is `slot` > `props` > `state` (state updated through api and useVbenModal parameters). If you have passed in `slot` or `props`, then `setState` will not take effect. In this case, you can update the state through `slot` or `props`.
- If you use the `connectedComponent` parameter, then there will be 2 `useVbenModal`. At this time, if the same parameter is set at the same time, the internal one will prevail (that is, the code that does not set connectedComponent). For example, if `onConfirm` is set at the same time, the internal `onConfirm` shall prevail. Except for the `onOpenChange` event, it will be triggered both internally and externally.
- When using the `connectedComponent` parameter, you can configure the `destroyOnClose` attribute to decide whether to destroy the `connectedComponent` component when closing the pop-up window (re-create the `connectedComponent` component, which will destroy all its internal variables, status, Data, etc. are restored to their initial state).
- If the default behavior of the pop-up window does not meet your expectations, you can modify the parameters of `setDefaultModalProps` in `src\bootstrap.ts` to set the default properties, such as hiding the full-screen button by default, modifying the default ZIndex, etc.

:::

## API

```ts
// Modal is the pop-up component
// modalApi is the pop-up window method
const [Modal, modalApi] = useVbenModal({
  //properties
  // event
});
```

### Props

All properties can be passed in the first parameter of `useVbenModal`.

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
| fullscreen | full screen display | `boolean` | `false` |
| fullscreenButton | Show full screen button | `boolean` | `true` |
| draggable | draggable | `boolean` | `false` |
| closable | Show close button | `boolean` | `true` |
| centered | Centered display | `boolean` | `false` |
| modal | display mask | `boolean` | `true` |
| header | display header | `boolean` | `true` |
| footer | show footer | `boolean\|slot` | `true` |
| confirmDisabled | Disable the confirm button | `boolean` | `false` |
| confirmLoading | Confirm button loading status | `boolean` | `false` |
| closeOnClickModal | Click the mask to close the pop-up window | `boolean` | `true` |
| closeOnPressEscape | esc close the pop-up window | `boolean` | `true` |
| confirmText | Confirm button text | `string\|slot` | `Confirm` |
| cancelText | Cancel button text | `string\|slot` | `Cancel` |
| showCancelButton | Show cancel button | `boolean` | `true` |
| showConfirmButton | Show confirmation button | `boolean` | `true` |
| class | modal class, width is configured through this | `string` | - |
| contentClass | class of modal content area | `string` | - |
| footerClass | The class of the modal bottom area | `string` | - |
| headerClass | The class of the modal top area | `string` | - |
| bordered | Whether to display border | `boolean` | `false` |
| zIndex | ZIndex level of the pop-up window | `number` | `1000` |
| overlayBlur | mask blur | `number` | - |
| submitting | Mark as submitting, lock the current status of the pop-up window | `boolean` | `false` |

::: info appendToMain

`appendToMain` can specify that the pop-up window is mounted to the content area. When such a pop-up window is opened, parts outside the content area (tab bar, navigation menu, etc.) will not be blocked. By default, the pop-up window will be mounted on the body. However: when mounted to the content area, the `Page` component as the root container of the page needs to set the `auto-content-height` attribute so that the pop-up window can correctly calculate the height.

:::

###Event

The following events will only take effect if passed in `useVbenModal({onCancel:()=>{}})`.

| Event name | Description | Type | Version number |
| --- | --- | --- | --- |
| onBeforeClose | Triggered before closing, returning `false` or being `reject` prohibits closing | `()=>Promise<boolean>\|boolean` | >5.5.2 supports Promise |
| onCancel | Triggered by clicking the cancel button | `()=>void` | |
| onClosed | Triggered when the closing animation finishes playing | `()=>void` | >5.4.3 |
| onConfirm | Triggered by clicking the confirm button | `()=>void` | |
| onOpenChange | Triggered when closing or opening the pop-up window | `(isOpen:boolean)=>void` | |
| onOpened | Triggered when the open animation finishes playing | `()=>void` | >5.4.3 |

### Slots

In addition to the above attribute types including `slot`, the content of the pop-up window can also be customized through slots.

| slot name | description |
| -------------- | ------------------- |
| default | Default slot - pop-up content |
| prepend-footer | Left side of cancel button |
| append-footer | Right side of cancel button |

### modalApi

| Method | Description | Type | Version |
| --- | --- | --- | --- |
| setState | Dynamically set pop-up window state attributes | `(((prev: ModalState) => Partial<ModalState>)\| Partial<ModalState>)=>modalApi` | - |
| open | Open pop-up window | `()=>void` | - |
| close | Close the pop-up window | `()=>void` | - |
| setData | Set shared data | `<T>(data:T)=>modalApi` | - |
| getData | Get shared data | `<T>()=>T` | - |
| useStore | Get reactive status | - | - |
| lock | Mark the pop-up window as being submitted and lock the current status | `(isLock:boolean)=>modalApi` | >5.5.2 |

::: info lock

The `lock` method is used to lock the status of the current pop-up window. It is generally used during the process of submitting data to prevent the user from submitting repeatedly or the pop-up window being closed accidentally, the form data being changed, etc. When in the locked state, the confirmation button of the pop-up window will change to the loading state, and the confirmation button will be disabled, the close button will be hidden, ESC will be disabled, or the pop-up window will be closed by clicking on the mask, and the spinner animation of the pop-up window will be enabled to block the pop-up window content. When the `close` method is called to close a locked pop-up window, it will be automatically unlocked.

:::