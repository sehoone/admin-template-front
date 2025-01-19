<script lang="ts" setup>
import type {
  WorkbenchProjectItem,
  WorkbenchQuickNavItem,
  WorkbenchTodoItem,
  WorkbenchTrendItem,
} from '@vben/common-ui';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  AnalysisChartCard,
  WorkbenchHeader,
  WorkbenchProject,
  WorkbenchQuickNav,
  WorkbenchTodo,
  WorkbenchTrends,
} from '@vben/common-ui';
import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';
import { openWindow } from '@vben/utils';

import AnalyticsVisitsSource from '../analytics/analytics-visits-source.vue';

const userStore = useUserStore();

// This is a sample data. In actual projects, it needs to be adjusted according to the actual situation.
// The url can also be an internal route, which is identified and processed in the navTo method to perform internal jumps.
// For example: url: /dashboard/workspace
const projectItems: WorkbenchProjectItem[] = [
  {
    color: '',
    content: 'Dont wait for opportunities, create them. ',
    date: '2021-04-01',
    group: 'Open source group',
    icon: 'carbon:logo-github',
    title: 'Github',
    url: 'https://github.com',
  },
  {
    color: '#3fb27f',
    content: 'You now determine who you will be in the future. ',
    date: '2021-04-01',
    group: 'algorithm group',
    icon: 'ion:logo-vue',
    title: 'Vue',
    url: 'https://vuejs.org',
  },
  {
    color: '#e18525',
    content: 'No talent is more important than hard work. ',
    date: '2021-04-01',
    group: 'fishing at work',
    icon: 'ion:logo-html5',
    title: 'Html5',
    url: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML',
  },
  {
    color: '#bf0c2c',
    content: 'Passion and desire can overcome all difficulties. ',
    date: '2021-04-01',
    group: 'UI',
    icon: 'ion:logo-angular',
    title: 'Angular',
    url: 'https://angular.io',
  },
  {
    color: '#00d8ff',
    content: 'A healthy body is the cornerstone of achieving your goals. ',
    date: '2021-04-01',
    group: 'Technical Cow',
    icon: 'bx:bxl-react',
    title: 'React',
    url: 'https://reactjs.org',
  },
  {
    color: '#EBD94E',
    content: 'The road is walked, not dreamed up. ',
    date: '2021-04-01',
    group: 'architecture group',
    icon: 'ion:logo-javascript',
    title: 'Js',
    url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript',
  },
];

// Similarly, the url here can also use external links starting with http
const quickNavItems: WorkbenchQuickNavItem[] = [
  {
    color: '#1fdaca',
    icon: 'ion:home-outline',
    title: 'Home',
    url: '/',
  },
  {
    color: '#bf0c2c',
    icon: 'ion:grid-outline',
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    color: '#e18525',
    icon: 'ion:layers-outline',
    title: 'Component',
    url: '/demos/features/icons',
  },
  {
    color: '#3fb27f',
    icon: 'ion:settings-outline',
    title: 'System Management',
    url: '/demos/features/login-expired', // The URL here is an example and needs to be adjusted according to the actual situation in actual projects.
  },
  {
    color: '#4daf1bc9',
    icon: 'ion:key-outline',
    title: 'Permission Management',
    url: '/demos/access/page-control',
  },
  {
    color: '#00d8ff',
    icon: 'ion:bar-chart-outline',
    title: 'Chart',
    url: '/analytics',
  },
];

