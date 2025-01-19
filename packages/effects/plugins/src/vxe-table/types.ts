import type {
  VxeGridListeners,
  VxeGridPropTypes,
  VxeGridProps as VxeTableGridProps,
  VxeUIExport,
} from 'vxe-table';

import type { Ref } from 'vue';

import type { ClassType, DeepPartial } from '@vben/types';

import type { VbenFormProps } from '@vben-core/form-ui';

import type { VxeGridApi } from './api';

import { useVbenForm } from '@vben-core/form-ui';

export interface VxePaginationInfo {
  currentPage: number;
  pageSize: number;
  total: number;
}

interface ToolbarConfigOptions extends VxeGridPropTypes.ToolbarConfig {
  /** Whether to show the button to toggle the search form */
  search?: boolean;
}

export interface VxeTableGridOptions<T = any> extends VxeTableGridProps<T> {
  /** Toolbar configuration */
  toolbarConfig?: ToolbarConfigOptions;
}

export interface VxeGridProps {
  /**
   * Title
   */
  tableTitle?: string;
  /**
   * Title help
   */
  tableTitleHelp?: string;
  /**
   * Component class
   */
  class?: ClassType;
  /**
   * vxe-grid class
   */
  gridClass?: ClassType;
  /**
   * vxe-grid configuration
   */
  gridOptions?: DeepPartial<VxeTableGridOptions>;
  /**
   * vxe-grid events
   */
  gridEvents?: DeepPartial<VxeGridListeners>;
  /**
   * Form configuration
   */
  formOptions?: VbenFormProps;
  /**
   * Show search form
   */
  showSearchForm?: boolean;
}

export type ExtendedVxeGridApi = VxeGridApi & {
  useStore: <T = NoInfer<VxeGridProps>>(
    selector?: (state: NoInfer<VxeGridProps>) => T,
  ) => Readonly<Ref<T>>;
};

export interface SetupVxeTable {
  configVxeTable: (ui: VxeUIExport) => void;
  useVbenForm: typeof useVbenForm;
}
