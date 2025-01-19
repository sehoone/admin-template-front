# Directory description

The directory is managed using Monorepo, and the project structure is as follows:

```bash
.
├── Dockerfile # Docker image build file
├── README.md # Project description document
├── apps # Project application directory
│ ├── backend-mock # Backend simulation service application
│ ├── web-antd # Front-end application based on Ant Design Vue
│ ├── web-ele # Front-end application based on Element Plus
│ └── web-naive # Front-end application based on Naive UI
├── build-local-docker-image.sh # Local build Docker image script
├── cspell.json # CSpell configuration file
├── docs #Project document directory
├── eslint.config.mjs # ESLint configuration file
├── internal # Internal tool directory
│ ├── lint-configs # Code inspection configuration
│ │ ├── commitlint-config # Commitlint configuration
│ │ ├── eslint-config # ESLint configuration
│ │ ├── prettier-config # Prettier configuration
│ │ └── stylelint-config # Stylelint configuration
│ ├── node-utils # Node.js tools
│ ├── tailwind-config # Tailwind configuration
│ ├── tsconfig # General tsconfig configuration
│ └── vite-config # General Vite configuration
├── package.json # Project dependency configuration
├── packages #Project package directory
│ ├── @core # core package
│ │ ├── base # base package
│ │ │ ├── design # design related
│ │ │ ├── icons # icons
│ │ │ ├── shared # share
│ │ │ └── typings # Type definition
│ │ ├── composables # Composable API
│ │ ├── preferences # Preferences
│ │ └── ui-kit # UI component collection
│ │ ├── layout-ui # Layout UI
│ │ ├── menu-ui # Menu UI
│ │ ├── shadcn-ui # shadcn UI
│ │ └── tabs-ui #Tab page UI
│ ├── constants # constants
│ ├── effects # Side effects related package
│ │ ├── access # access control
│ │ ├── plugins # Third-party large dependent plug-ins
│ │ ├── common-ui # Common UI
│ │ ├── hooks # Combined API
│ │ ├── layouts # layout
│ │ └── request # request
│ ├── icons # icon
│ ├── locales # Internationalization
│ ├── preferences # Preferences
│ ├── stores # Status management
│ ├── styles # style
│ ├── types # Type definition
│ └── utils # tools
├── playground # Demo directory
├── pnpm-lock.yaml # pnpm lock file
├── pnpm-workspace.yaml # pnpm workspace configuration file
├── scripts # Script directory
│ ├── turbo-run # Turbo run script
│ └── vsh # VSH script
├── stylelint.config.mjs # Stylelint configuration file
├── turbo.json # Turbo configuration file
├── vben-admin.code-workspace # VS Code workspace configuration file
└── vitest.config.ts # Vite configuration file
```