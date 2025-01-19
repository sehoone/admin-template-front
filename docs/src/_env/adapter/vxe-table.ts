import { h } from 'vue';

import { setupVbenVxeTable, useVbenVxeGrid } from '@vben/plugins/vxe-table';

import { Button, Image } from 'ant-design-vue';

import { useVbenForm } from './form';

if (!import.meta.env.SSR) {
  setupVbenVxeTable({
    configVxeTable: (vxeUI) => {
      vxeUI.setConfig({
        grid: {
          align: 'center',
          border: false,
          columnConfig: {
            resizable: true,
          },

          formConfig: {
            // Globally disable vxe-table form configuration, use formOptions
            enabled: false,
          },
          minHeight: 180,
          proxyConfig: {
            autoLoad: true,
            response: {
              result: 'items',
              total: 'total',
              list: 'items',
            },
            showActiveMsg: true,
            showResponseMsg: false,
          },
          round: true,
          showOverflow: true,
          size: 'small',
        },
      });

      // Table configuration items can be used cellRender: { name: 'CellImage' },
      vxeUI.renderer.add('CellImage', {
        renderTableDefault(_renderOpts, params) {
          const { column, row } = params;
          return h(Image, { src: row[column.field] });
        },
      });

      // Table configuration items can be used cellRender: { name: 'CellLink' },
      vxeUI.renderer.add('CellLink', {
        renderTableDefault(renderOpts) {
          const { props } = renderOpts;
          return h(
            Button,
            { size: 'small', type: 'link' },
            { default: () => props?.text },
          );
        },
      });

      // Here you can extend the global configuration of vxe-table by yourself, such as custom formatting
      // vxeUI.formats.add
    },
    useVbenForm,
  });
}

export { useVbenVxeGrid };

export type * from '@vben/plugins/vxe-table';
