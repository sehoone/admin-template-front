<script lang="ts" setup>
import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

const [BaseForm] = useVbenForm({
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
    },
    {
      component: 'Radio',
      fieldName: 'radio',
      label: '',
      renderComponentContent: () => {
        return {
          default: () => ['Radio'],
        };
      },
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
    },
    {
      component: 'Mentions',
      componentProps: {
        options: [
          {
            label: 'afc163',
            value: 'afc163',
          },
          {
            label: 'zombieJ',
            value: 'zombieJ',
          },
        ],
        placeholder: 'Please enter',
      },
      fieldName: 'mentions',
      label: 'mentions',
    },
    {
      component: 'Rate',
      fieldName: 'rate',
      label: 'rating',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'w-auto',
      },
      fieldName: 'switch',
      label: 'switch',
    },
    {
      component: 'DatePicker',
      fieldName: 'datePicker',
      label: 'Date selection box',
    },
    {
      component: 'RangePicker',
      fieldName: 'rangePicker',
      label: 'range selector',
    },
    {
      component: 'TimePicker',
      fieldName: 'timePicker',
      label: 'Time selection box',
    },
    {
      component: 'TreeSelect',
      componentProps: {
        allowClear: true,
        placeholder: 'Please select',
        showSearch: true,
        treeData: [
          {
            label: 'root 1',
            value: 'root 1',
            children: [
              {
                label: 'parent 1',
                value: 'parent 1',
                children: [
                  {
                    label: 'parent 1-0',
                    value: 'parent 1-0',
                    children: [
                      {
                        label: 'my leaf',
                        value: 'leaf1',
                      },
                      {
                        label: 'your leaf',
                        value: 'leaf2',
                      },
                    ],
                  },
                  {
                    label: 'parent 1-1',
                    value: 'parent 1-1',
                  },
                ],
              },
              {
                label: 'parent 2',
                value: 'parent 2',
              },
            ],
          },
        ],
        treeNodeFilterProp: 'label',
      },
      fieldName: 'treeSelect',
      label: 'tree selection',
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
  <BaseForm />
</template>
