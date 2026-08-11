---
type: reference
created: 2026-07-30
tags: [meta]
---

# Conventions

## Frontmatter

Every note has at minimum:

```yaml
---
type: note
created: 2026-07-30
tags: [company]
---
```

Notes tracking something add `status`, and where relevant `stage`, `owner`, `id`.

## Types

| Type | Used for |
|---|---|
| `moc` | Map of content. The front door to a folder |
| `note` | General note |
| `reference` | Lookup material. Values, specs, conventions |
| `playbook` | How we do something |
| `venture` | A product of ours |
| `client` | A client relationship |
| `teardown` | Analysis of someone else's product |
| `decision` | A recorded decision |
| `daily` | Daily note |
| `person` | A person |
| `log` | An append only record |

## Status

`idea`, `draft`, `open`, `active`, `paused`, `done`, `killed`, `unverified`

`unverified` matters. It marks a note containing assumptions that have not been checked, so nobody quotes it in a proposal by accident. [[Saudi Market Notes]] and [[Company Setup]] both carry it.

## Tags

Kept deliberately few. Tags say what kind of thing a note is, links say what it relates to. Links do the real work here.

`moc` `company` `strategy` `brand` `writing` `venture` `studio` `marketing` `content` `community` `product` `process` `quality` `launch` `metrics` `ai` `localization` `research` `market` `ops` `legal` `money` `tools` `people` `hiring` `journal` `decision` `daily` `offering` `reference` `meta`

Before inventing a tag, check whether a link would be better. It usually would.

## Naming

- Sentence case titles. `Brand Colour & Type`, not `brand-colour-and-type`
- Ventures `V-001 Name`. Sequential, never reused, even after something is killed
- Daily notes `YYYY-MM-DD`
- Map notes match their folder name, so `05 Playbooks` contains `Playbooks`
- No dates in titles except daily notes. Dates live in frontmatter

## Writing style

Notes follow [[Brand Voice]]. Specifically:

- Short sentences
- No em dashes or en dashes, straight quotes only
- Say the thing rather than describing that you are about to say it
- Assumptions marked as assumptions. Distinguish what is known from what is guessed, always
- Open questions written as open questions, not hidden inside prose

## Links

- Link the first meaningful mention of a concept, then stop. Linking every occurrence makes notes unreadable
- Link to a heading when the specific section is the point: `[[Business Lines#Capacity rule]]`
- Links to notes that do not exist are fine, and are a to do list the graph shows you

## What does not belong here

- Tasks with due dates. This vault is for thinking, not tracking
- Credentials, secrets or API keys. Ever. That is what a password manager is for
- Client confidential material without checking the NDA first
- Large binaries. Attachments go in `99 Meta/Attachments`, and anything over a few megabytes probably belongs in cloud storage with a link
