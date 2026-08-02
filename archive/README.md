# Archive

Content that has been pulled from the live site but is worth keeping. Nothing in
this folder is compiled or shipped: `archive` is listed in `tsconfig.json`'s
`exclude`, and it sits outside `app/`, so Next never routes or bundles it.

## Insights and Newsletter issues (archived 2026-08-01)

Insights and the back catalogue of newsletter issues were retired; the
newsletter *signup* remains live at `/newsletter`.

| File | What it holds |
| --- | --- |
| `content/insights.ts` | 43 Insight articles, full rich-text bodies and FAQs, plus the derived `insightCategories` list (6 categories) |
| `content/newsletters.ts` | 12 newsletter issues, full rich-text bodies |
| `content/types.ts` | Standalone copies of the types the archived data needs |

The presentation code that rendered them was deleted rather than archived, since
it is short and reconstructable. To retrieve it, look at commit `b8c0b3f` (the
last commit before the archive) for:

- `app/insights/page.tsx`, `app/insights/[slug]/page.tsx`
- `app/newsletter/[slug]/page.tsx`
- `components/sections/InsightsList.tsx`, `components/sections/NewsletterList.tsx`
- `components/PaginatedCardGrid.tsx`

## Playbooks (archived 2026-08-01, same day)

**The site now publishes no article section at all.** The 28 playbooks were
audited against `Muse Vault/01 Company/Website Voice.md` and none survived.

They were fabricated case studies. 26 of 28 open on an invented client ("One
rapidly growing SaaS company", "A multinational industrial manufacturer
operating eighteen production facilities across four countries"), 14 of 28 put
an invented metric in the title or excerpt ("Reduced Response Time by 85%",
"Serving Over 12 Million Citizens"), and all 28 carry the same publication date,
which is a publishing history the company does not have. Website Voice blocks
client results outright — there is no delivered client work yet — and names this
failure mode directly: "the same failure as a fake chart, just harder to spot."
`CaseStudies` and `Testimonials` were deleted the same day for the same reason.

Archived rather than deleted because the prose itself is real written work, and
because the decision is reversible if the articles are ever rewritten as genuine
guides with no client and no invented number.

| File | What it holds |
| --- | --- |
| `content/playbooks.ts` | 28 Playbook articles, full rich-text bodies and FAQs |

Deleted with them, recoverable from commit `8779c50`:

- `app/[locale]/playbooks/page.tsx`, `app/[locale]/playbooks/[slug]/page.tsx`
- `components/sections/PlaybooksList.tsx`, `LatestPlaybooks.tsx`
- `components/sections/ArticleDetail.tsx`, `ArticleFAQ.tsx`, `RelatedContent.tsx`, `RichContent.tsx`
- `components/Pagination.tsx`, `lib/dates.ts`

Also removed: the `Playbook` / `PlaybookSummary` / `ContentBlock` / `Faq` /
`FeaturedImage` / `ContentCategory` types from `lib/content/shared.ts` (copies
live in `content/types.ts`), the `getPlaybooks` accessors from
`lib/content/index.ts`, the `Playbooks` and `Article` message namespaces, and
the nav, footer, homepage and sitemap entries.

Four photos in `public/photos` are now referenced only by the archived data and
are kept for a restore: `cover-neon-city.jpg`, `cover-red-light-figure.jpg`,
`cover-orange-blur.jpg`, `hero-silhouette-sunset.jpg`.

## StaggeredMenu, the previous nav (archived 2026-08-01)

`components/StaggeredMenu.tsx` → `archive/components/StaggeredMenu.tsx`.

Replaced by `components/SiteHeader.tsx`, a port of the "minimal" landing
template's header: a centred pill that widens on scroll and expands into a
three-card grid, retoned for a dark page. Archived rather than deleted at
Abdullah's request, because the decision is a look, not a defect — the
component works.

It is a React Bits component ported to TypeScript, 619 lines, and it carries
work that is not obvious from the outside and would be expensive to redo:

- GSAP open/close choreography with layered colour panels and per-item
  stagger, all driven off one `position: 'left' | 'right'` prop, which is what
  made it mirror into Arabic for the cost of a ternary in the layout
- Its chrome strings are a `labels` prop rather than hardcoded English (a
  deviation from upstream), so it stays presentational with no next-intl
  coupling
- Item numbering, the socials column, and the click-away/`isFixed` behaviours

To restore it, move the file back to `components/`, then rebuild the props the
layout used to pass. They are in commit `c865f68`, in `app/[locale]/layout.tsx`:
`menuItems` built from a `NAV_ROUTES` table joined against `Nav.items`, and
`socialItems` built from `allSocials` with `Common.socials.*` accessible names.

Two message keys it needed were dropped from `messages/*.json` at the same
time and would have to come back: `Nav.socialsHeading` (a visually hidden
heading over its socials list) and `Nav.empty` (its "no items" fallback). The
new header has neither. `Nav.menuLabel` and `Nav.groups.*` are new and belong
to the replacement.

## Redirects

`/insights`, `/insights/*`, `/playbooks`, `/playbooks/*` and their `/ar` and
`/en` forms all 301 to `/explore`; `/newsletter/*` goes to `/newsletter`. The
Insights redirects used to point at `/playbooks` and were repointed when the
playbooks went, so nothing chains through a dead URL.

### To restore

1. Move the wanted file back to `lib/content/`, repointing its type import at
   `./shared` and re-adding the types it needs there (`Insight`,
   `NewsletterIssue`, or `Playbook` and the block types it depends on).
2. Add a locale accessor in `lib/content/index.ts` and an `ar/` counterpart.
3. Recreate the routes and components from the commits above.
4. Restore the message namespaces, the nav/footer/sitemap entries, and drop the
   matching redirect.
