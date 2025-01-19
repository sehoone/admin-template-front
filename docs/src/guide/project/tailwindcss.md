#Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) is a practical-first CSS framework for quickly building custom designs.

## Configuration

The project's configuration file is located under `internal/tailwind-config`, where you can modify the configuration of Tailwind CSS.

::: Limitations of tip package using tailwindcss

Currently, the compilation of tailwindcss will be enabled only if the `tailwind.config.mjs` file exists under the corresponding package, otherwise tailwindcss will not be enabled. If you are using a pure SDK package and do not need to use tailwindcss, you do not need to create a `tailwind.config.mjs` file.

:::