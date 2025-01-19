import type { DefaultTheme } from 'vitepress';

import { defineConfig } from 'vitepress';

import { version } from '../../../package.json';

export const zh = defineConfig({
  description: 'Vben Admin & Enterprise Management System Framework',
  lang: 'zh-Hans',
  themeConfig: {
    darkModeSwitchLabel: 'theme',
    darkModeSwitchTitle: 'Switch to dark mode',
    docFooter: {
      next: 'next page',
      prev: 'previous page',
    },
    editLink: {
      pattern:
        'https://github.com/vbenjs/vue-vben-admin/edit/main/docs/src/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      copyright: `Copyright © 2020-${new Date().getFullYear()} Vben`,
      message: 'Released under the MIT license.',
    },
    langMenuLabel: 'Multi-language',
    lastUpdated: {
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
      text: 'Last updated on',
    },
    lightModeSwitchTitle: 'Switch to light mode',
    nav: nav(),

    outline: {
      label: 'Page navigation',
    },
    returnToTopLabel: 'Return to top',

    sidebar: {
      '/commercial/': { base: '/commercial/', items: sidebarCommercial() },
      '/components/': { base: '/components/', items: sidebarComponents() },
      '/guide/': { base: '/guide/', items: sidebarGuide() },
    },
    sidebarMenuLabel: 'menu',
  },
});

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      collapsed: false,
      text: 'Introduction',
      items: [
        {
          link: 'introduction/vben',
          text: 'About Vben Admin',
        },
        {
          link: 'introduction/why',
          text: 'Why choose us?',
        },
        { link: 'introduction/quick-start', text: 'quick-start' },
        { link: 'introduction/thin', text: 'lite version' },
        {
          base: '/',
          link: 'components/introduction',
          text: 'Component Document',
        },
      ],
    },
    {
      text: 'Basics',
      items: [
        { link: 'essentials/concept', text: 'Basic Concept' },
        { link: 'essentials/development', text: 'local development' },
        { link: 'essentials/route', text: 'Routes and menus' },
        { link: 'essentials/settings', text: 'configuration' },
        { link: 'essentials/icons', text: 'icons' },
        { link: 'essentials/styles', text: 'styles' },
        { link: 'essentials/external-module', text: 'external module' },
        { link: 'essentials/build', text: 'Build and deploy' },
        {
          link: 'essentials/server',
          text: 'Server-side interaction and data Mock',
        },
      ],
    },
    {
      text: 'In depth',
      items: [
        { link: 'in-depth/login', text: 'Login' },
        // { link: 'in-depth/layout', text: 'layout' },
        { link: 'in-depth/theme', text: 'theme' },
        { link: 'in-depth/access', text: 'Permissions' },
        { link: 'in-depth/locale', text: 'internationalization' },
        { link: 'in-depth/features', text: 'Common functions' },
        { link: 'in-depth/check-updates', text: 'Check for updates' },
        { link: 'in-depth/loading', text: 'global loading' },
        { link: 'in-depth/ui-framework', text: 'Component library switching' },
      ],
    },
    {
      text: 'Project',
      items: [
        { link: 'project/standard', text: 'standard' },
        { link: 'project/cli', text: 'CLI' },
        { link: 'project/dir', text: 'Directory description' },
        { link: 'project/test', text: 'unit test' },
        { link: 'project/tailwindcss', text: 'Tailwind CSS' },
        { link: 'project/changeset', text: 'Changeset' },
        { link: 'project/vite', text: 'Vite Config' },
      ],
    },
    {
      text: 'other',
      items: [
        { link: 'other/project-update', text: 'project update' },
        { link: 'other/remove-code', text: 'Remove code' },
        { link: 'other/faq', text: 'FAQ' },
      ],
    },
  ];
}

function sidebarCommercial(): DefaultTheme.SidebarItem[] {
  return [
    {
      link: 'community',
      text: 'Communication group',
    },
    {
      link: 'technical-support',
      text: 'technical support',
    },
    {
      link: 'customized',
      text: 'custom development',
    },
  ];
}

