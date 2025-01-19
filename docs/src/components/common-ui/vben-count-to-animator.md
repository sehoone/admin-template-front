---
outline: deep
---

# Vben CountToAnimator Digital Animation

The digital animation component provided by the framework supports digital animation effects.

> If there is no parameter description in the document, you can try to find it in the online examples

::: info is written in front

If you feel that the encapsulation of existing components is not ideal enough, or does not fully meet your needs, you can directly use native components, or encapsulate a suitable component yourself. The components provided by the framework are not binding. Whether to use them or not depends entirely on your needs and freedom.

:::

## Basic usage

Set the start value and end value of the digital animation through `start-val` and `end-val`, with a duration of `3000`ms.

<DemoPreview dir="demos/vben-count-to-animator/basic" />

## Custom prefix and delimiter

Set the prefix and separator of digital animation through `prefix` and `separator`.

<DemoPreview dir="demos/vben-count-to-animator/custom" />

### Props

| Property name | Description | Type | Default value |
| ---------- | -------------- | --------- | -------- |
| startVal | starting value | `number` | `0` |
| endVal | end value | `number` | `2021` |
| duration | animation duration | `number` | `1500` |
| autoplay | automatic execution | `boolean` | `true` |
| prefix | prefix | `string` | - |
| suffix | suffix | `string` | - |
| separator | separator | `string` | `,` |
| color | font color | `string` | - |
| useEasing | Whether to enable animation | `boolean` | `true` |
| transition | animation effect | `string` | `linear` |
| decimals | Number of decimal places | `number` | `0` |

### Methods

The following events will only take effect if passed in `useVbenModal({onCancel:()=>{}})`.

| Event name | Description | Type |
| ------ | ---------- | ---------- |
| start | Start executing animation | `()=>void` |
| reset | reset | `()=>void` |