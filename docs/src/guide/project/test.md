# unit test

The project has built-in [Vitest](https://vitest.dev/) as a unit testing tool. Vitest is a Vite-based test runner that provides a simple API for writing test cases.

## Write test cases

In the project, we agree that the test file name will end with `.test.ts` or be stored in the `__tests__` directory. For example, create a `utils.ts` file, and then create a `utils.test.ts` file in the same directory,

```ts
//utils.test.ts
import { expect, test } from 'vitest';
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

## Run the test

Just run the following command in the Okura root directory:

```bash
pnpm test:unit
```

## Existing unit tests

There are already some unit test cases in the project. You can search for files ending with `.test.ts`. When you change to relevant code, you can run unit tests to ensure the correctness of the code. It is recommended to keep the unit test during the development process. Test coverage, and at the same time run unit tests in the CI/CD process to ensure that the tests pass before deploying the project.

Current unit testing situation:

![](/guide/test.png)