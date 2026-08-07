# AI Content Experiments, Batch 01, Plan

Planning-only output for the brief in `planner-brief.md`. It names the slate, the sources behind it, the files to build, the 12 page PDF map, and the checks that gate publishing. It does not create carousels, final copy, or the PDF.

Sources were verified by live web fetch on 2026-08-05 (Riyadh). Pages change and several primary pages refused automated fetch on the day (noted per source). Every claim must be re-fetched and re-quoted from the live page at build time. If a page cannot be fetched or a number cannot be confirmed from it, cut the claim. See sections 7 and 8.

---

## 1. Muse marketing and community strategy, in short

Muse is a Saudi product company that funds itself with client work. Premium in craft, human in how it talks, business first at startup speed. Marketing is a pillar, not a task, because it earns nothing directly and would otherwise never happen. What it is for, in order: inbound client work, a launch audience for ventures, institutional access, and standing for the people here.

How that shapes content:

- Personal founder and team accounts do the heavy lifting. People follow people. The Muse account amplifies and holds the official archive. Nobody is required to post.
- Voice is close to people, not corporate. Show the work instead of describing it. Specific beats impressive. Short sentences. No inflation. Straight quotes only.
- Content pillars: useful craft, free assets, behind the scenes, working in the open, and opinion or market commentary. A healthy batch spans more than one.
- The number that matters is real conversations, then saves and shares, then repeat viewers, then audience composition, then consistency. Followers, likes, impressions, and reach are not success on their own.
- Muse's strongest owned territory is Arabic and RTL product quality, done natively rather than translated. Nobody local owns it yet. It is also the topic Muse could speak on at an event with authority.
- English first. Arabic is a later native-writing pass by someone who writes Arabic well, never a machine translation.

The tension the brief names, resolved: the goal is real reach and engagement, and Muse rejects engagement bait, comment pods, fake conflict, reposting others as our own, and empty farming. The resolution is honest, source-backed posts that ask for a real opinion or a useful disagreement. We keep the reach goal and refuse the cheap tactics, because trust is the asset the whole pillar depends on.

One more constraint from the AI Guidelines: Muse uses AI where it changes the outcome and never claims it. So this batch is neither anti-AI nor hype. It is clear-eyed about where AI helps and where it is wrong. A slate that read as uniformly cynical about AI would itself be a brand mismatch.

---

## 2. Selection and rejection criteria

Selection. A candidate had to clear all of these:

- Every claim traces to a real, fetchable, current source with a verbatim excerpt captured from the page.
- It invites a genuine opinion or lived experience, not manufactured conflict.
- It sits in Muse's territory or expertise: design and code craft, AI quality and measurement, Arabic and RTL, product quality.
- Practitioner-first relevance for designers, developers, product people, AI builders, students, and GCC studios.
- Format-ready as a 4 to 5 slide carousel, an X thread, or both.
- Honest register: we can say where the thing is weak, not only where it shines.
- The batch as a whole spans the required mix, with at least 4 experiments tied to material from the last 90 days.

Rejection. Any one of these killed a candidate:

- The source could not be fetched, or a number, quote, or date could not be confirmed from the page.
- Vendor spin presented as fact, or a consequential single-source claim with no independent corroborator.
- It reads as engagement bait, outrage without substance, or a brand advertisement.
- It attacks a named Saudi company, or risks reading that way.
- It needs a banned phrase or false certainty to work.
- It reposts someone else's insight as ours.
- Brand mismatch, for example praising the tool this assistant is built on, which reads promotional rather than neutral.

---

## 3. Topic reconnaissance, with source URLs

Master table of verified candidates. In 90 days is measured against the cutoff of 2026-05-07. Full verbatim excerpts and corroborators live per experiment in section 4 and, at build time, in `sources/sources.md`.

