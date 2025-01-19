<script lang="ts" setup>
import { message } from 'ant-design-vue';

import { useVbenForm, z } from '#/adapter/form';

const [Form] = useVbenForm({
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
        placeholder: 'Please enter',
      },
      // Field name
      fieldName: 'field1',
      // Label displayed on the interface
      label: 'Field 1',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter',
      },
      defaultValue: 'default value',
      fieldName: 'field2',
      label: 'Default value (required)',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'field3',
      label: 'Default value (not required)',
      rules: z.string().default('default value').optional(),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'field31',
      label: 'custom information',
      rules: z.string().min(1, { message: 'Enter at least 1 character' }),
    },
    {
      component: 'Input',
      // Parameters of the corresponding component
      componentProps: {
        placeholder: 'Please enter',
      },
      // Field name
      fieldName: 'field4',
      // Label displayed on the interface
      label: 'mailbox',
      rules: z.string().email('Please enter the correct email'),
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'number',
      label: 'number',
      rules: 'required',
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
      defaultValue: undefined,
      fieldName: 'options',
      label: 'drop-down selection',
      rules: 'selectRequired',
    },
    {
      component: 'RadioGroup',
      componentProps: {
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
      },
      fieldName: 'radioGroup',
      label: 'radio group',
      rules: 'selectRequired',
    },
    {
      component: 'CheckboxGroup',
      componentProps: {
        name: 'cname',
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
      },
      fieldName: 'checkboxGroup',
      label: 'Multiple selection group',
      rules: 'selectRequired',
    },
    {
      component: 'Checkbox',
      fieldName: 'checkbox',
      label: '',
      renderComponentContent: () => {
        return {
          default: () => ['I have read and agree'],
        };
      },
      rules: 'selectRequired',
    },
    {
      component: 'DatePicker',
      defaultValue: undefined,
      fieldName: 'datePicker',
      label: 'Date selection box',
      rules: 'selectRequired',
    },
    {
      component: 'RangePicker',
      defaultValue: undefined,
      fieldName: 'rangePicker',
      label: 'Interval selection box',
      rules: 'selectRequired',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: 'Please enter',
      },
      fieldName: 'password',
      label: 'password',
      rules: 'required',
    },
  ],
  wrapperClass: 'grid-cols-1',
});

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}
</script>

<template>
  <Form />
</template>
