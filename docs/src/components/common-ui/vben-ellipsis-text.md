---
outline: deep
---

# Vben EllipsisText omit text

The text display component provided by the framework can be configured with functions such as super long omission, tooltip prompt, expansion and collapse, etc.

> If there is no parameter description in the document, you can try to find it in the online examples

## Basic usage

Set the text content through the default slot, and the `maxWidth` property sets the maximum width.

<DemoPreview dir="demos/vben-ellipsis-text/line" />

## Collapsible text block

Use `line` to set the number of folded lines, and the `expand` attribute sets whether to support expansion and collapse.

<DemoPreview dir="demos/vben-ellipsis-text/expand" />

## Custom prompt floating layer

Customize the tooltip information through the slot named `tooltip`.

<DemoPreview dir="demos/vben-ellipsis-text/tooltip" />

## API

### Props

| Property name | Description | Type | Default value |
| --- | --- | --- | --- |
| expand | Support click to expand or collapse | `boolean` | `false` |
| line | Maximum number of lines of text | `number` | `1` |
| maxWidth | Maximum width of text area | `number \| string` | `'100%'' |
| placement | Prompt the position of the floating layer | `'bottom'\|'left'\|'right'\|'top'` | `'top'` |
| tooltip | enable text tips | `boolean` | `true` |
| tooltipBackgroundColor | tooltip text background color | `string` | - |
| tooltipColor | tooltip text color | `string` | - |
| tooltipFontSize | tooltip text size | `string` | - |
| tooltipMaxWidth | Tips for the maximum width of the floating layer. If not set, it will remain consistent with the text width | `number` | - |
| tooltipOverlayStyle | Tip box content area style | `CSSProperties` | `{ textAlign: 'justify' }` |

### Events

| Event name | Description | Type |
| ------------ | ------------ | ----------------------- --- |
| expandChange | Expand state change | `(isExpand:boolean)=>void` |

### Slots

| slot name | description |
| ------- | -------------------------------- |
| tooltip | When text prompts are enabled, used to customize the prompt content |