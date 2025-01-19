# Local development {#development}

::: tip code acquisition

If you haven't gotten the code yet, you can start reading the documentation at [Quick Start](../introduction/quick-start.md).

:::

## Preparation

For a better development experience, we provide some tool configurations and project descriptions to facilitate your better development.

### Basic knowledge to be mastered

This project requires some basic front-end knowledge. Please make sure to master the basic knowledge of Vue so that you can deal with some common problems. It is recommended to learn the following before development. Understanding and learning this knowledge in advance will be very helpful for project understanding:

- [Vue3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vitejs](https://vitejs.dev/)
- [Pnpm](https://pnpm.io/)
- [Turbo](https://turbo.build/)

### Tool configuration

If the IDE you are using is [vscode](https://code.visualstudio.com/) (recommended), you can install the following tools to improve development efficiency and code formatting:

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue official plug-in (required).
- [Tailwind CSS](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwindcss prompt plugin.
- [CSS Variable Autocomplete](https://marketplace.visualstudio.com/items?itemName=bradlc.vunguyentuan.vscode-css-variables) - Css variable prompt plug-in.
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Iconify icon plug-in
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) - i18n plug-in
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Script code inspection
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - css formatting
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - Word grammar check
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - .env file highlight

## Npm Scripts

npm scripts are common configurations for projects and are used to perform some common tasks, such as starting projects, packaging projects, etc. The following scripts can be found in the `package.json` file in the project root directory.

The execution method is: `pnpm run [script]` or `npm run [script]`.

```json
{
  "scripts": {
    //Build project
    "build": "cross-env NODE_OPTIONS=--max-old-space-size=8192 turbo build",
    //Build the project and analyze it
    "build:analyze": "turbo build:analyze",
    //Build local docker image
    "build:docker": "./build-local-docker-image.sh",
    //Build the web-antd application separately
    "build:antd": "pnpm run build --filter=@vben/web-antd",
    //Build the document separately
    "build:docs": "pnpm run build --filter=@vben/docs",
    //Build the web-ele application separately
    "build:ele": "pnpm run build --filter=@vben/web-ele",
    //Build web-naive application separately
    "build:naive": "pnpm run build --filter=@vben/naive",
    //Build the playground application separately
    "build:play": "pnpm run build --filter=@vben/playground",
    // changeset version management
    "changeset": "pnpm exec changeset",
    // Check various issues with the project
    "check": "pnpm run check:circular && pnpm run check:dep && pnpm run check:type && pnpm check:cspell",
    // Check for circular references
    "check:circular": "vsh check-circular",
    //check spelling
    "check:cspell": "cspell lint **/*.ts **/README.md .changeset/*.md --no-progress"
    // Check dependencies
    "check:dep": "vsh check-dep",
    // check type
    "check:type": "turbo run typecheck",
    // Clean up the project (delete node_modules, dist, .turbo) and other directories
    "clean": "node ./scripts/clean.mjs",
    //Submit code
    "commit": "czg",
    // Start the project (the dev script of all packages in the entire warehouse will be run by default)
    "dev": "turbo-run dev",
    // Start the web-antd application
    "dev:antd": "pnpm -F @vben/web-antd run dev",
    // start document
    "dev:docs": "pnpm -F @vben/docs run dev",
    //Start the web-ele application
    "dev:ele": "pnpm -F @vben/web-ele run dev",
    // Start the web-naive application
    "dev:naive": "pnpm -F @vben/web-naive run dev",
    // Start the demo application
    "dev:play": "pnpm -F @vben/playground run dev",
    //Formatting code
    "format": "vsh lint --format",
    // lint code
    "lint": "vsh lint",
    // After the dependency installation is completed, execute the stub scripts of all packages
    "postinstall": "pnpm -r run stub --if-present",
    //Only allowed to use pnpm
    "preinstall": "npx only-allow pnpm",
    // husky installation
    "prepare": "is-ci || husky",
    // Preview application
    "preview": "turbo-run preview",
    // Package specification check
    "publint": "vsh publint",
    // Delete all node_modules, yarn.lock, package.lock.json, and reinstall dependencies
    "reinstall": "pnpm clean --del-lock && pnpm install",
    //Run vitest unit tests
    "test:unit": "vitest run --dom",
    //Update project dependencies
    "update:deps": " pnpm update --latest --recursive",
    // changeset generates commit set
    "version": "pnpm exec changeset version && pnpm install --no-frozen-lockfile"
  }
}
```

## Run the project locally

If you need to run the document locally and make adjustments, you can execute the following command. After executing this command, you can select the required application for development:

```bash
pnpmdev
```

If you want to run an application directly, you can execute the following command:

Run the `web-antd` application:

```bash
pnpm dev:antd
```

Run the `web-naive` application:

```bash
pnpm dev:naive
```

Run the `web-ele` application:

```bash
pnpm dev:ele
```

Run the `docs` application:

```bash
pnpmdev:docs
```

## Public static resources

Public static resources that need to be used in the project, such as pictures, static HTML, etc., need to be introduced directly through `src="/xxx.png"` during development.

Resources need to be placed in the `public/static` directory of the corresponding project. The imported path is: `src="/static/xxx.png"`.

## DevTools

The project has built-in [Vue DevTools](https://github.com/vuejs/devtools-next) plug-in, which can be used during the development process. It is turned off by default. It can be turned on in `.env.development` and re-run the project:

```bash
VITE_DEVTOOLS=true
```

After it is turned on, a Vue DevTools icon will be displayed at the bottom of the page when the project is running. Click to open DevTools.

![Vue DevTools](/guide/devtools.png)

## Run the document locally

To run the document locally and make adjustments, you can execute the following command:

```bash
pnpmdev:docs
```

## Problem Solving

If you encounter dependency-related problems during use, you can try the following to reinstall the dependencies:

```bash
# Please execute in the project root directory
# This command will delete all node_modules, yarn.lock, and package.lock.json in the entire warehouse
# Then reinstall the dependencies (the installation speed will be significantly slower).
pnpm reinstall
```