---
type: note
created: 2026-07-30
tags: [meta]
---

# Vault Guide

How this vault works. Read once, then get on with it.

## The idea

Long form thinking lives here. Decisions, strategy, product thinking, process. Not tasks, not files, not chat. Those belong in tools built for them, see [[Tooling Stack#Principles]].

Start at [[Home]]. Everything is reachable from there in two clicks.

## Structure

| Folder | Holds |
|---|---|
| `00 Inbox` | Unfiled capture. Emptied weekly |
| `01 Company` | Identity, strategy, brand |
| `02 Ventures` | Our own products |
| `03 Marketing` | Brand, content, channels, audience, community |
| `04 Studio` | Client work and clients |
| `05 Playbooks` | How we work. Standards and checklists |
| `06 Research` | Teardowns and market notes |
| `07 Ops` | Setup, tools, money, hiring |
| `08 People` | Team and network |
| `09 Journal` | Daily notes, weekly reviews, decision log |
| `99 Meta` | Templates, attachments, this guide |

Numbered so they sort. `00` and `99` are the working edges, `01` to `09` mirror the business, and folders `02` to `04` are the three pillars in [[Business Lines]], in priority order.

## Conventions

Full list in [[Conventions]]. The four that matter:

1. **Every note has a type in frontmatter.** `moc`, `note`, `venture`, `client`, `teardown`, `playbook`, `decision`, `daily`, `person`, `reference`
2. **Link generously.** `[[Double brackets]]`. A link to a note that does not exist yet is fine, it marks something worth writing
3. **Each folder has a map note** with the same name as the folder. It is the front door and it stays current
4. **Ventures are `V-001`.** Sequential, never reused, even after one is killed

## Templates

In `99 Meta/Templates`, wired to the core Templates plugin. Insert with the Insert template command.

| Template | For |
|---|---|
| [[Venture]] | A new product idea |
| [[Client]] | A new client, at the first conversation |
| [[Teardown]] | A product worth studying |
| [[Decision]] | An entry for [[Decision Log]] |
| [[Meeting]] | Any meeting worth remembering |
| [[Weekly Review]] | The weekly habit |
| [[Daily Note]] | Applied automatically by the daily note command |
| [[Person]] | Anyone worth remembering |

## The one habit that matters

The [[Weekly Review]]. Twenty minutes, once a week. Empty the inbox, look at the numbers, decide what next week is for.

Vaults do not die from bad structure. They die because nothing was ever filed and everything went stale, so nobody trusted it, so nobody opened it. Twenty minutes a week prevents that.

## Where this vault lives

Currently `~/Downloads/muse/Muse Vault`. Downloads is the wrong home for something that matters, since it is the folder people clear out.

Move it somewhere permanent. An Obsidian vault is just a folder, so moving it is drag and drop, and reopening it from the new location keeps everything intact including links.

Then set up backup. See [[Tooling Stack#Back this vault up]]. Right now this exists in exactly one place.

## Optional plugins

Core Obsidian covers everything here. Two community plugins are worth it later, not now:

- **Dataview**, turns the manual tables in [[Ventures]] and [[Home]] into queries that update themselves. Worth it once there are more than about fifteen ventures and clients
- **Templater**, more capable templates than core. Only if the core ones start feeling limiting

Both add a dependency, and the vault should stay readable as plain text without them. That is deliberate.

## Appearance

The vault ships with a dark theme and the Muse orange accent already set. There is also a CSS snippet at `.obsidian/snippets/muse.css` that applies the maroon and orange palette from [[Brand Colour & Type]] properly. Enable it in Settings, Appearance, CSS snippets, or ignore it. Nothing depends on it.
