/**
 * Basic components commonly used by common components were originally placed inside adapter/form, which limited the scope of use. They are extracted here to facilitate use in other places.
 * Can be used for vben-form, vben-modal, vben-drawer and other components,
 */

import type { Component, SetupContext } from 'vue';

import type { BaseFormComponentType } from '@vben/common-ui';

import { h } from 'vue';

import { ApiComponent, globalShareState, IconPicker } from '@vben/common-ui';
import { $t } from '@vben/locales';

import {
  AutoComplete,
  Button,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  InputPassword,
  Mentions,
  notification,
  Radio,
  RadioGroup,
  RangePicker,
  Rate,
  Select,
  Space,
  Switch,
  Textarea,
  TimePicker,
  TreeSelect,
  Upload,
} from 'ant-design-vue';

const withDefaultPlaceholder = <T extends Component>(
  component: T,
  type: 'input' | 'select',
) => {
  return (props: any, { attrs, slots }: Omit<SetupContext, 'expose'>) => {
    const placeholder = props?.placeholder || $t(`ui.placeholder.${type}`);
    return h(component, { ...props, ...attrs, placeholder }, slots);
  };
};

// Here you need to adapt according to the business component library. The components that need to be used need to be typed here.
export type ComponentType =
  | 'ApiSelect'
  | 'ApiTreeSelect'
  | 'AutoComplete'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'DatePicker'
  | 'DefaultButton'
  | 'Divider'
  | 'IconPicker'
  | 'Input'
  | 'InputNumber'
  | 'InputPassword'
  | 'Mentions'
  | 'PrimaryButton'
  | 'Radio'
  | 'RadioGroup'
  | 'RangePicker'
  | 'Rate'
  | 'Select'
  | 'Space'
  | 'Switch'
  | 'Textarea'
  | 'TimePicker'
  | 'TreeSelect'
  | 'Upload'
  | BaseFormComponentType;

async function initComponentAdapter() {
  const components: Partial<Record<ComponentType, Component>> = {
    // If your component is relatively large, you can use asynchronous loading
    // Button: () =>
    // import('xxx').then((res) => res.Button),
    ApiSelect: (props, { attrs, slots }) => {
      return h(
        ApiComponent,
        {
          placeholder: $t('ui.placeholder.select'),
          ...props,
          ...attrs,
          component: Select,
          loadingSlot: 'suffixIcon',
          visibleEvent: 'onDropdownVisibleChange',
          modelPropName: 'value',
        },
        slots,
      );
    },
    ApiTreeSelect: (props, { attrs, slots }) => {
      return h(
        ApiComponent,
        {
          placeholder: $t('ui.placeholder.select'),
          ...props,
          ...attrs,
          component: TreeSelect,
          fieldNames: { label: 'label', value: 'value', children: 'children' },
          loadingSlot: 'suffixIcon',
          modelPropName: 'value',
          optionsPropName: 'treeData',
          visibleEvent: 'onVisibleChange',
        },
        slots,
      );
    },
    AutoComplete,
    Checkbox,
    CheckboxGroup,
    DatePicker,
    // Customize the default button
    DefaultButton: (props, { attrs, slots }) => {
      return h(Button, { ...props, attrs, type: 'default' }, slots);
    },
    Divider,
    IconPicker: (props, { attrs, slots }) => {
      return h(
        IconPicker,
        { iconSlot: 'addonAfter', inputComponent: Input, ...props, ...attrs },
        slots,
      );
    },
    Input: withDefaultPlaceholder(Input, 'input'),
    InputNumber: withDefaultPlaceholder(InputNumber, 'input'),
    InputPassword: withDefaultPlaceholder(InputPassword, 'input'),
    Mentions: withDefaultPlaceholder(Mentions, 'input'),
    // Customize the main button
    PrimaryButton: (props, { attrs, slots }) => {
      return h(Button, { ...props, attrs, type: 'primary' }, slots);
    },
    Radio,
    RadioGroup,
    RangePicker,
    Rate,
    Select: withDefaultPlaceholder(Select, 'select'),
    Space,
    Switch,
    Textarea: withDefaultPlaceholder(Textarea, 'input'),
    TimePicker,
    TreeSelect: withDefaultPlaceholder(TreeSelect, 'select'),
    Upload,
  };

  // Register the component into the global shared state
  globalShareState.setComponents(components);

  // Define message prompts in global shared state
  globalShareState.defineMessage({
    // Copy success message prompt
    copyPreferencesSuccess: (title, content) => {
      notification.success({
        description: content,
        message: title,
        placement: 'bottomRight',
      });
    },
  });
}

export { initComponentAdapter };