| # | Topic | Lead source | Publisher | Date | In 90d | Status |
|---|---|---|---|---|---|---|
| 1 | Three flagship models in one month, dueling claims | anthropic.com/news/claude-opus-5 | Anthropic | 2026-07-24 | yes | Selected |
| 1 | GPT-5.6 Sol/Terra/Luna family | techcrunch.com/2026/07/09/openai-launches-its-new-family-of-models-with-gpt-5-6 | TechCrunch | 2026-07-09 | yes | Selected support |
| 1 | Gemini 3.6 Flash trio, no 3.5 Pro | techcrunch.com/2026/07/21/google-releases-three-new-gemini-models-but-no-3-5-pro | TechCrunch | 2026-07-21 | yes | Selected support |
| 2 | Per-session Git worktrees for AI agents | github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-code-july-2026-releases | GitHub | 2026-07-30 | yes | Selected |
| 2 | Figma Code Layers | figma.com/blog/config-2026-recap | Figma | 2026-06-24 | yes | Bench alternate |
| 3 | ReasonBENCH, reasoning scores unstable across runs | arxiv.org/abs/2512.07795 | arXiv (v2) | 2026-05-30 | yes | Selected |
| 4 | AI reliance lowers confidence and ownership | apa.org/news/press/releases/2026/04/overreliance-ai-undermine-confidence | APA | 2026-04-16 | no, 111d | Selected, flagged older |
| 4 | Algorithm aversion (landmark) | Dietvorst, Simmons, Massey, JEP:General 144(1) 114-126 | APA | 2015 | landmark | Selected anchor |
| 4 | Algorithm appreciation (landmark) | Logg, Minson, Moore, OBHDP 151 90-103 | Elsevier | 2019 | landmark | Selected anchor |
| 5 | AI code maintainability falling | leaddev.com/ai/code-maintainability-plummets-in-the-ai-coding-era | LeadDev | 2026-07-07 | yes | Selected |
| 5 | Devs slower but feel faster (RCT) | metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study | METR | 2025-07-10 | landmark + 2026-02-24 update | Selected anchor |
| 5 | Speed up, instability up | thoughtworks.com/en-us/insights/reports/the-2025-dora-report | DORA/Thoughtworks | 2025 | no | Selected support |
| 5 | 66% frustrated by near-right AI code | survey.stackoverflow.co/2025/ai | Stack Overflow | 2025-12 | no | Selected support |
| 6 | Arabic benchmarks have measurable errors; small native beats large | huggingface.co/blog/tiiuae/qimma-arabic-leaderboard + arxiv.org/abs/2604.03395 | TII | 2026-04-21 / 2026-04-03 | no, 106d | Selected, flagged older |
| 6 | Arabic is about 0.5% of web data | arxiv.org/abs/2603.16397 | QCRI/HBKU | 2026-03-17 | no, 140d | Selected support |

At least 4 experiments (1, 2, 3, 5) rest on a lead source inside the last 90 days. Experiments 4 and 6 use slightly older 2026 material plus landmarks, which is the brief's allowance of one or two older items. This is stated openly rather than hidden.

Rejected or parked, so the execution session does not re-chase them:

- DeepSeek V4, Qwen 4.0 and 3.8, Qwen-Audio-3.0 TTS: only leaks and rumors, no primary source. Do not present as fact.
- OpenAI's own GPT-5.6 page, GitClear's own research page, QCRI's Fanar page, and several Axios pages: returned 403 or 404 to automated fetch. Cite the journalism or the arXiv mirror instead, and retry the primary at build time.
- ALLaM-34B UI-level dialect evaluation (arxiv 2508.17378): outside 90 days, single uncorroborated author, and it critiques a Saudi national model by name. Use only as a no-numbers, no-naming concept ("evaluate the product users touch, not the model card") if at all.
- RTL fix extensions, Transifex "human-level" Arabic, generic RTL blog posts: affiliate or marketing content, no datable primary claim. Usable as color, never as a cited number.
- Claude Code `/fork` and `/subtask`: real, but brand mismatch as a standalone post; keep only as one cross-vendor line inside experiment 2.

---

## 4. The 6 experiment slate

Shared distribution and founder-playbook model, applied to every experiment unless a line below overrides it.

- Who posts first: a named founder or the team member who owns the topic, from a personal account. The Muse account amplifies within a few hours with a one-line framing and keeps the archive.
- Founder first day, before posting: reply usefully to 3 to 5 recent peer posts on the topic, no link drops, so the timeline is warm when the post lands. Do not organise a pod.
- Founder first day, after posting, first 60 to 90 minutes: answer every substantive comment with a fact or a follow-up question, not a thank-you. Deepen the single best comment with a reply. Add nuance, never argue to win.
- Quote-post targets: 1 or 2 credible practitioners who posted on the topic recently, quoted to extend the discussion or add Muse's angle, never to dunk.
- Useful follow-ups: feature a good reader experience with credit, save recurring questions for the next post, and move any DM that surfaces a need toward a real conversation.
- LinkedIn adaptation: same substance, calmer register for buyers and institutions, lead with the practical takeaway and one specific number, keep the question, post a day or two later once the discussion has shaped the angle.

Every draft line below is a starting point for the execution session, not final copy. Numbers stay attached to their source and vendor-reported figures are labelled.

### Experiment 1. Three flagship models in one month, and how to actually pick one

