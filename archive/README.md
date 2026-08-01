# Archive

Content that has been pulled from the live site but is worth keeping. Nothing in
this folder is compiled or shipped: `archive` is listed in `tsconfig.json`'s
`exclude`, and it sits outside `app/`, so Next never routes or bundles it.

## Insights and Newsletter issues (archived 2026-08-01)

The site now publishes **Playbooks only**. Insights and the back catalogue of
newsletter issues were retired; the newsletter *signup* remains live at
`/newsletter`.

| File | What it holds |
| --- | --- |
| `content/insights.ts` | 43 Insight articles, full rich-text bodies and FAQs, plus the derived `insightCategories` list (6 categories) |
| `content/newsletters.ts` | 12 newsletter issues, full rich-text bodies |
| `content/types.ts` | Standalone copies of the types those two files need |

The presentation code that rendered them was deleted rather than archived, since
it is short and reconstructable. To retrieve it, look at commit `b8c0b3f` (the
last commit before the archive) for:

- `app/insights/page.tsx`, `app/insights/[slug]/page.tsx`
- `app/newsletter/[slug]/page.tsx`
- `components/sections/InsightsList.tsx`, `components/sections/NewsletterList.tsx`
- `components/PaginatedCardGrid.tsx`

`/insights`, `/insights/*` and `/newsletter/*` are 301-redirected in
`next.config.ts` so previously indexed URLs do not 404.

### To restore

1. Move the wanted file back to `lib/content/`, repointing its type import at
   `./shared` (re-adding the removed `Insight` / `NewsletterIssue` types there).
2. Re-export it from `lib/content/index.ts`.
3. Recreate the routes and list components from the commit above.
4. Add the routes back to `app/sitemap.ts` and drop the matching redirect.
