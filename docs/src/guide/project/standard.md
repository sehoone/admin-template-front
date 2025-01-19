# Norms

::: tip Contribute code

- If you want to contribute code to the project, please make sure your code complies with the project's code specifications.
- If you are using `vscode`, you need to install the following plugins:

  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Script code inspection
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting
  - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - Word grammar check
  - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - css formatting

:::

## Function

Students with basic engineering literacy will pay attention to coding standards, and code style inspection (Code Linting, Lint for short) is an important means to ensure the consistency of code standards.

Following the corresponding coding standards has the following benefits:

- Fewer bugs and error rates
- Efficient development efficiency
- higher readability

## tool

The project's configuration file is located under `internal/lint-configs`, where you can modify various lint configurations.

The following code verification tools are integrated into the project:

- [ESLint](https://eslint.org/) for JavaScript code inspection
- [Stylelint](https://stylelint.io/) for CSS style checking
- [Prettier](https://prettier.io/) for code formatting
- [Commitlint](https://commitlint.js.org/) Specification for checking git commit information
- [Publint](https://publint.dev/) spec for checking npm packages
- [Lint Staged](https://github.com/lint-staged/lint-staged) is used to run code verification before git commit
- [Cspell](https://cspell.org/) for checking spelling errors

## ESLint

ESLint is a code specification and error checking tool that identifies and reports syntax errors in TypeScript code.

### Order

```bash
pnpm eslint.
```

### Configuration

The eslint configuration file is `eslint.config.mjs`, and its core configuration is placed in the `internal/lint-configs/eslint-config` directory and can be modified according to project requirements.

## Stylelint

Stylelint is used to verify the style of the css within the project. Coupled with the editor's automatic repair, it can unify the css style within the project very well.

### Order

```bash
pnpm stylelint "**/*.{vue,css,less.scss}"
```

### Configuration

The Stylelint configuration file is `stylelint.config.mjs`, and its core configuration is placed in the `internal/lint-configs/stylelint-config` directory and can be modified according to project requirements.

## Prettier

Prettier can be used to unify project code style, unified indentation, single and double quotes, trailing commas, etc.

### Order

```bash
pnpm prettier.
```

### Configuration

The Prettier configuration file is `.prettier.mjs`, and its core configuration is placed in the `internal/lint-configs/prettier-config` directory and can be modified according to project requirements.

## CommitLint

In a team, everyone's git commit information is different and varied. Without a mechanism, it is difficult to ensure standardization. How can it be standardized? Maybe you are thinking of git's hook mechanism and writing a shell script to implement it. Of course this is possible. In fact, JavaScript has a good tool to implement this template, which is commitlint (used to verify git commit information specifications).

### Configuration

The CommitLint configuration file is `.commitlintrc.mjs`, and its core configuration is placed in the `internal/lint-configs/commitlint-config` directory and can be modified according to project requirements.

### Git submission specifications

Reference [Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)

- `feat` adds new features
- `fix` fix problems/BUG
- `style` is related to code style and does not affect the running results.
- `perf` optimization/performance improvement
- `refactor` refactoring
- `revert` Undo changes
- `test` test related
- `docs` documentation/comments
- `chore` dependency update/scaffolding configuration modification, etc.
- `workflow` workflow improvements
- `ci` continuous integration
- `types` type modification

### Turn off Git commit specification checking

If you want to turn off Git commit specification checking, there are two ways:

::: code-group

```bash [temporary shutdown]
git commit -m 'feat: add home page' --no-verify
```

```bash [permanent shutdown]
# Just comment out the following code in .husky/commit-msg
pnpm exec commitlint --edit "$1" # [!code --]
```

:::

## Publint

Publint is a tool used to check the specifications of npm packages. It can check whether the version number of the package conforms to the specifications, whether it conforms to the standard ESM specification package, etc.

### Order

```bash
pnpm vsh publint
```

## Cspell

Cspell is a tool for checking spelling errors. It can check spelling errors in the code and avoid bugs caused by spelling errors.

### Order

```bash
pnpm cspell lint \"**/*.ts\" \"**/README.md\" \".changeset/*.md\" --no-progress
```

### Configuration

The cspell configuration file is `cspell.json` and can be modified according to project requirements.

## Git Hook

Git hook is generally combined with various lints to perform code style verification when git submits the code. If the verification fails, the submission will not be carried out. The developer needs to modify it and submit it again.

### husky

One problem is that the verification will verify all codes, but we only want to verify the codes submitted by ourselves. At this time, we can use husky.

The most effective solution is to put the Lint verification locally. A common practice is to use husky or pre-commit to do a Lint verification before submitting locally.

The project defines corresponding hooks inside `.husky`

#### How to turn off Husky

If you want to turn off Husky, just delete the `.husky` directory.

### lint-staged

Used to automatically repair submission file style issues, its configuration file is `.lintstagedrc.mjs`, which can be modified according to project requirements.