- Premise: in one month three labs shipped flagship models and each cited a benchmark where it wins, so the useful skill is choosing for your own work, not the leaderboard.
- Best format: X carousel or hybrid (X thread plus a 5 slide Instagram carousel).
- Hook: "Three flagship AI models launched in one month. All three say they win."
- Slides:
  1. "Three flagship AI models in one month. All three claim the top spot."
  2. "July 2026: Claude Opus 5, OpenAI GPT-5.6 Sol, Google Gemini 3.6 Flash. Each points at a benchmark where it beats the others."
  3. "The catch: almost every head-to-head number is the vendor's own. Change the benchmark, change the winner."
  4. "So pick for your work: your task, your language including Arabic, your latency and cost, tested on your own examples."
  5. "Which model holds up on your real tasks? Tell us what you route where, and why."
- Question: "Which model actually holds up on your real work, and what do you route where?"
- Caption or opener: "Opus 5, GPT-5.6 and a new Gemini Flash all landed this month, each with a benchmark that crowns it. Here is how we pick without trusting anyone's scoreboard."
- Why it can earn engagement: comments, people name their default model and setup; saves, a reusable model-picking heuristic; shares, teammates arguing over routing; quote posts, people adding their own selection rule.
- Risks: news goes stale fast, so publish within days; do not restate vendor benchmark numbers as fact; keep it neutral so it does not read as an Anthropic or OpenAI ad.
- Distribution and founder specifics: the founder who owns model tooling posts first. Quote-post a credible model-eval account. LinkedIn version leads with the routing checklist for teams.
- Success hypothesis and primary metric: a practical picking guide during a noisy launch month earns saves. Primary metric: saves. Secondary: substantive replies naming real routing choices.
- Sources: Anthropic, 2026-07-24, "comes close to the frontier intelligence of Claude Fable 5 at half the price" and "$5 per million input tokens and $25 per million output tokens" and "the new default model on Claude Max", anthropic.com/news/claude-opus-5, corroborated by 9to5google.com 2026-07-24. TechCrunch, 2026-07-09, "GPT-5.6 comes in three variants: Sol (considered its workhorse), Terra (a more intermediate option), and Luna (its budget-friendly option)", corroborated by nextgov.com 2026-07-08. TechCrunch, 2026-07-21, "Google DeepMind released Gemini 3.6 Flash, 3.5 Flash-Lite, and 3.5 Flash Cyber" and "reducing token usage by up to 17%", corroborated by gcn.com 2026-07-22. All head-to-head benchmark figures are vendor-reported and must be labelled as such. OpenAI's own launch page was 403 on the day; cite TechCrunch and Nextgov and retry the primary at build time.

### Experiment 2. Running several AI coding agents at once without breaking your repo

- Premise: a new, available-now workflow lets each AI coding session run in its own Git worktree, an isolated copy of the repo, which is genuinely useful and has a real downside.
- Best format: X thread (a workflow reads well step by step), with an optional short carousel.
- Hook: "You can now run several AI coding agents at once without them fighting over your repo."
- Slides:
  1. "Running two or three AI agents at once used to mean chaos in one working tree."
  2. "New in GitHub Copilot, July 2026: start a Copilot, Claude, or Codex session in its own Git worktree, an isolated copy of your repository."
  3. "Why it helps: each agent works on its own copy and branch. Nothing touches main until you review and merge."
  4. "Where it bites: you can end up with several half-finished branches to reconcile. Isolation is not the same as done. (Cursor and Claude Code have their own versions of this.)"
  5. "Do you run agents in parallel yet? What is your review-and-merge routine before it turns into branch soup?"
- Question: "How do you keep parallel agents from becoming a pile of half-finished branches?"
- Caption or opener: "Parallel AI coding agents finally have a sane isolation model: one Git worktree per session. Here is why it helps, and where it still bites."
- Why it can earn engagement: comments, people share their parallel-agent setups; saves, a workflow to try on Sunday; shares, sent to a team lead; quote posts, people adding their own merge discipline.
- Risks: plumbing feature, easy to oversell, so keep the honest downside in; very fresh, so frame as early and promising, not proven; keep it cross-vendor so it is not one tool's ad.
- Distribution and founder specifics: the founder who owns engineering posts first, ideally with a short screen clip of the real workflow (behind-the-scenes pillar). Quote-post a respected developer-tools account. LinkedIn version frames it as team throughput with a review gate.
- Success hypothesis and primary metric: a concrete, try-it-now workflow earns saves. Primary metric: saves. Secondary: shares.
- Sources: GitHub changelog, 2026-07-30, "Start Copilot, Claude, or Codex sessions in a Git worktree, so each session can work in an isolated copy of your repository", github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-code-july-2026-releases, corroborated by dev.to/leobaniak 2026-07-31. Bench alternate for a future design-craft post: Figma Code Layers, Figma blog 2026-06-24, "turn any design layer into an interactive code layer with just a single click (or a prompt)", with the repo-clone detail coming from third-party write-ups, not Figma's line, and availability gated to a July 2026 waitlist.

