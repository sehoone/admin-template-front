<script lang="ts" setup>
import { h } from 'vue';

import { Input, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

const [Form] = useVbenForm({
  // Common to all form items, they can be overridden individually within the form.
  commonConfig: {
    // All form items
    componentProps: {
      class: 'w-full',
    },
    labelClass: 'w-2/6',
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
      fieldName: 'field',
      label: 'custom suffix',
      suffix: () => h('span', { class: 'text-red-600' }, '元'),
    },
    {
      component: 'Input',
      fieldName: 'field1',
      label: 'custom component slot',
      renderComponentContent: () => ({
        prefix: () => 'prefix',
        suffix: () => 'suffix',
      }),
    },
    {
      component: h(Input, { placeholder: 'Please enter' }),
      fieldName: 'field2',
      label: 'custom component',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'field3',
      label: 'Custom component (slot)',
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
  <Form>
    <template #field3="slotProps">
      <Input placeholder="Please enter" v-bind="slotProps" />
    </template>
  </Form>
</template>