const todoItems = ref<WorkbenchTodoItem[]>([
  {
    completed: false,
    content: `Review the front-end code recently submitted to the Git repository to ensure code quality and specifications. `,
    date: '2024-07-30 11:00:00',
    title: 'Review front-end code submission',
  },
  {
    completed: true,
    content: `Check and optimize system performance and reduce CPU usage. `,
    date: '2024-07-30 11:00:00',
    title: 'System performance optimization',
  },
  {
    completed: false,
    content: `Perform system security checks to ensure there are no security holes or unauthorized access. `,
    date: '2024-07-30 11:00:00',
    title: 'Security Check',
  },
  {
    completed: false,
    content: `Update all npm dependency packages in the project to ensure that the latest versions are used. `,
    date: '2024-07-30 11:00:00',
    title: 'Update project dependencies',
  },
  {
    completed: false,
    content: `Fix the page UI display issues reported by users to ensure consistent display in different browsers. `,
    date: '2024-07-30 11:00:00',
    title: 'Fix UI display problem',
  },
]);
const trendItems: WorkbenchTrendItem[] = [
  {
    avatar: 'svg:avatar-1',
    content: `Created project <a>Vue</a> in <a>Open Source Group</a>`,
    date: 'just',
    title: 'William',
  },
  {
    avatar: 'svg:avatar-2',
    content: `Following <a>William</a> `,
    date: '1 hour ago',
    title: 'Aiwen',
  },
  {
    avatar: 'svg:avatar-3',
    content: `Published <a>Personal News</a> `,
    date: '1 day ago',
    title: 'Chris',
  },
  {
    avatar: 'svg:avatar-4',
    content: `Publish article <a>How to write a Vite plug-in</a> `,
    date: '2 days ago',
    title: 'Vben',
  },
  {
    avatar: 'svg:avatar-1',
    content: `Reply to <a>Jack</a>'s question <a>How to optimize the project? </a>`,
    date: '3 days ago',
    title: 'Pete',
  },
  {
    avatar: 'svg:avatar-2',
    content: `Close the question <a>How to run the project</a> `,
    date: '1 week ago',
    title: 'Jack',
  },
  {
    avatar: 'svg:avatar-3',
    content: `Published <a>Personal News</a> `,
    date: '1 week ago',
    title: 'William',
  },
  {
    avatar: 'svg:avatar-4',
    content: `Pushed the code to <a>Github</a>`,
    date: '2021-04-01 20:00',
    title: 'William',
  },
  {
    avatar: 'svg:avatar-4',
    content: `Publish article <a>How to write and use Admin Vben</a> `,
    date: '2021-03-01 20:00',
    title: 'Vben',
  },
];

const router = useRouter();

// This is an example method. In actual projects, it needs to be adjusted according to the actual situation.
// This is a sample method, adjust according to the actual project requirements
function navTo(nav: WorkbenchProjectItem | WorkbenchQuickNavItem) {
  if (nav.url?.startsWith('http')) {
    openWindow(nav.url);
    return;
  }
  if (nav.url?.startsWith('/')) {
    router.push(nav.url).catch((error) => {
      console.error('Navigation failed:', error);
    });
  } else {
    console.warn(`Unknown URL for navigation item: ${nav.title} -> ${nav.url}`);
  }
}
</script>

<template>
  <div class="p-5">
    <WorkbenchHeader
      :avatar="userStore.userInfo?.avatar || preferences.app.defaultAvatar"
    >
      <template #title>
        Good morning, {{ userStore.userInfo?.realName }}, let’s start your day’s
        work!
      </template>
      <template #description> Sunny today, 20℃ - 32℃! </template>
    </WorkbenchHeader>

    <div class="mt-5 flex flex-col lg:flex-row">
      <div class="mr-4 w-full lg:w-3/5">
        <WorkbenchProject
          :items="projectItems"
          title="Project"
          @click="navTo"
        />
        <WorkbenchTrends :items="trendItems" class="mt-5" title="Latest News" />
      </div>
      <div class="w-full lg:w-2/5">
        <WorkbenchQuickNav
          :items="quickNavItems"
          class="mt-5 lg:mt-0"
          title="Quick Navigation"
          @click="navTo"
        />
        <WorkbenchTodo :items="todoItems" class="mt-5" title="To-do items" />
        <AnalysisChartCard class="mt-5" title="Visit source">
          <AnalyticsVisitsSource />
        </AnalysisChartCard>
      </div>
    </div>
  </div>
</template>
