# Universal Turborepo Template

This is a clean Turborepo template with empty apps and packages directories,
ready for you to add your own applications and packages.

## Using This Template

There are two ways to use this template:

### Option 1: Use as a GitHub Template (Recommended)

1. Click the "Use this template" button at the top of the repository page
2. Name your new repository
3. Clone your new repository locally
4. Run `yarn install` to install dependencies
5. Run `yarn setup` to customize your project name and setup

### Option 2: Clone and Reinitialize

```sh
# Clone the repository
git clone https://github.com/toy-crane/universal-turbo-template.git my-project
cd my-project

# Install dependencies
yarn install

# Run the setup script to customize your project
yarn setup
```

The setup script will:

- Update the project name in all package.json files
- Reinitialize the git repository (optional)
- Set up your project with a clean git history

## Project Structure

This Turborepo template provides an empty structure for your monorepo:

### Directory Structure

- `apps/`: Directory for your applications
- `packages/`: Directory for your shared packages

### Database Setup

This project uses Supabase for database management, authentication, and
serverless functions:

- **Project Name**: When you initialize Supabase, the default project name is
  "database". You should update it to your own project name.
- **Local Development**: Run `cd apps/database && yarn dev` to start the local
  Supabase instance
- **Studio UI**: Access the local Supabase Studio at http://localhost:54323
- **Database Workspace**: Located at `apps/database` with its own README for
  detailed instructions

To modify the database name:

1. Edit `apps/database/supabase/config.toml`
2. Change the `project_id` value from the default "database" to your preferred
   name
3. Restart the Supabase instance if it's running

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

### Using the Database Workspace

The project includes a Supabase database workspace at `apps/database`. When
initializing Supabase, the default project name is "database" - you should
change this to your own project name (we used "dearly" in this example). To use
Supabase in your applications:

```sh
# Start the local Supabase instance
cd apps/database
yarn dev

# In your application, install the Supabase client
cd apps/your-app
yarn add @supabase/supabase-js
```

Then in your application code:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "http://localhost:54321",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
);
```

For more details, refer to the README in the `apps/database` directory.

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

### Database

To work with the Supabase database:

```sh
# Start the local Supabase instance
cd apps/database
yarn dev

# Stop the local Supabase instance
cd apps/database
yarn stop

# Check the status of Supabase services
cd apps/database
yarn status

# Open the Supabase Studio UI
cd apps/database
yarn studio
```

Note: When initializing Supabase, remember to change the default project name
"database" in `apps/database/supabase/config.toml` to your own project name.

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
