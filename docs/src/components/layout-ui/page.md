---
outline: deep
---

# Page General page components

Provides components for a general page layout, including three parts: header, content area, and bottom.

::: info is written in front

This component is a basic layout component. If you have more general page layout requirements (such as double-column layout, etc.), you can package it yourself according to actual needs.

:::

## Basic usage

Just use `Page` as the root component of your business page.

### Props

| Property name | Description | Type | Default value | Description |
| --- | --- | --- | --- | --- |
| title | Page title | `string\|slot` | - | - |
| description | Page description (content under the title) | `string\|slot` | - | - |
| contentClass | The class of the content area | `string` | - | - |
| headerClass | The class of the header area | `string` | - | - |
| footerClass | The class of the bottom area | `string` | - | - |
| autoContentHeight | Automatically adjust the height of the content area | `boolean` | `false` | - |

::: tip note

If `title`, `description`, and `extra` do not provide valid content (either through `props` or `slots`), the page header area will not be rendered.

:::

### Slots

| Slot Name | Description |
| ---------- | ---------- |
| default | page content |
| title | Page title |
| description | Page description |
| extra | right side of page header |
| footer | Bottom of page |