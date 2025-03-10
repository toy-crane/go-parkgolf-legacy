# Database (Supabase)

This workspace contains the Supabase configuration for the Dearly project. It
manages database schemas, migrations, edge functions, and authentication
settings.

## Getting Started

### Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) (v2.1.1 or later)
- [Docker](https://www.docker.com/products/docker-desktop/) (for local
  development)
- [Deno](https://deno.land/) (for edge functions)

### Local Development

1. Start the local Supabase services:

```bash
supabase start
```

This will start a local Supabase instance with:

- PostgreSQL database (port 54322)
- REST API (port 54321)
- Studio UI (port 54323)
- Inbucket email testing (port 54324)

2. Access the local Studio UI:
   - URL: http://localhost:54323

### Database Migrations

Create a new migration:

```bash
supabase migration new <migration_name>
```

Apply migrations:

```bash
supabase db reset
```

### Edge Functions

Create a new edge function:

```bash
supabase functions new <function_name>
```

Serve edge functions locally:

```bash
supabase functions serve
```

Deploy edge functions:

```bash
supabase functions deploy <function_name>
```

### Authentication

The authentication settings are configured in `supabase/config.toml`. By
default:

- Signup is enabled
- JWT expiry is set to 3600 seconds (1 hour)
- Site URL is set to http://127.0.0.1:3000

## Project Structure

```
supabase/
├── .temp/              # Temporary files
├── config.toml         # Supabase configuration
├── functions/          # Edge functions (created when you add functions)
├── migrations/         # Database migrations (created when you add migrations)
└── seed.sql            # Seed data (referenced in config.toml)
```

## VS Code Integration

This workspace includes VS Code settings for Supabase development:

- Deno extension for edge functions
- Recommended settings for TypeScript

## Deployment

To link to a remote Supabase project:

```bash
supabase link --project-ref <project-id>
```

To deploy migrations to the remote project:

```bash
supabase db push
```

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli/usage)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
