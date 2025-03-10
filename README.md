# Universal Turborepo Template

This is a clean Turborepo template with empty apps and packages directories,
ready for you to add your own applications and packages.

## Getting Started

Run the following command to use this template:

```sh
# Clone the repository
git clone https://github.com/toy-crane/universal-turbo-template.git my-project
cd my-project

# Install dependencies
yarn install
```

## Project Structure

This Turborepo template provides an empty structure for your monorepo:

### Directory Structure

- `apps/`: Directory for your applications
- `packages/`: Directory for your shared packages

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Adding Your Own Apps and Packages

### Adding a New App

To add a new application to the `apps` directory:

```sh
cd apps
# Create your application using your preferred framework
# For example, with Next.js:
npx create-next-app my-app
```

### Adding a New Package

To add a new shared package to the `packages` directory:

```sh
cd packages
mkdir my-package
cd my-package
# Initialize your package
yarn init -y
```

## Commands

### Build

To build all apps and packages:

```sh
yarn build
```

### Develop

To develop all apps and packages:

```sh
yarn dev
```

### Lint

To lint all apps and packages:

```sh
yarn lint
```

### Format

To format all files:

```sh
yarn format
```

## Remote Caching

Turborepo can use a technique known as
[Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to
share cache artifacts across machines, enabling you to share build caches with
your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need
an account with Vercel. If you don't have an account you can
[create one](https://vercel.com/signup?utm_source=turborepo-examples), then
enter the following commands:

```sh
npx turbo login
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
