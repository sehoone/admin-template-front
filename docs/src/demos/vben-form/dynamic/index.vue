<script lang="ts" setup>
import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

const [Form] = useVbenForm({
  // Submit function
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      defaultValue: 'hidden value',
      dependencies: {
        show: false,
        // When any field changes, it will be triggered.
        triggerFields: ['field1Switch'],
      },
      fieldName: 'hiddenField',
      label: 'hidden field',
    },
    {
      component: 'Switch',
      defaultValue: true,
      fieldName: 'field1Switch',
      help: 'Control destruction through Dom',
      label: 'Display field 1',
    },
    {
      component: 'Switch',
      defaultValue: true,
      fieldName: 'field2Switch',
      help: 'Control hiding through css',
      label: 'Display field 2',
    },
    {
      component: 'Switch',
      fieldName: 'field3Switch',
      label: 'Disabled field 3',
    },
    {
      component: 'Switch',
      fieldName: 'field4Switch',
      label: 'Field 4 is required',
    },
    {
      component: 'Input',
      dependencies: {
        if(values) {
          return !!values.field1Switch;
        },
        // This will only be triggered when the specified field changes.
        triggerFields: ['field1Switch'],
      },
      // Field name
      fieldName: 'field1',
      // Label displayed on the interface
      label: 'Field 1',
    },
    {
      component: 'Input',
      dependencies: {
        show(values) {
          return !!values.field2Switch;
        },
        triggerFields: ['field2Switch'],
      },
      fieldName: 'field2',
      label: 'Field 2',
    },
    {
      component: 'Input',
      dependencies: {
        disabled(values) {
          return !!values.field3Switch;
        },
        triggerFields: ['field3Switch'],
      },
      fieldName: 'field3',
      label: 'Field 3',
    },
    {
      component: 'Input',
      dependencies: {
        required(values) {
          return !!values.field4Switch;
        },
        triggerFields: ['field4Switch'],
      },
      fieldName: 'field4',
      label: 'Field 4',
    },
    {
      component: 'Input',
      dependencies: {
        rules(values) {
          if (values.field1 === '123') {
            return 'required';
          }
          return null;
        },
        triggerFields: ['field1'],
      },
      fieldName: 'field5',
      help: 'Required when the value of field 1 is `123`',
      label: 'dynamic rules',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        class: 'w-full',
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
      dependencies: {
        componentProps(values) {
          if (values.field2 === '123') {
            return {
              options: [
                {
                  label: 'Option 1',
                  value: '1',
                },
                {
                  label: 'Option 2',
                  value: '2',
                },
                {
                  label: 'Option 3',
                  value: '3',
                },
              ],
            };
          }
          return {};
        },
        triggerFields: ['field2'],
      },
      fieldName: 'field6',
      help: 'Change the drop-down option when the value of field 2 is `123`',
      label: 'dynamic configuration',
    },
  ],
  // The large screen displays 3 items in one line, the medium screen displays 2 items in one line, and the small screen displays 1 item in one line.
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
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