### Experiment 3. Run the same benchmark twice and the winner can change

- Premise: a recent paper shows reasoning-strategy scores are unstable across repeated runs, so a single leaderboard number can silently misrank two close systems.
- Best format: Instagram carousel (a clean visual idea), plus an X post.
- Hook: "Run the same benchmark twice and the winner can change."
- Slides:
  1. "We treat one benchmark score as the answer. It is one sample."
  2. "ReasonBENCH (arXiv, revised May 2026) ran reasoning strategies many times over. The top strategy won only 77% of head-to-head runs against its nearest rival."
  3. "Read carefully: that is a win rate across runs, not an accuracy score. Two close systems can swap places from one run to the next."
  4. "So a single number can misrank them. Run your eval more than once, report a range, and distrust a 0.5-point win."
  5. "Have you seen a model win one day and lose the next on the same test? What do you do about eval variance?"
- Question: "How do you handle it when the same eval ranks models differently on a re-run?"
- Caption or opener: "A single benchmark score feels like the truth. Run it enough times and the ranking wobbles. Here is what a 2026 paper measured, and what it means for how you test."
- Why it can earn engagement: comments, eval-flakiness stories; saves, a testing rule of thumb; shares, sent to whoever picks the team's models; quote posts, people arguing whether leaderboards mean anything.
- Risks: the 77% is a head-to-head win rate and easy to misread as accuracy, so frame it precisely; do not overclaim that all benchmarks are worthless; confirm author affiliations from the PDF before publishing.
- Distribution and founder specifics: the founder who owns AI evaluation posts first. Quote-post an ML-evaluation researcher respectfully. LinkedIn version frames it for teams buying or standardising on a model.
- Success hypothesis and primary metric: a counterintuitive, testable finding earns thoughtful replies from practitioners who run evals. Primary metric: substantive replies. Secondary: quote posts.
- Sources: arXiv 2512.07795, "ReasonBENCH: Benchmarking the (In)Stability of LLM Reasoning", v1 2025-12-08, v2 2026-05-30. Verbatim: "the highest-performing strategy wins only 77% of head-to-head runs against its nearest competitor, meaning a single observed score can silently misrank systems." Corroborated by quantumzeitgeist.com 2025-12-10 (niche outlet); OpenReview forum H7AGATtKDx also exists. Author affiliations were not visible on the abstract page and must be confirmed from the PDF.

### Experiment 4. AI will not make you dumber, but it can make you trust yourself less

- Premise: a 2026 study finds heavy AI reliance lowers confidence and sense of ownership rather than raw ability, and two landmark findings explain why we both over-trust and under-trust machines.
- Best format: Instagram carousel (reflective, human), plus an X post.
- Hook: "AI probably will not make you dumber. It can quietly make you trust yourself less."
- Slides:
  1. "The fear is that AI makes us worse at thinking. The measured effect is stranger."
  2. "A 2026 study (APA, Technology, Mind, and Behavior): 58% of people felt AI did most of the thinking. Those people reported lower confidence in their own reasoning and less ownership of the ideas."
  3. "It cuts both ways. People drop an algorithm fast after one visible mistake (Dietvorst, 2015), yet lean on advice more when it is labelled as from an algorithm (Logg, 2019)."
  4. "The people who kept their confidence were the ones who challenged the output, edited it, pushed back. Passive accept is where ownership leaks out."
  5. "When AI drafts it, does the work still feel like yours? Where do you draw the line?"
- Question: "When AI does the first draft, does the work still feel like yours?"
- Caption or opener: "Interesting result from 2026: heavy AI use did not lower people's ability, it lowered their confidence and their sense that the idea was theirs. Except for the people who argued with the AI."
- Why it can earn engagement: comments, people describe their own relationship with AI drafts; saves, a mental model worth keeping; shares, sent to a teammate over-leaning on AI; quote posts, people adding the active-versus-passive line.
- Risks: self-reported confidence is not measured ability, so do not claim AI lowers intelligence; the title's phrase "executive function attenuation" is stronger than the evidence, so cite the confidence and ownership finding; lead source and landmarks are older than 90 days, which is disclosed.
- Distribution and founder specifics: a founder posts first in a personal, reflective register. Quote-post a design or research voice who writes about craft and AI. LinkedIn version frames it as a team norm: challenge the draft before you ship it.
- Success hypothesis and primary metric: a reflective, non-hype take on a fear everyone feels earns real replies. Primary metric: substantive replies. Secondary: saves.
- Sources: APA, 2026-04-16, apa.org/news/press/releases/2026/04/overreliance-ai-undermine-confidence, "58% of the participants agreed that AI 'did most of the thinking'" and "reduced confidence in their own independent reasoning, lesser perceived ownership of ideas", corroborated identically by eurekalert.org and techxplore.com. Landmarks: Dietvorst, Simmons, Massey, 2015, "Algorithm Aversion: People Erroneously Avoid Algorithms After Seeing Them Err", JEP:General 144(1) 114-126 (title is the verifiable anchor; the "lose confidence faster" line is paraphrase unless the PDF is opened). Logg, Minson, Moore, 2019, "Algorithm Appreciation: People Prefer Algorithmic to Human Judgment", OBHDP 151 90-103, abstract line "lay people adhere more to advice when they think it comes from an algorithm than from a person." Both landmarks are pre-LLM and must be framed as concepts, not as evidence about today's tools.

