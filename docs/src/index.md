---
# https://vitepress.dev/reference/default-theme-home-page
layout:home
sidebar: false

hero:
  name: VbenAdmin
  text: Enterprise management system framework
  tagline: Brand new upgrade, ready to use out of the box, simple and efficient
  image:
    src: https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp
    alt: Vben Admin
  actions:
    - theme: brand
      text: Quick start ->
      link: /guide/introduction/vben
    - theme: alt
      text: Online preview
      link: https://www.vben.pro
    - theme: alt
      text: View on GitHub
      link: https://github.com/vbenjs/vue-vben-admin

features:
  - icon: 🚀
    title: Latest Technology Stack
    details: Based on the latest technology stacks such as Vue3, Pinia, Vue Router, TypeScript, etc.
    link: /guide/introduction/quick-start
    linkText: Quick start
  - icon: 🦄
    title: Rich configuration
    details: Enterprise-level mid-, back-end and front-end solution, providing rich components and templates as well as N combinations of preference settings.
    link: /guide/essentials/settings
    linkText: configuration document
  - icon: 🎨
    title: theme customization
    details: Through simple configuration, various theme switching can be realized to meet personalized needs.
    link: /guide/in-depth/theme
    linkText: theme document
  - icon: 🌐
    title: internationalization
    details: Built-in internationalization solution supports multi-language switching to meet internationalization needs.
    link: /guide/in-depth/locale
    linkText: internationalization document
  - icon: 🔐
    title: Permission management
    details: Built-in permission management solution supports multiple permission control methods to meet various permission requirements.
    link: /guide/in-depth/access
    linkText: permission document
  - title: Vite
    icon:
      src: /logos/vite.svg
    details: Modern front-end construction tools, fast cold start, instant hot update.
    link: https://vitejs.dev/
    linkText: official site
  - title: Shadcn UI
    icon:
      src: /logos/shadcn-ui.svg
    details: The core is based on Shadcn UI + Tailwindcss, and the business can support any UI framework.
    link: https://www.shadcn-vue.com/
    linkText: official site
  - title: Turbo Repo
    icon:
      src: /logos/turborepo.svg
    details: The normative and standard Okura architecture uses the pnpm + monorepo + turbo engineering management model to provide enterprise-level development specifications.
    link: https://turbo.build/
    linkText: official site
  - title: Nitro Mock Server
    icon:
      src: /logos/nitro.svg
    details: Built-in Nitro Mock service makes your mock service more powerful.
    link: https://nitro.unjs.io/
    linkText: official site
---

<!-- <script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme';

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/28132598?v=4',
    name: 'Vben',
    title: 'Creator',
    desc: 'Vben Admin and related ecological authors are responsible for the overall development of the project. ',
    links: [
      { icon: 'github', link: 'https://github.com/anncwb' },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Introduction to core members
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage> -->

<VbenContributors />