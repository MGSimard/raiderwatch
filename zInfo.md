# raider.watch - Design Decisions

## URL Structure

**Profile URLs:** `raider.watch/r/username-0000`

- `/r/` prefix avoids collision with other routes (`/about`, `/report`, `/search`, etc.)
- Short, memorable, Reddit-style convention
- "r" can imply "raider" or "report"

---

## Embark ID Handling

**Format:** `username#0000` (username + 4-digit discriminator)

**Storage:** Store original format with `#` in database

**URL Conversion:** Convert `#` to `-` only for URLs (since `#` is reserved for fragments)

```typescript
// Utils - convert at boundary
export const embarkIdToSlug = (id: string) => id.replace(/#(\d{4})$/, "-$1");
export const slugToEmbarkId = (slug: string) => slug.replace(/-(\d{4})$/, "#$1");
```

**Why regex?** Usernames can contain `-`, but discriminator is always 4 digits at the end.

- `cool-guy#1234` → `cool-guy-1234` (URL)
- `cool-guy-1234` → `cool-guy#1234` (DB lookup)

---

## Video Evidence Strategy

**Submission:** Require YouTube/video platform links (not direct uploads)

**Benefits:**

- Zero storage cost for pending/rejected reports
- Built-in spam friction (need platform account)
- Platform handles encoding/streaming/CDN

**On Approval:** Download video with `yt-dlp`, host locally for permanence

```bash
yt-dlp -f "best[height<=720]" "https://youtube.com/watch?v=xxx" -o "evidence/report-id.mp4"
```

**Supported Platforms:** YouTube, Streamable, Medal.tv, Twitch clips

---

## Database Schema

### Tables

1. **admins** - Dashboard authentication only
2. **raiders** - All reported players (profile shown only if ≥1 approved report)
3. **reports** - All submissions linked to raiders

### Report Statuses

| Status     | Meaning                     |
| ---------- | --------------------------- |
| `pending`  | Awaiting review             |
| `approved` | Confirmed, shown on profile |
| `denied`   | Invalid/false report        |

### Schema Design

```typescript
// Raiders - created on first report
raiders: {
  id: uuid (pk),
  embarkId: varchar (unique),  // "username#0000"
  createdAt: timestamp
}

// Reports - always linked to raider
reports: {
  id: uuid (pk),
  raiderId: uuid (fk → raiders),
  reason: enum (cheating, exploiting, toxicity, other),
  description: text,
  videoUrl: varchar,           // Original YouTube link
  videoStoragePath: varchar,   // Local copy (filled on approval)
  status: enum,
  collateralOf: uuid (fk → reports, nullable),
  reporterIp: varchar,
  createdAt: timestamp,
  reviewedAt: timestamp,
  reviewedBy: uuid (fk → admins)
}
```

### Data Flow

```
1. Report submitted
   └── Find or create raider by embarkId
   └── Create report (status: pending)

2. Admin reviews
   ├── Deny → status: denied
   ├── Approve → status: approved, download video, set storagePath
   └── Mark duplicates → status: collateral, set collateralOf

3. Public profile (raider.watch/r/username-0000)
   └── Show only if raider has ≥1 approved report
   └── List approved reports with evidence
```

---

## Page Rendering Logic

```typescript
// Only render profile if raider has approved reports
const raider = await db.query.raiders.findFirst({
  where: eq(raiders.embarkId, slugToEmbarkId(params.embarkId)),
  with: {
    reports: { where: eq(reports.status, "approved") },
  },
});

if (!raider || raider.reports.length === 0) {
  throw notFound();
}
```
