# Contributing

Thanks for your interest in contributing to the project! Please take a moment to review this document **before submitting a pull request**.

## Pull requests

**Please ask first before starting work on any significant new features.**

It's never a fun experience to have your pull request declined after investing a lot of time and effort into a new feature. To avoid this from happening, we request that contributors create [an issue](https://github.com/VicGUTT/tailwindcss-debug/issues) to first discuss any significant new features.

## Coding standards

Our code formatting rules are defined in [.eslintrc](https://github.com/VicGUTT/tailwindcss-debug/blob/main/.eslintrc.json) and/or [package.json](https://github.com/VicGUTT/tailwindcss-debug/blob/main/package.json). You can check your code against these standards by running:

```sh
npm run lint
```

To automatically fix any style violations in your code, you can run:

```sh
npm run lint -- --fix
```

## Running tests

You can run the test suite using the following commands:

```sh
npm test
```

Please ensure that the tests are passing when submitting a pull request. If you're adding new features, please include tests.
