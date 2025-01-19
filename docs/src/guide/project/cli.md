---
outline: deep
---

#CLI

In the project, some command line tools are provided for some common operations, and the code is located in `scrips`.

## vsh

Used for some project operations, such as cleaning projects, checking projects, etc.

### Usage

```bash
pnpm vsh [command] [options]
```

### vsh check-circular

Check the entire project for circular references. If there are circular references, the circularly referenced modules will be output on the console.

#### Usage

```bash
pnpm vsh check-circular
```

#### Options

| Options | Description |
| ---------- | ----------------------------------- |
| `--staged` | Only check files in the git staging area, default `false` |

### vsh check-dep

Check the dependencies of the entire project and output `unused dependencies` and `uninstalled dependencies` information on the console

#### Usage

```bash
pnpm vsh check-dep
```

#### Options

| Options | Description |
|---------------- |-------------------------------- ------- |
| `-r,--recursive` | Recursively delete the entire project, default `true` |
| `--del-lock` | Whether to delete the `pnpm-lock.yaml` file, default `true` |

### vsh lint

Perform lint check on the project to check whether the code in the project complies with the specifications.

#### Usage

```bash
pnpm vs lint
```

#### Options

| Options | Description |
| ---------- | ------------------------------- |
| `--format` | Check and try to fix errors, default `false` |

### vsh publint

Perform package specification checking on the `Monorepo` project to check whether the packages in the project comply with the specification.

#### Usage

```bash
pnpm vsh publint
```

#### Options

| Options | Description |
| ---------- | ----------------------- |
| `--check` | Only perform checks, default `false` |

### vsh code-workspace

Generate the `vben-admin.code-workspace` file. Currently, there is no need to execute it manually. It will be executed automatically when the code is submitted.

#### Usage

```bash
pnpm vsh code-workspace
```

#### Options

| Options | Description |
| --------------- | ---------------------------------- ----- |
| `--auto-commit` | When `git commit`, commit automatically, default `false` |
| `--spaces` | Indent format, default `2` indentation |

## turbo-run

Used to quickly execute scripts in warehouses and provide optional interactive selections.

### Usage

```bash
pnpm turbo-run [command]
```

### turbo-run dev

Quickly execute the `dev` command and provide option-based interactive selection.