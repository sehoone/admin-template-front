<script lang="ts" setup>
import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

const [QueryForm] = useVbenForm({
  // Expand by default
  collapsed: false,
  // Common to all form items, they can be overridden individually within the form.
  commonConfig: {
    // All form items
    componentProps: {
      class: 'w-full',
    },
  },
  // Submit function
  handleSubmit: onSubmit,
  // Vertical layout, label and input are on different lines, the value is vertical
  // Horizontal layout, label and input are on the same line
  layout: 'horizontal',
  schema: [
    {
      // The component needs to be registered in #/adapter.ts and add the type
      component: 'Input',
      // Parameters of the corresponding component
      componentProps: {
        placeholder: 'Please enter username',
      },
      // Field name
      fieldName: 'username',
      // Label displayed on the interface
      label: 'string',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: 'Please enter password',
      },
      fieldName: 'password',
      label: 'password',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'number',
      label: 'Number (with suffix)',
      suffix: () => '¥',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
        ],
        placeholder: 'Please select',
        showSearch: true,
      },
      fieldName: 'options',
      label: 'drop-down selection',
    },
    {
      component: 'DatePicker',
      fieldName: 'datePicker',
      label: 'Date selection box',
    },
  ],
  // Whether it can be expanded
  showCollapseButton: true,
  submitButtonOptions: {
    content: 'query',
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
});
function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}
</script>

<template>
  <QueryForm />
</template>
