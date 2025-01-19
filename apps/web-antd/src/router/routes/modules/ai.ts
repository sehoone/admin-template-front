import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 3,
      title: $t('page.ai.title'),
    },
    name: 'AI',
    path: '/ai',
    children: [
      {
        name: 'AiDataForm',
        path: '/ai/ai-data-form',
        component: () => import('#/views/ai/ai-data-form.vue'),
        meta: {
          affixTab: false,
          icon: 'lucide:area-chart',
          title: $t('page.ai.aiDataForm'),
        },
      },
    ],
  },
];

export default routes;
