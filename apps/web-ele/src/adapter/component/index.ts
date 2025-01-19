/**
 * Basic components commonly used by common components were originally placed inside adapter/form, which limited the scope of use. They are extracted here to facilitate use in other places.
 * Can be used for vben-form, vben-modal, vben-drawer and other components,
 */

import type { Component, SetupContext } from 'vue';

import type { BaseFormComponentType } from '@vben/common-ui';
import type { Recordable } from '@vben/types';

import { h } from 'vue';

import { ApiComponent, globalShareState, IconPicker } from '@vben/common-ui';
import { $t } from '@vben/locales';

import {
  ElButton,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElDatePicker,
  ElDivider,
  ElInput,
  ElInputNumber,
  ElNotification,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElSelectV2,
  ElSpace,
  ElSwitch,
  ElTimePicker,
  ElTreeSelect,
  ElUpload,
} from 'element-plus';

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
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'DatePicker'
  | 'Divider'
  | 'IconPicker'
  | 'Input'
  | 'InputNumber'
  | 'RadioGroup'
  | 'Select'
  | 'Space'
  | 'Switch'
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
          component: ElSelectV2,
          loadingSlot: 'loading',
          visibleEvent: 'onVisibleChange',
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
          component: ElTreeSelect,
          props: { label: 'label', children: 'children' },
          nodeKey: 'value',
          loadingSlot: 'loading',
          optionsPropName: 'data',
          visibleEvent: 'onVisibleChange',
        },
        slots,
      );
    },
    Checkbox: ElCheckbox,
    CheckboxGroup: (props, { attrs, slots }) => {
      let defaultSlot;
      if (Reflect.has(slots, 'default')) {
        defaultSlot = slots.default;
      } else {
        const { options, isButton } = attrs;
        if (Array.isArray(options)) {
          defaultSlot = () =>
            options.map((option) =>
              h(isButton ? ElCheckboxButton : ElCheckbox, option),
            );
        }
      }
      return h(
        ElCheckboxGroup,
        { ...props, ...attrs },
        { ...slots, default: defaultSlot },
      );
    },
    // Customize the default button
    DefaultButton: (props, { attrs, slots }) => {
      return h(ElButton, { ...props, attrs, type: 'info' }, slots);
    },
    // Customize the main button
    PrimaryButton: (props, { attrs, slots }) => {
      return h(ElButton, { ...props, attrs, type: 'primary' }, slots);
    },
    Divider: ElDivider,
    IconPicker: (props, { attrs, slots }) => {
      return h(
        IconPicker,
        {
          iconSlot: 'append',
          modelValueProp: 'model-value',
          inputComponent: ElInput,
          ...props,
          ...attrs,
        },
        slots,
      );
    },
    Input: withDefaultPlaceholder(ElInput, 'input'),
    InputNumber: withDefaultPlaceholder(ElInputNumber, 'input'),
    RadioGroup: (props, { attrs, slots }) => {
      let defaultSlot;
      if (Reflect.has(slots, 'default')) {
        defaultSlot = slots.default;
      } else {
        const { options } = attrs;
        if (Array.isArray(options)) {
          defaultSlot = () =>
            options.map((option) =>
              h(attrs.isButton ? ElRadioButton : ElRadio, option),
            );
        }
      }
      return h(
        ElRadioGroup,
        { ...props, ...attrs },
        { ...slots, default: defaultSlot },
      );
    },
    Select: (props, { attrs, slots }) => {
      return h(ElSelectV2, { ...props, attrs }, slots);
    },
    Space: ElSpace,
    Switch: ElSwitch,
    TimePicker: (props, { attrs, slots }) => {
      const { name, id, isRange } = props;
      const extraProps: Recordable<any> = {};
      if (isRange) {
        if (name && !Array.isArray(name)) {
          extraProps.name = [name, `${name}_end`];
        }
        if (id && !Array.isArray(id)) {
          extraProps.id = [id, `${id}_end`];
        }
      }
      return h(
        ElTimePicker,
        {
          ...props,
          ...attrs,
          ...extraProps,
        },
        slots,
      );
    },
    DatePicker: (props, { attrs, slots }) => {
      const { name, id, type } = props;
      const extraProps: Recordable<any> = {};
      if (type && type.includes('range')) {
        if (name && !Array.isArray(name)) {
          extraProps.name = [name, `${name}_end`];
        }
        if (id && !Array.isArray(id)) {
          extraProps.id = [id, `${id}_end`];
        }
      }
      return h(
        ElDatePicker,
        {
          ...props,
          ...attrs,
          ...extraProps,
        },
        slots,
      );
    },
    TreeSelect: withDefaultPlaceholder(ElTreeSelect, 'select'),
    Upload: ElUpload,
  };

  // Register the component into the global shared state
  globalShareState.setComponents(components);

  // Define message prompts in global shared state
  globalShareState.defineMessage({
    // Copy success message prompt
    copyPreferencesSuccess: (title, content) => {
      ElNotification({
        title,
        message: content,
        position: 'bottom-right',
        duration: 0,
        type: 'success',
      });
    },
  });
}

export { initComponentAdapter };
