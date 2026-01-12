# RaiderWatch (raider.watch)

ARC Raiders Community Ban List, tracking community-banned cheaters & exploiters. Users submit reports on user profiles, reports are reviewed by admins w/ digital forensics.

## Features

- Player profiles by unique Embark ID identifiers
- Player search by Embark ID, name (Can search partial, shows profiles with existing reports)
- Meilisearch or Typesense
- Player status classification (Clean, Dirty)
- High trust users (Peacemakers), low trust (Bandits)?
- Asset container for video reports
- Admin dashboard

## Requirements

- Database
- SSR or ISR + Caching
- Edge functions for API endpoints
- Frontend
- TypeSafety
- File handling system
- Sanitization, validation etc
- Rate limiting, file size limits

## Stack

- React
- TanStack Start
- TailwindCSS
- Base UI
- Cloudflare Workers
- R2 (Signed URLs)
- PostgreSQL
- Neon
- Drizzle ORM
- Zod
