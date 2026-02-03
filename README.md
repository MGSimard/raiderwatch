![RAIDER.WATCH](https://raw.githubusercontent.com/MGSimard/raiderwatch/refs/heads/master/public/metadata/og-img.jpg)

# [Raider.Watch](https://raiderwatch.netlify.app)

Report and track cheating, exploiting, and griefing in ARC Raiders.

## Why?

- Feeling rusty with PostgreSQL & Drizzle ORM (Relations V2)
- Better Auth implementation sucks less
- ARC Raiders' button shimmer outline effect is kinda dope

## TASK LIST

- Clear out consts loading envs and envs themselves for T3Env (Check latest conventions for TSS)
- Replace field + copy icon under video to just button + text + copy icon
- Finish drawer restyle
- Restyle toast notifications
- Fix shadcn's dogshit dialog not having vert scroll
- After I'm done with ARC Raiders stylization, collapse duplicates into single components (i.e. buttons)
- Replace explicit drizzle-adapter package once it releases to live
- Consider ISR + Caching - generate pages on validated report, "no reports" on non-matching pages, saving DB trip? - [https://tanstack.com/start/latest/docs/framework/react/guide/isr](https://tanstack.com/start/latest/docs/framework/react/guide/isr)
- ISR, SSR, Static setups
- Admin panel's internal Team & Audit Logs (maybe)
- Rate-limiting solution
