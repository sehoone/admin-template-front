---
outline: deep
---

# Lite version

Starting from `5.0` version, we no longer provide streamlined repositories or branches. Our goal is to provide a more consistent development experience while reducing maintenance costs. Here, we will introduce our project, how to streamline and remove unnecessary functions.

## Application Streamline

First, confirm the `UI` component library version you need, and then delete the corresponding application. For example, if you choose to use `Ant ​​Design Vue`, then you can delete other applications. You only need to delete the following two folders:

```bash
apps/web-ele
apps/web-naive

```

::: tip

If the project does not have the `UI` component library application you need built-in, you can directly delete all other applications. Then you can create a new application yourself.

:::

## Demo code streamlining

If you don't need the demo code, you can delete the `playground` folder directly.

## Document simplification

If you don't need the documentation, you can just delete the `docs` folder.

## Mock service streamlining

If you don't need the `Mock` service, you can delete the `apps/backend-mock` folder directly. At the same time, delete the `VITE_NITRO_MOCK` variable in the `.env.development` file under your application.

```bash
# Whether to enable Nitro Mock service, true means open, false means closed
VITE_NITRO_MOCK=false
```

## Install dependencies

At this point, you have completed the streamlining operation. Next, you can install dependencies and start your project:

```bash
# Execute in the root directory
pnpm install

```

## Command adjustment

After streamlining, you may need to adjust the commands according to your project. In the `package.json` file in the root directory, you can adjust the `scripts` field to remove commands you don’t need.

```json
{
  "scripts": {
    "build:antd": "pnpm run build --filter=@vben/web-antd",
    "build:docs": "pnpm run build --filter=@vben/docs",
    "build:ele": "pnpm run build --filter=@vben/web-ele",
    "build:naive": "pnpm run build --filter=@vben/web-naive",
    "build:play": "pnpm run build --filter=@vben/playground",
    "dev:antd": "pnpm -F @vben/web-antd run dev",
    "dev:docs": "pnpm -F @vben/docs run dev",
    "dev:ele": "pnpm -F @vben/web-ele run dev",
    "dev:play": "pnpm -F @vben/playground run dev",
    "dev:naive": "pnpm -F @vben/web-naive run dev"
  }
}
```

## other

If you want to further streamline, you can delete files or folders and refer to their functions to determine whether you need them. You don’t need to delete them:

- `.changeset` folder is used to manage version changes
- The `.github` folder is used to store GitHub configuration files
- The `.vscode` folder is used to store VSCode configuration files. If you use another editor, you can delete it.
- The `./scripts/deploy` folder is used to store deployment scripts. If you do not need docker deployment, you can delete it.

## Application Streamline

Once you have identified an application, you can further refine it:

### Delete unnecessary routes and pages

- In your application's `src/router/routes` file, you can delete unnecessary routes. In the `core` folder, if you only need to log in and forget your password, you can delete other routes, such as forgetting your password, registration, etc. After the route is deleted, you can delete the corresponding page file in the `src/views/_core` folder.

- In the application's `src/router/routes` file, you can delete unnecessary routes as needed, such as `demos`, `vben` directories, etc. After the route is deleted, you can delete the corresponding page file in the `src/views` folder.

### Delete unnecessary components

- In the application's `packages/effects/common-ui/src/ui` folder, you can delete unnecessary components, such as `about`, `dashboard` directories, etc. Before deleting, please make sure that these components are not referenced in your routing.