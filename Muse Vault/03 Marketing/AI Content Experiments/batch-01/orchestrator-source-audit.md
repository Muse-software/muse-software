# Orchestrator source audit

Checked independently on 2026-08-05 using direct live fetches. This audit overrides unsupported claims in Plan.md.

## Sources independently verified

- [1] Anthropic Claude Opus 5 page, HTTP 200. Verified: launched 2026-07-24, half-price comparison to Fable 5, $5 per million input tokens and $25 per million output tokens, default on Claude Max, vendor benchmark claims.
- [2] TechCrunch GPT-5.6 report, HTTP 200. Verified: Sol, Terra, Luna variants and OpenAI's vendor-reported coding benchmark claims.
- [3] TechCrunch Gemini report, HTTP 200. Verified: Gemini 3.6 Flash, 3.5 Flash-Lite, 3.5 Flash Cyber, and the vendor claim of up to 17 percent lower token usage. It does not make a head-to-head top-spot claim.
- [4] GitHub changelog, HTTP 200. Verified exact worktree sentence: Copilot, Claude, or Codex sessions can start in a Git worktree so each works in an isolated copy of the repository.
- [6] ReasonBENCH arXiv abstract, HTTP 200. Verified exact 77 percent head-to-head win rate and the statement that one observed score can misrank systems.
- [8] LeadDev, HTTP 200. Verified the GitClear-reported 81 percent duplication increase and 70 percent reuse decrease. Keep the vendor conflict visible.
- [9] METR 2025 study, HTTP 200. Verified experienced developers took 19 percent longer with AI and still believed it sped them up by 20 percent.
- [10] METR 2026 update, HTTP 200. Verified selection effects and that the new data is only weak evidence for the size of later speedup.
- [11] Thoughtworks DORA summary, HTTP 200. Verified "AI is an amplifier, not a fix" and "Speed increases, but instability persists."
- [12] Stack Overflow 2025 AI survey, HTTP 200. Verified 66 percent named "AI solutions that are almost right, but not quite" as their biggest frustration.
- [13] TII QIMMA blog, HTTP 200. Verified systematic benchmark quality issues, ArabicMMLU 14,163 total, 436 discarded, 3.1 percent, "Scale does not guarantee best performance," and smaller Arabic-specialised models beating larger multilingual models on specific domains.
- [15] Fanar 2.0 arXiv abstract, HTTP 200. Verified Arabic has about 0.5 percent of web data despite 400 million native speakers. This is a self-reported project paper.

Evidence captures are under `sources/evidence/`.

## Broken ledger URLs and corrected registrations

The original URLs registered as [16] through [21] were broken or wrong. Do not cite those IDs.

- [16] original 9to5Google URL is HTTP 404. The live corrected article is registered as [24].
- [17] original Nextgov URL is HTTP 404. The live corrected article is registered as [25].
- [18] original GCN URL is HTTP 404. The live corrected article is registered as [26].
- [19] original dev.to URL is HTTP 404. The live corrected article is registered as [27].
- [20] original EurekAlert URL is a different article. Do not cite it.
- [21] original TechXplore URL is wrong. The live corrected article is registered as [28].

[28] independently verifies the 2026 confidence-study claims: 1,923 participants, 58 percent agreeing AI "did most of the thinking," lower reported confidence and ownership among that group, and greater confidence among people who modified, challenged, or rejected AI suggestions.

## Required correction for Experiment 4

Use [28] for the current 2026 finding, then deepen the behavioural-economics tension with two verified peer-reviewed landmarks:

- [22] Dietvorst, Simmons, and Massey, "Algorithm aversion: People erroneously avoid algorithms after seeing them err," DOI 10.1037/xge0000033. The abstract states that people lose confidence in algorithmic forecasters more quickly than human forecasters after seeing the same mistake, even when the algorithm performed better.
- [23] Logg, Minson, and Moore, "Algorithm appreciation: People prefer algorithmic to human judgment," DOI 10.1016/j.obhdp.2018.12.005. The abstract reports that lay people adhered more to advice when they believed it came from an algorithm, while experienced forecasters relied less on algorithmic advice.

The fixed citation ledger now includes [22] and [23]. Use those IDs. A strong corrected hook is: "We trust algorithms too much until we see one mistake. Then we trust them too little." The genuine question is where people switch from appreciation to aversion with today's AI tools. Frame both studies as pre-LLM concepts, not direct evidence about current chatbots.

## Required correction for Experiment 1

Do not say all three vendors claim the top spot. [3] supports a speed and efficiency pitch, not a head-to-head win. Use a truthful hook such as: "Three major AI model releases landed in one month. Each gives you a different reason to switch." The useful point remains the same: test models on your task, your language, your latency, and your cost instead of accepting one vendor's chosen benchmark.

## Acceptance rule

If final copy conflicts with this audit, use this audit. Cut unsupported claims rather than preserving the original plan.