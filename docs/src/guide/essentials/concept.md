# Basic concepts

In the new version, the overall project has been restructured, and now we will introduce some basic concepts so that you can better understand the entire document. Please be sure to read this section carefully.

## Okura

Okura refers to the warehouse of the entire project, including all codes, packages, applications, specifications, documents, configurations, etc., that is, all the contents of the entire `Monorepo` directory.

## Application

An application refers to a complete project. A project can contain multiple applications. These projects can reuse the code, packages, specifications, etc. in the warehouse. Applications are placed in the `apps` directory. Each application is independent and can be run, built, tested, deployed independently, different component libraries can be introduced, and so on.

::: tip

Applications are not limited to front-end applications, but can also be back-end applications, mobile applications, etc. For example, `apps/backend-mock` is a back-end service.

:::

## Bag

A package refers to an independent module, which can be a component, a tool, a library, etc. Packages can be referenced by multiple applications and can also be referenced by other packages. Packages are placed in the `packages` directory.

For these packages, you can think of it as a separate `npm` package and use it in the same way as the `npm` package.

### Package introduction

Import the package in `package.json`:

```json {3}
{
  "dependencies": {
    "@vben/utils": "workspace:*"
  }
}
```

### Package usage

Import the package into your code:

```ts
import { isString } from '@vben/utils';
```

## Alias

In the project, you can see some paths starting with `#`, such as: `#/api`, `#/views`. These paths are aliases for quickly locating to a certain directory. It is not implemented through `vite`'s `alias`, but through `Node.js`'s own [subpath imports](https://nodejs.org/api/packages.html#subpath-imports) principle. Just configure the `imports` field in `package.json`.

```json {3}
{
  "imports": {
    "#/*": "./src/*"
  }
}
```

In order for the IDE to recognize these aliases, we also need to configure them in `tsconfig.json`:

```json {5}
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "#/*": ["src/*"]
    }
  }
}
```

This way, you can use aliases in your code.