---
type: note
status: draft
created: 2026-07-30
tags: [ops, tools]
---

# Tooling Stack

What the business runs on. Fill in as decisions are made, with the monthly cost, because these accumulate quietly.

## In use

| Purpose | Tool | Cost | Note |
|---|---|---|---|
| Knowledge base | Obsidian | free | This vault. See [[Vault Guide]] |
| Design | Figma | | Brand files and product design |
| Brand source | Adobe Illustrator | | `Brand Guidline v.02.ai` |

## To decide

| Purpose | Options to consider | Note |
|---|---|---|
| Vault sync and backup | Obsidian Sync, iCloud, Git | Decide before this vault matters. See below |
| Email and calendar | Google Workspace | The brand deck already shows a Gmail partnership mark |
| Code hosting | GitHub | Private by default |
| Project tracking | Linear, Notion, Asana | Only if the vault plus a task tool is not enough. Do not run two systems that overlap |
| Social scheduling | | Needed once [[Content Engine]] runs a buffer rather than posting live |
| Content storage | | Somewhere for raw footage and screenshots, since capture is continuous |
| Accounting | Local provider with e-invoicing support | E-invoicing compliance matters here, see [[Company Setup]] |
| Analytics | Depends on privacy position | See [[Measurement#Privacy]] |
| Error monitoring | | Required by [[Launch Checklist]] |
| Password and secret management | 1Password or similar | Needed before the second person joins |
| Contracts and signing | | |
| Customer support | | Required before any product has users who depend on it. WhatsApp is likely part of the answer |

## Principles

**Fewer tools.** Every tool is a subscription, a login, a place information hides, and a thing to migrate later. Say no by default.

**One home per kind of information.** Long form thinking lives in this vault. Tasks live in one task tool. Files live in one place. The failure mode is the same decision recorded in three systems, none of them current.

**Own the important data.** This vault is plain markdown in a folder, which means it survives any company changing its pricing or shutting down. Prefer that property wherever it is available.

## Back this vault up

Worth doing today rather than after the first loss. Options, in rough order of preference:

1. **Git repository, private.** Full history, works with any host, and gives you a record of how thinking changed over time
2. **Obsidian Sync.** Paid, encrypted, handles mobile cleanly
3. **iCloud or Drive folder.** Free and easy, but conflict handling is poor and there is no useful history

A vault that only exists in one Downloads folder is one accident away from gone. Also worth moving it out of Downloads, see [[Vault Guide#Where this vault lives]].
