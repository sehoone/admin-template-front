<script lang="ts" setup>
import { Button, message, Space } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

const [BaseForm, formApi] = useVbenForm({
  // Common to all form items, they can be overridden individually within the form.
  commonConfig: {
    // All form items
    componentProps: {
      class: 'w-full',
    },
  },
  // Use tailwindcss grid layout
  // Submit function
  handleSubmit: onSubmit,
  // Vertical layout, label and input are on different lines, the value is vertical
  layout: 'horizontal',
  // Horizontal layout, label and input are on the same line
  schema: [
    {
      // The component needs to be registered in #/adapter.ts and add the type
      component: 'Input',
      // Parameters of the corresponding component
      componentProps: {
        placeholder: 'Please enter username',
      },
      // Field name
      fieldName: 'field1',
      // Label displayed on the interface
      label: 'field1',
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
      fieldName: 'fieldOptions',
      label: 'drop-down selection',
    },
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
});

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}

function handleClick(
  action:
    | 'batchAddSchema'
    | 'batchDeleteSchema'
    | 'disabled'
    | 'hiddenAction'
    | 'hiddenResetButton'
    | 'hiddenSubmitButton'
    | 'labelWidth'
    | 'resetDisabled'
    | 'resetLabelWidth'
    | 'showAction'
    | 'showResetButton'
    | 'showSubmitButton'
    | 'updateActionAlign'
    | 'updateResetButton'
    | 'updateSchema'
    | 'updateSubmitButton',
) {
  switch (action) {
    case 'batchAddSchema': {
      formApi.setState((prev) => {
        const currentSchema = prev?.schema ?? [];
        const newSchema = [];
        for (let i = 0; i < 2; i++) {
          newSchema.push({
            component: 'Input',
            componentProps: {
              placeholder: 'Please enter',
            },
            fieldName: `field${i}${Date.now()}`,
            label: `field+`,
          });
        }
        return {
          schema: [...currentSchema, ...newSchema],
        };
      });
      break;
    }

    case 'batchDeleteSchema': {
      formApi.setState((prev) => {
        const currentSchema = prev?.schema ?? [];
        return {
          schema: currentSchema.slice(0, -2),
        };
      });
      break;
    }
    case 'disabled': {
      formApi.setState({ commonConfig: { disabled: true } });
      break;
    }
    case 'hiddenAction': {
      formApi.setState({ showDefaultActions: false });
      break;
    }
    case 'hiddenResetButton': {
      formApi.setState({ resetButtonOptions: { show: false } });
      break;
    }
    case 'hiddenSubmitButton': {
      formApi.setState({ submitButtonOptions: { show: false } });
      break;
    }
    case 'labelWidth': {
      formApi.setState({
        commonConfig: {
          labelWidth: 150,
        },
      });
      break;
    }
    case 'resetDisabled': {
      formApi.setState({ commonConfig: { disabled: false } });
      break;
    }
    case 'resetLabelWidth': {
      formApi.setState({
        commonConfig: {
          labelWidth: 100,
        },
      });
      break;
    }
    case 'showAction': {
      formApi.setState({ showDefaultActions: true });
      break;
    }
    case 'showResetButton': {
      formApi.setState({ resetButtonOptions: { show: true } });
      break;
    }
    case 'showSubmitButton': {
      formApi.setState({ submitButtonOptions: { show: true } });
      break;
    }
    case 'updateActionAlign': {
      formApi.setState({
        // You can adjust the class yourself
        actionWrapperClass: 'text-center',
      });
      break;
    }
    case 'updateResetButton': {
      formApi.setState({
        resetButtonOptions: { disabled: true },
      });
      break;
    }
    case 'updateSchema': {
      formApi.updateSchema([
        {
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
              {
                label: 'Option 3',
                value: '3',
              },
            ],
          },
          fieldName: 'fieldOptions',
        },
      ]);
      message.success(
        'Field `fieldOptions` drop-down options updated successfully.',
      );
      break;
    }
    case 'updateSubmitButton': {
      formApi.setState({
        submitButtonOptions: { loading: true },
      });
      break;
    }
  }
}
</script>

<template>
  <div>
    <Space class="mb-5 flex-wrap">
      <Button @click="handleClick('updateSchema')">updateSchema</Button>
      <Button @click="handleClick('labelWidth')">Change labelWidth</Button>
      <Button @click="handleClick('resetLabelWidth')">Reset labelWidth</Button>
      <Button @click="handleClick('disabled')">Disable form</Button>
      <Button @click="handleClick('resetDisabled')">Undisabled</Button>
      <Button @click="handleClick('hiddenAction')">Hide action button</Button>
      <Button @click="handleClick('showAction')">Show action button</Button>
      <Button @click="handleClick('hiddenResetButton')">
        Hide reset button
      </Button>
      <Button @click="handleClick('showResetButton')">Show reset button</Button>
      <Button @click="handleClick('hiddenSubmitButton')">
        Hide submit button
      </Button>
      <Button @click="handleClick('showSubmitButton')">
        Show submit button
      </Button>
      <Button @click="handleClick('updateResetButton')">
        Modify reset button
      </Button>
      <Button @click="handleClick('updateSubmitButton')">
        Modify submit button
      </Button>
      <Button @click="handleClick('updateActionAlign')">
        Adjust operation button position
      </Button>
      <Button @click="handleClick('batchAddSchema')">
        Batch add form items
      </Button>
      <Button @click="handleClick('batchDeleteSchema')">
        Delete form items in batches
      </Button>
    </Space>
    <BaseForm />
  </div>
</template>