### Experiment 5. AI is helping us ship more code. Maintainability is going the other way

- Premise: Muse's opinion, grounded in evidence and stated fairly: AI raises code volume and speed while eroding the maintainability signals that mark craft, and developers feel faster than they measurably are.
- Best format: X thread (opinion travels on X), with a LinkedIn adaptation.
- Hook: "AI is helping us ship more code, faster. The maintainability is going the other way."
- Slides or thread beats:
  1. "AI is helping us write more code, faster. That part is real. The quality signals are the worry."
  2. "One analysis of 623 million changes (reported by LeadDev, July 2026, from the vendor GitClear): code duplication up 81%, refactoring down 70%. More lines, less reuse."
  3. "And a controlled trial (METR, 2025): experienced developers were about 19% slower with AI, yet believed they were about 20% faster. We are poor judges of our own speed."
  4. "The honest frame: AI is an amplifier, not a fix (DORA, 2025). It rewards strong foundations and punishes weak ones. Volume is not the same as craft."
  5. "Counter-argument, fairly: METR says this does not prove AI slows everyone, its sample was tiny and self-selected, and GitClear sells code tools. So, six months on, is your AI-assisted code easier or harder to maintain?"
- Question: "Six months on, is your AI-assisted code easier or harder to maintain than what you wrote by hand?"
- Caption or opener: "An opinion we can defend, with the counter-argument attached: AI is lifting our output and quietly lowering our maintainability, and we mostly cannot feel it happening."
- Why it can earn engagement: comments, people take a side with their own experience; saves, the sources bundle; shares, sent into team channels; quote posts, this is built to be quote-argued.
- Risks: highest outrage risk in the batch, so the counter-argument must stay in and the tone must not be anti-AI; GitClear has a commercial interest, stated aloud; METR is a narrow sample, stated; never imply a specific company writes bad code.
- Distribution and founder specifics: a founder posts first and stays on to argue in good faith. Quote-post a senior engineer who has written on AI and code quality, to extend not to dunk. LinkedIn version drops the sharp edge, keeps one number and the maintenance question, and speaks to teams and their leads.
- Success hypothesis and primary metric: a fair, evidence-backed opinion with a real counter-argument earns quote posts and debate rather than pile-ons. Primary metric: quote posts. Secondary: substantive replies.
- Sources: LeadDev, 2026-07-07, leaddev.com/ai/code-maintainability-plummets-in-the-ai-coding-era, "Code duplication is up 81%" and "Move (refactor) ... is down 70%" and legacy refactoring "has fallen 74%" (GitClear's own page was 403; quote via LeadDev and label the vendor interest). METR, 2025-07-10, metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study, "take 19% longer to complete issues" and "they still believed AI had sped them up by 20%", plus the 2026-02-24 update metr.org/blog/2026-02-24-uplift-update noting selection bias and a redesign. DORA 2025 via thoughtworks.com/en-us/insights/reports/the-2025-dora-report, "Speed increases, but instability persists" and "AI is an amplifier, not a fix". Stack Overflow 2025 survey.stackoverflow.co/2025/ai, "'AI solutions that are almost right, but not quite'" cited by 66% of developers.

### Experiment 6. The Arabic benchmarks everyone cites have measurable errors

- Premise: a 2026 quality-first Arabic leaderboard found systematic errors in the benchmarks the field relies on, and showed that a small Arabic-first model can beat a much larger multilingual one on real domains. This is Muse's native-quality thesis with evidence.
- Best format: Instagram carousel, bilingual, plus an X post. This is the RTL showcase, so the Arabic pass matters most here.
- Hook: "The Arabic benchmarks everyone cites have measurable errors. And a small Arabic-first model can beat a giant one."
- Slides:
  1. "We rank Arabic models off leaderboard averages. What if the benchmarks themselves are dirty?"
  2. "QIMMA (TII, April 2026) quality-checked popular Arabic benchmarks before scoring, and found systematic issues. It discarded about 3.1% of ArabicMMLU items as flawed."
  3. "Scale did not decide it. Mid-size Arabic-specialised models beat much larger multilingual models on specific domains, per the same leaderboard."
  4. "Why it matters here: Arabic is a small slice of training data for more than 400 million speakers. Native quality is a choice, not a default. Test on your own Arabic and dialects, not an average."
  5. "Where has a smaller Arabic-native model beaten a frontier model for you? And which Arabic tasks still break?"
- Question: "Where has an Arabic-first model beaten a bigger frontier model for you, and which Arabic tasks still break?"
- Caption or opener: "If you pick Arabic models by leaderboard average, read this. A 2026 quality-first leaderboard found real errors in the benchmarks, and showed native beats big on the tasks that matter."
- Why it can earn engagement: comments, GCC builders name where a native model won; saves, a reference for Arabic model choice; shares, sent across Arabic-NLP and GCC dev circles; quote posts, people adding their own Arabic evaluation practice. This is also the batch's best route to a real conversation and inbound, since it is Muse's territory.
- Risks: do not frame it as attacking any Saudi or regional model; present the method and finding, not the vendor's ranking of rivals, since TII also ships a competing model; the lead source is about two weeks past 90 days, disclosed; re-capture the Fanar 0.5% figure verbatim before quoting it; the Arabic must be native-written and reviewed, never machine-translated.
- Distribution and founder specifics: the founder closest to Arabic and RTL work posts first, in Arabic and English. Quote-post an Arabic-NLP researcher or a GCC AI builder respectfully. LinkedIn version speaks to institutions and buyers choosing Arabic AI, and leans on Muse's native-quality position.
- Success hypothesis and primary metric: content in Muse's owned territory, with a concrete regional finding, earns DMs and real conversations, not just claps. Primary metric: real conversations. Secondary: saves and shares.
- Sources: TII, blog 2026-04-21 huggingface.co/blog/tiiuae/qimma-arabic-leaderboard and paper 2026-04-03 arxiv.org/abs/2604.03395. Verbatim: "even widely-used, well-regarded Arabic benchmarks contain systematic quality issues that can quietly corrupt evaluation results" and "Scale does not guarantee best performance" and "Some smaller Arabic-specialized models (Fanar-1-9B, ALLaM-7B) outperform much larger multilingual models on specific domains." The 3.1% ArabicMMLU discard is 436 of 14,163 items. Blog and paper are the same TII team, so this is one team's two artifacts, not two independent labs; label it. Supporting stat: Fanar 2.0, QCRI/HBKU, 2026-03-17 arxiv.org/abs/2603.16397, that Arabic is about 0.5% of web data for over 400 million native speakers (paraphrased here; capture the exact wording verbatim from the source before publishing). Benchmark gains in that paper are self-reported.

---

## 4A. Measurement model, a controlled learning loop

The batch runs as a learning loop, not six random posts.

One primary metric per post, chosen by the post's job:

| # | Job | Primary metric |
|---|---|---|
| 1 | Help people choose a model | Saves |
| 2 | Give a workflow to try | Saves |
| 3 | Change how people test | Substantive replies |
| 4 | Prompt reflection | Substantive replies |
| 5 | Stake and defend an opinion | Quote posts |
| 6 | Open a conversation in our territory | Real conversations |

Secondary diagnostics we track but never celebrate as success on their own: followers, likes, impressions, and reach. They move for reasons unrelated to the work.

Fair comparison across different reach. Raw counts favour whichever post got amplified, so compare rates, not totals:

- Primary-action rate = primary metric count divided by accounts reached, expressed per 1,000 reached.
- A small post with a high save rate can and should beat a big post with a low one.
- Record reach and the rate for every post so a modest-reach winner is not buried under a high-reach dud.

Definitions, so quality is not guessed:

- Substantive reply: a comment or reply that adds an opinion, a counter-point, a lived experience, or a specific question. More than one clause. Not an emoji, not "great post", not a tag with no words. Spam and bots excluded.
- Real conversation: a back and forth of at least three messages with a real person, in comments or DMs, or any exchange that surfaces a need, a referral, or a follow-up we act on. This is the number that connects to revenue.

Reusable post log, one row per published post. The template lives in `post-log.md`:

| Field | Meaning |
|---|---|
| Hypothesis | What we expected this post to earn, and why |
| Format | Carousel, thread, single, hybrid |
| Topic | Which experiment and subject |
| Source age | In 90 days, or older, or landmark |
| Channel | X, Instagram, LinkedIn |
| Account | Which personal or Muse account posted first |
| Primary metric | The one number, per the table above |
| Result | Primary-action rate per 1,000 reached, plus the raw count and reach |
| Quality notes | What the substantive replies and DMs actually said |
| Next iteration | Keep, re-run in another format or channel, or retire |

Choosing the next batch without pretending six posts are conclusive:

- Rank by primary-action rate, not raw reach.
- Keep topic and format pairs that earned saves, replies, or conversations. Retire the ones that earned only likes and impressions.
- Read every substantive reply and DM. Recurring questions are the next content calendar, written by the audience.
- Treat one strong post as a hypothesis to re-run, not proof. Re-run a winner in a second variant, for example same topic in the other format or channel, before scaling it.
- Watch confounds: reach gaps, which account posted, day and time, and any outside amplification. Six posts show direction, not statistical truth. Say so.

---

## 5. Files the execution session will create

All under `Muse Vault/03 Marketing/AI Content Experiments/`. Nothing outside this folder is created or edited.

```
AI Content Experiments/
  Plan.md                      already exists, this file
  batch-01/
    doc-src/                   copied from the muse-pdf skill template
      document.html            the 12 pages, all copy here, one section.page per page
      house.css                Muse house style, unchanged palette and type
      build.py                 renders document.html to the PDF, one level up
      measure.py               page fill and silent-overflow check
      contrast.py              palette contrast check
      fonts/                   Space Grotesk and IBM Plex Sans Arabic woff2
      assets/                  Muse logo SVGs
    AI-Content-Batch-01.pdf    generated by build.py, the branded deliverable
    experiments/
      exp-1-model-picking.md   master editable source: premise, format, hook,
      exp-2-agent-worktrees.md   full on-slide copy, question, caption or opener,
      exp-3-benchmark-variance.md engagement rationale, risks, distribution,
      exp-4-ai-and-confidence.md  founder playbook, hypothesis, primary metric
      exp-5-code-maintainability.md
      exp-6-arabic-benchmarks.md
      exp-6-arabic-benchmarks.ar.md   later native Arabic pass, human-written
    threads/
      exp-1-thread.md ... exp-6-thread.md   X thread text, ready to paste
    sources/
      sources.md               the verified source register: per claim, the URL,
                               title, publisher, date, in-90-days flag, verbatim
                               excerpt, corroborator, and vendor-reported flag
    post-log.md                the measurement post log template from 4A
    README.md                  how to build and verify, pointing at the checks
                               in sections 7 and 8 and the muse-pdf README
```

Notes:

- The muse-pdf `build.py` writes the PDF one level above `doc-src`, so it lands in `batch-01/`. Rename the `PDF` constant in `build.py` to `AI-Content-Batch-01.pdf`.
- The PDF carries condensed citations. The full verbatim register lives in `sources/sources.md`, which is the single source of truth for every number and quote.
- Screenshots are optional. If experiment 2 or 6 uses one, place it under `doc-src/assets/` and expect a larger file, as the walkthrough PDF does.
- Arabic files are a later native pass reviewed by someone who writes Arabic well, not a machine translation, and not a blocker for the English batch.

---

## 6. PDF page map, 12 A4 pages, on the Muse PDF system

Built on the muse-pdf template: A4 pages fixed at 297mm with overflow hidden, maroon surface, orange accent, Space Grotesk and IBM Plex Sans Arabic, the crosshair texture kept for print. Component classes named below are the real ones in `house.css`.

| Page | Content | Main components |
|---|---|---|
| 1 | Cover. Title "AI Content, Batch 01". Lede on what the batch is and how it is measured. Meta grid: batch, date 2026-08-05 Riyadh, channels X, Instagram, LinkedIn, primary metrics saves, shares, substantive replies, real conversations | `.cover`, `.top`, `.mid`, `.meta`, `img.mark` |
| 2 | What this is and the honest-engagement principle. The tension and how we resolve it, source-backed posts that ask for a real opinion | `.band` num 01, `.lead`, `.pull`, `.callout` |
| 3 | Strategy in one page, and the selection and rejection criteria | `.band` 02, `ul.dash`, `ul.check`, small `table` |
| 4 | The slate at a glance. Six rows: topic, format, primary metric, source age. Plus the mix and recency note | `.band` 03, `table` |
| 5 | Experiment 1, model picking | `.band` 04, `.lead`, `.pull`, numbered slides, `.callout` question, `.note` sources |
| 6 | Experiment 2, agent worktrees | same experiment layout |
| 7 | Experiment 3, benchmark variance | same |
| 8 | Experiment 4, AI and confidence | same |
| 9 | Experiment 5, code maintainability opinion | same, `.pull` carries the opinion and the counter-argument |
| 10 | Experiment 6, Arabic benchmarks | same, with an Arabic run set in `.ar` to show RTL done right |
| 11 | Measurement model and the post-log template | `.band`, `table` for metric-per-post and the log columns, `.callout` for the definitions |
| 12 | How we choose the next batch, condensed source register, colophon | `.band`, `ul.dash`, `.srcs` for the source list, `.callout` on "six posts are direction, not proof", `.foot` |

Rules from the system that govern the map:

- The 12 is a target. A page under about half full gets merged with its neighbour. An overflowing page gets a whole line or block cut, never smaller body type. Re-run `measure.py` after each edit.
- Each experiment page is dense. If one overflows, move its full on-slide copy into `experiments/exp-N.md` and keep the page to premise, hook, the slide skeleton, the question, the primary metric, and short sourced footnotes.
- Page numbers in `.foot .pn` are literal strings and are renumbered by hand when pages are added or removed, because the footer cannot load the webfont.
- Experiment 6's Arabic run must be inside `.ar` so it resolves to IBM Plex Sans Arabic and sets right to left.

---

## 7. Source verification and acceptance checklist

Run per source, at build time, before the claim may appear in the PDF or a post. The reconnaissance was done on 2026-08-05, but pages change, so re-verify.

- [ ] Re-fetch the primary page. If it returns 403 or 404, use the named corroborator or cut the claim. Do not quote from memory or from this plan.
- [ ] Capture and confirm on the page: exact URL, title, publisher or author, publication date.
- [ ] Re-copy the verbatim excerpt word for word from the live page. It must support the exact claim in the copy.
- [ ] Confirm the date is inside 90 days (on or after 2026-05-07), or label it older or landmark. Confirm the batch still has at least 4 in-window experiments.
- [ ] For any consequential or disputed claim, confirm one independent corroborator from a different publisher, with its own verbatim line.
- [ ] Label every vendor-reported or self-reported number as such. This covers all model head-to-head benchmarks in experiment 1, the GitClear figures in 5, and the QIMMA and Fanar numbers in 6.
- [ ] Per-source to-dos: confirm ReasonBENCH author affiliations from the PDF; retry the OpenAI GPT-5.6 page and keep TechCrunch and Nextgov if it still refuses; keep GitClear quoted via LeadDev, since the primary was 403; re-capture the Fanar 0.5% wording verbatim; frame QIMMA as method and finding, not as TII ranking rivals; use ALLaM only as a no-numbers, no-naming concept, if at all.
- [ ] No invented numbers and no false certainty. Every figure in the copy traces to a captured excerpt in `sources/sources.md`.
- [ ] If a claim cannot be re-verified at build time, cut it and adjust the slide.

---

## 8. Mechanical copy and PDF verification checklist

Copy checks, on `document.html` and the source files:

- [ ] No em dash, en dash, guillemets, or curly quotes anywhere. Straight quotes only.
- [ ] No banned Muse phrases: innovative solutions, cutting edge technology, disrupting the industry, seamless, synergy, leveraging, empowering, unlocking, passionate about, best in class, next level, thrilled to announce, excited to share.
- [ ] Voice is close to people, not corporate. Delete any sentence that still works with a hype word removed.
- [ ] Arabic is set in IBM Plex Sans Arabic, inside `.ar`, native-written and reviewed by a person who writes Arabic well, not machine-translated.
- [ ] Every number and quote in the copy matches `sources/sources.md`.
- [ ] No named Saudi company is attacked or implied to produce bad work.

Build and PDF checks, from the muse-pdf README:

- [ ] `python3 doc-src/build.py` writes `AI-Content-Batch-01.pdf`.
- [ ] `python3 doc-src/measure.py` reports page fill and flags silent overflow. Anything negative is being clipped. Run after every copy edit. It measures in screen media, not print, on purpose.
- [ ] `pdfinfo AI-Content-Batch-01.pdf | grep Pages` shows the expected page count, 12 unless a merge or split was decided.
- [ ] `pdffonts AI-Content-Batch-01.pdf | grep -Ei 'times|helvetica|arial'` prints nothing. Only Space Grotesk and IBM Plex Sans Arabic may embed.
- [ ] `pdftotext -layout AI-Content-Batch-01.pdf - | grep -n` for em dash, en dash, and guillemet characters prints nothing. Repeat the grep for curly quote characters.
- [ ] `python3 doc-src/contrast.py` confirms the palette. Body text is maroon on white or white on maroon, never white on orange. Orange is for numerals, rules, and large type only.
- [ ] `pdftoppm -png -r 80 AI-Content-Batch-01.pdf pg` then look at every page: logos correct per shape, Arabic renders right to left and joins correctly, nothing clipped, no orphaned half-empty page.
- [ ] Page numbers in `.foot .pn` renumbered by hand to match the final page count.
- [ ] The output file exists and is non-empty before calling it done.
