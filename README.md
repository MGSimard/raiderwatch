![RAIDER.WATCH](https://raw.githubusercontent.com/MGSimard/raiderwatch/refs/heads/master/public/metadata/og-img.jpg)

# [Raider.Watch](https://raiderwatch.netlify.app)

Report and track cheating, exploiting, and griefing in ARC Raiders.

## Why?

- Feeling rusty with PostgreSQL & Drizzle ORM (Relations V2)
- Better Auth implementation sucks less
- ARC Raiders' button shimmer outline effect is kinda dope

## TASK LIST

- T3Env
- Restyle toast notifications
- Fix shadcn's dogshit dialog not having vert scroll
- Replace explicit drizzle-adapter package once it releases to live
  - https://github.com/better-auth/better-auth/issues/6766
  - https://github.com/better-auth/better-auth/pull/6913
- Consider ISR + Caching - generate pages on validated report, "no reports" on non-matching pages, saving DB trip? - [https://tanstack.com/start/latest/docs/framework/react/guide/isr](https://tanstack.com/start/latest/docs/framework/react/guide/isr)
- ISR, SSR, Static setups
- Admin panel's internal Team & Audit Logs (maybe)
- Rate-limiting solution
