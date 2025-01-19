# Frequently Asked Questions #{faq}

::: tip lists some common questions

If you have any questions, you can search here first. If not, you can search or submit your questions in [GitHub Issue](https://github.com/vbenjs/vue-vben-admin/issues). If it is a discussion question, you can [GitHub Discussions](https://github.com/vbenjs/vue-vben-admin/discussions)

:::

## illustrate

If you encounter a problem, you can first look for it from the following aspects:

1. Search the GitHub repository of the corresponding module [issue](https://github.com/vbenjs/vue-vben-admin/issues)
2. Search the question from [google](https://www.google.com)
3. Search questions from [Baidu](https://www.baidu.com)
4. If you cannot find an issue in the list below, you can go to issue to ask [issues](https://github.com/vbenjs/vue-vben-admin/issues)
5. If it is not a question type and needs to be discussed, please go to [discussions](https://github.com/vbenjs/vue-vben-admin/discussions) to discuss

## Dependency issues

Under the `Monorepo` project, you need to develop the habit of executing `pnpm install` every time you `git pull` the code, because new dependency packages are often added, and the project has been configured in `.husky/git-merge` `pnpm install` is executed automatically, but sometimes problems may occur. If it is not executed automatically, it is recommended to execute it manually.

## Regarding cache update issues

The project configuration is cached in `localStorage` by default, so some configurations may not change after the version is updated.

The solution is to modify the `version` version number in `package.json` every time the code is updated. Because the key of localStorage is based on the version number. Therefore, the previous configuration will become invalid if the version is different after the update. Just log in again

## Regarding the problem of modifying the configuration file

When modifying environment files such as `.env` and `vite.config.ts` files, vite will automatically restart the service.

Automatic restart may cause problems, please re-run the project to solve it.

## Error when running locally

Because vite does not convert the code locally, and relatively new syntax such as optional chaining is used in the code. Therefore, local development needs to use a higher version of the browser (`Chrome 90+`) for development.

## The page is blank after page switching

This is caused by the routing switching animation being turned on and the corresponding page component having multiple root nodes. Just add `<div></div>` to the outermost layer of the page.

**Error Example**

```vue
<template>
  <!-- Comments are also counted as nodes -->
  <h1>text h1</h1>
  <h2>text h2</h2>
</template>
```

**Correct example**

```vue
<template>
  <div>
    <h1>text h1</h1>
    <h2>text h2</h2>
  </div>
</template>
```

::: tip tip

- If you want to use multiple root tags, you can disable the route switching animation
- The root annotation node under the template is also counted as a node.

:::

## My code can be developed locally, but not packaged.

At present, it is found that the reasons for this may be as follows, which can be investigated from the following reasons. If there are other possibilities, please feel free to add them.

- The variable ctx is used. ctx itself is not exposed in the instance type. Vue officials also say not to use this attribute. This property is for internal use only.

```ts
import { getCurrentInstance } from 'vue';
getCurrentInstance().ctx.xxxx;
```

## Dependency installation issues

- If the dependency cannot be installed or an error is reported at startup, you can try executing `pnpm run reinstall`.
- If the dependencies cannot be installed or an error is reported, you can try to switch to the mobile phone hotspot to install the dependencies.
- If it still doesn't work, you can configure the domestic mirror installation yourself.
- You can also create a `.npmrc` file in the project root directory with the following content

```bash
# .npmrc
registry = https://registry.npmmirror.com/
```

## The package file is too large

- First of all, because the full version references more library files, the package will be larger. You can use the lite version for development

- Secondly, it is recommended to enable gzip. After using it, the volume will be only about 1/3 of the original size. gzip can be enabled directly by the server. If so, the front end does not need to build a `.gz` format file. If the front end builds a `.gz` file, taking nginx as an example, nginx needs to turn on the `gzip_static: on` option.

- When gzip is turned on, `brotli` can also be turned on at the same time, which provides better compression than gzip. Both can coexist

**Notice**

- gzip_static: This module requires nginx to be installed separately. This module is not installed by default nginx.

- Enabling `brotli` also requires nginx to install additional modules

## Run error

If an error similar to the following occurs, please check that the full path of the project (including all parent paths) cannot contain Chinese, Japanese, or Korean characters. Otherwise, path access 404 will occur, causing the following problems

```ts
[vite] Failed to resolve module import "ant-design-vue/dist/antd.css-vben-adminode_modulesant-design-vuedistantd.css". (imported by /@/setup/ant-design-vue/index.ts)
```

## Console routing warning issue

If you see the following warning on the console and the page can be opened normally, you can ignore the warning.

In the future, `vue-router` may provide configuration items to turn off warnings

```ts
[Vue Router warn]: No match found for location with path "xxxx"
```

## Start error reporting

When the following error message appears, please check whether your nodejs version number meets the requirements

```bash
TypeError: str.matchAll is not a function
at Object.extractor (vue-vben-admin-main\node_modules@purge-icons\core\dist\index.js:146:27)
at Extract (vue-vben-admin-main\node_modules@purge-icons\core\dist\index.js:173:54)
```

## nginx deployment

After deploying to `nginx`, the following error may occur:

```bash
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "application/octet-stream". Strict MIME type checking is enforced for module scripts per HTML spec.
```

Solution one:

```bash
http {
    #If there is this configuration, it needs to be commented out
    #include mime.types;

    types {
      application/javascript js mjs;
    }
}
```

Solution two:

Enter the `mime.types` file under `nginx` and change `application/javascript js;` to `application/javascript js mjs;`