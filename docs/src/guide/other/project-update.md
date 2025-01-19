# Project updates

## Why can't it be updated like npm plugin?

Because the project is a complete project template, not a plug-in or installation package, it cannot be updated like a plug-in. After you use the code, it will be re-developed according to business needs, and you need to manually merge and upgrade it yourself.

## What do I need to do?

The project is managed using `Monorepo` and some core codes are separated, such as `packages/@core` and `packages/effects`. As long as the business code does not modify this part of the code, then you can directly Pull the latest code and merge it into your branch, simply handling some conflicts. The remaining folders will only undergo some minor adjustments and will not have an impact on the business code.

::: tip recommendation

It is recommended to pay attention to warehouse dynamics, actively merge, and do not accumulate for a long time, otherwise it will cause too many merge conflicts and increase the difficulty of merge.

:::

## Use Git to update code

1. Clone the code

```bash
git clone https://github.com/vbenjs/vue-vben-admin.git
```

2. Add your own company git source address

```bash
# up is the source name, which can be set at will
# gitUrl is the latest open source code
git remote add up gitUrl;
```

3. Submit the code to your company’s git

```bash
# Submit code to your own company
# main is the branch name and needs to be modified according to the situation.
git push up main

# Synchronize company code
# main is the branch name and needs to be modified according to the situation.
git pull up main
```

4. How to synchronize the latest open source code

```bash
git pull origin main
```

::: tip tip

Conflicts may occur when synchronizing code. Just resolve the conflict

:::