function sidebarComponents(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'component',
      items: [
        {
          link: 'introduction',
          text: 'Introduction',
        },
      ],
    },
    {
      collapsed: false,
      text: 'Layout component',
      items: [
        {
          link: 'layout-ui/page',
          text: 'Page page',
        },
      ],
    },
    {
      collapsed: false,
      text: 'Common component',
      items: [
        {
          link: 'common-ui/vben-api-component',
          text: 'ApiComponent Api component wrapper',
        },
        {
          link: 'common-ui/vben-modal',
          text: 'Modal modal box',
        },
        {
          link: 'common-ui/vben-drawer',
          text: 'Drawer drawer',
        },
        {
          link: 'common-ui/vben-form',
          text: 'Form form',
        },
        {
          link: 'common-ui/vben-vxe-table',
          text: 'Vxe Table table',
        },
        {
          link: 'common-ui/vben-count-to-animator',
          text: 'CountToAnimator digital animation',
        },
        {
          link: 'common-ui/vben-ellipsis-text',
          text: 'EllipsisText omit text',
        },
      ],
    },
  ];
}

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      activeMatch: '^/(guide|components)/',
      text: 'document',
      items: [
        {
          activeMatch: '^/guide/',
          link: '/guide/introduction/vben',
          text: 'Guide',
        },
        {
          activeMatch: '^/components/',
          link: '/components/introduction',
          text: 'component',
        },
        {
          text: 'Historical version',
          items: [
            {
              link: 'https://doc.vvbin.cn',
              text: '2.x version documentation',
            },
          ],
        },
      ],
    },
    {
      text: 'Demo',
      items: [
        {
          text: 'Vben Admin',
          items: [
            {
              link: 'https://www.vben.pro',
              text: 'Demo version',
            },
            {
              link: 'https://ant.vben.pro',
              text: 'Ant Design Vue version',
            },
            {
              link: 'https://naive.vben.pro',
              text: 'Naive version',
            },
            {
              link: 'https://ele.vben.pro',
              text: 'Element Plus version',
            },
          ],
        },
        {
          text: 'Other',
          items: [
            {
              link: 'https://vben.vvbin.cn',
              text: 'Vben Admin 2.x',
            },
          ],
        },
      ],
    },
    {
      text: version,
      items: [
        {
          link: 'https://github.com/vbenjs/vue-vben-admin/releases',
          text: 'Update log',
        },
        {
          link: 'https://github.com/orgs/vbenjs/projects/5',
          text: 'Roadmap',
        },
        {
          link: 'https://github.com/vbenjs/vue-vben-admin/blob/main/.github/contributing.md',
          text: 'contribution',
        },
      ],
    },
    {
      link: '/commercial/technical-support',
      text: '🦄Technical Support',
    },
    {
      link: '/sponsor/personal',
      text: '✨ Sponsorship',
    },
    {
      link: '/commercial/community',
      text: '👨‍👦‍👦 communication group',
      // items: [
      // {
      // link: 'https://qun.qq.com/qqweb/qunpro/share?_wv=3&_wwv=128&appChannel=share&inviteCode=22ySzj7pKiw&businessType=9&from=246610&biz=ka&mainSourceId=share&subSourceId=others&jumpsource=shorturl#/pc',
      // text: 'QQ channel',
      // },
      // {
      // link: 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=mjZmlhgVzzUxvdxllB6C1vHpX8O8QRL0&authKey=DBdFb BwERmfaKY95JvRWqLCJIRGJAmKyZbrpzZ41EKDMZ5SR6MfbjOBaaNRN73fr&noverify=0&group_code=4286109',
      // text: 'QQ group',
      // },
      // {
      // link: 'https://discord.gg/VU62jTecad',
      // text: 'Discord',
      // },
      // ],
    },
    // {
    // link: '/friend-links/',
    // text: '🤝 Friendly link',
    // },
  ];
}

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
  root: {
    placeholder: 'Search documents',
    translations: {
      button: {
        buttonAriaLabel: 'Search documents',
        buttonText: 'Search documents',
      },
      modal: {
        errorScreen: {
          helpText: 'You may need to check your network connection',
          titleText: 'Unable to obtain results',
        },
        footer: {
          closeText: 'Close',
          navigateText: 'switch',
          searchByText: 'Search provider',
          selectText: 'select',
        },
        noResultsScreen: {
          noResultsText: 'Unable to find relevant results',
          reportMissingResultsLinkText: 'Click feedback',
          reportMissingResultsText:
            'Do you think this query should have results? ',
          suggestedQueryText: 'You can try query',
        },
        searchBox: {
          cancelButtonAriaLabel: 'Cancel',
          cancelButtonText: 'Cancel',
          resetButtonAriaLabel: 'Clear query conditions',
          resetButtonTitle: 'Clear query conditions',
        },
        startScreen: {
          favoriteSearchesTitle: 'Collection',
          noRecentSearchesText: 'No search history',
          recentSearchesTitle: 'Search history',
          removeFavoriteSearchButtonTitle: 'Remove from favorites',
          removeRecentSearchButtonTitle: 'Remove from search history',
          saveRecentSearchButtonTitle: 'Save to search history',
        },
      },
    },
  },
};
