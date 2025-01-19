---
outline: deep
---

# Quick start {#quick-start}

## Preparation

::: info Environmental requirements

Before starting your project, you need to ensure that your environment meets the following requirements:

- [Node.js](https://nodejs.org/en) 20.15.0 and above, it is recommended to use [fnm](https://github.com/Schniz/fnm) , [nvm](https:/ /github.com/nvm-sh/nvm) or directly use [pnpm](https://pnpm.io/cli/env) for version management.
- [Git](https://git-scm.com/) any version.

Verify that your environment meets the above requirements. You can check the version with the following command:

```bash
# The corresponding node LTS version will appear
node -v
#The corresponding git version will appear
git -v
```

:::

## Start project

### Get source code

::: code-group

```sh [GitHub]
# clone code
git clone https://github.com/vbenjs/vue-vben-admin.git
```

```sh [Gitee]
# clone code
# Gitee's code may not be up to date
git clone https://gitee.com/annsion/vue-vben-admin.git
```

:::

:::danger Attention

Note that the directory where the code is stored and all parent directories cannot contain Chinese, Korean, Japanese, or spaces, otherwise a startup error will occur after installing dependencies.

:::

### Install dependencies

Open a terminal in your code directory and execute the following command:

```bash
# Enter the project directory
cd vue-vben-admin

# Use the pnpm version specified by the project for dependency installation
corepack enable

# Install dependencies
pnpm install
```

::: tip note

- The project only supports using `pnpm` for dependency installation. By default, `corepack` will be used to install the specified version of `pnpm`. :
- If your network environment cannot access the npm source, you can set the system environment variable `COREPACK_NPM_REGISTRY=https://registry.npmmirror.com` and then execute `pnpm install`.
- If you don't want to use `corepack`, you need to disable `corepack` and then install it using your own `pnpm`.

:::

### Run the project

#### Select project

Execute the following command to run the project:

```bash
# Start project
pnpmdev
```

At this point, you will see output similar to the following, select the project you want to run:

```bash
│
◆ Select the app you need to run [dev]:
│ ○ @vben/web-antd
│ ○ @vben/web-ele
│ ○ @vben/web-naive
│ ○ @vben/docs
│ ● @vben/playground
└
```

Now, you can visit `http://localhost:5555` in your browser to view the project.

#### Run the specified project

If you don’t want to select a project, you can directly run the following command to run the application you need:

```bash
pnpm run dev:antd
pnpm run dev:ele
pnpm run dev:naive
pnpm run dev:docs
pnpm run dev:play
```