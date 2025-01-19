<script lang="ts" setup>
import { h } from 'vue';

import { Page } from '@vben/common-ui';

import { ElButton, ElCard, ElCheckbox, ElMessage } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { getAllMenusApi } from '#/api';

const [Form, formApi] = useVbenForm({
  commonConfig: {
    // All form items
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  // The large screen displays 3 items in one line, the medium screen displays 2 items in one line, and the small screen displays 1 item in one line.
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  handleSubmit: (values) => {
    ElMessage.success(`Form data: ${JSON.stringify(values)}`);
  },
  schema: [
    {
      // The component needs to be registered in #/adapter.ts and add the type
      component: 'ApiSelect',
      // Parameters of the corresponding component
      componentProps: {
        // Convert menu interface to options format
        afterFetch: (data: { name: string; path: string }[]) => {
          return data.map((item: any) => ({
            label: item.name,
            value: item.path,
          }));
        },
        // Menu interface
        api: getAllMenusApi,
      },
      // Field name
      fieldName: 'api',
      // Label displayed on the interface
      label: 'ApiSelect',
    },
    {
      component: 'ApiTreeSelect',
      // Parameters of the corresponding component
      componentProps: {
        // Menu interface
        api: getAllMenusApi,
        childrenField: 'children',
        // Convert menu interface to options format
        labelField: 'name',
        valueField: 'path',
      },
      // Field name
      fieldName: 'apiTree',
      // Label displayed on the interface
      label: 'ApiTreeSelect',
    },
    {
      component: 'Input',
      fieldName: 'string',
      label: 'String',
    },
    {
      component: 'InputNumber',
      fieldName: 'number',
      label: 'Number',
    },
    {
      component: 'RadioGroup',
      fieldName: 'radio',
      label: 'Radio',
      componentProps: {
        options: [
          { value: 'A', label: 'A' },
          { value: 'B', label: 'B' },
          { value: 'C', label: 'C' },
          { value: 'D', label: 'D' },
          { value: 'E', label: 'E' },
        ],
      },
    },
    {
      component: 'RadioGroup',
      fieldName: 'radioButton',
      label: 'RadioButton',
      componentProps: {
        isButton: true,
        options: ['A', 'B', 'C', 'D', 'E', 'F'].map((v) => ({
          value: v,
          label: `option${v}`,
        })),
      },
    },
    {
      component: 'CheckboxGroup',
      fieldName: 'checkbox',
      label: 'Checkbox',
      componentProps: {
        options: ['A', 'B', 'C'].map((v) => ({
          value: v,
          label: `Option${v}`,
        })),
      },
    },
    {
      component: 'CheckboxGroup',
      fieldName: 'checkbox1',
      label: 'Checkbox1',
      renderComponentContent: () => {
        return {
          default: () => {
            return ['A', 'B', 'C', 'D'].map((v) =>
              h(ElCheckbox, { label: v, value: v }),
            );
          },
        };
      },
    },
    {
      component: 'CheckboxGroup',
      fieldName: 'checkbotton',
      label: 'CheckBotton',
      componentProps: {
        isButton: true,
        options: [
          { value: 'A', label: 'Option A' },
          { value: 'B', label: 'Option B' },
          { value: 'C', label: 'Option C' },
        ],
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'date',
      label: 'Date',
    },
    {
      component: 'Select',
      fieldName: 'select',
      label: 'Select',
      componentProps: {
        filterable: true,
        options: [
          { value: 'A', label: 'Option A' },
          { value: 'B', label: 'Option B' },
          { value: 'C', label: 'Option C' },
        ],
      },
    },
  ],
});
function setFormValues() {
  formApi.setValues({
    string: 'string',
    number: 123,
    radio: 'B',
    radioButton: 'C',
    checkbox: ['A', 'C'],
    checkbotton: ['B', 'C'],
    checkbox1: ['A', 'B'],
    date: new Date(),
    select: 'B',
  });
}
</script>
<template>
  <Page
    description="We have repackaged CheckboxGroup, RadioGroup, and Select. You can pass in the option attribute array through the options attribute to automatically generate options"
    title="Form Demonstration"
  >
    <ElCard>
      <template #header>
        <div class="flex items-center">
          <span class="flex-auto">Basic form demonstration</span>
          <ElButton type="primary" @click="setFormValues">
            Set form values
          </ElButton>
        </div>
      </template>
      <Form />
    </ElCard>
  </Page>
</template>
