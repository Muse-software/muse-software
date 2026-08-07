# Source register, Batch 01

Every claim used in the editable experiment files and the PDF traces to a record here. IDs are fixed by `../source-ledger.json` and are never renumbered. Re-fetched live on 2026-08-05.

Ledger note before anything else: several reconnaissance URLs returned 404 or pointed at the wrong page when re-fetched. Their corrected live URLs were registered through the citation-ledger script as new IDs [24] to [28]. The broken original IDs remain in the ledger history and are not cited.

---

## Experiment 1, three model launches in one month

### id 1
- URL: https://www.anthropic.com/news/claude-opus-5
- Title: Introducing Claude Opus 5
- Publisher: Anthropic
- Date: 2026-07-24
- Excerpt: "Claude Opus 5 is available today." Pricing: "$5 per million input tokens and $25 per million output tokens (the same as Opus 4.8)." Positioning: "It's the new default model on Claude Max, and the strongest model on Claude Pro." Benchmark: "On Frontier-Bench v0.1, [it] surpasses all other models, and more than doubles Opus 4.8's performance at a lower cost per task."
- Supports: experiment 1, slides 2 to 4
- Type: vendor-reported (Anthropic's own announcement)
- Note: the only one of the three launches that a company itself calls a new default. Label all benchmark numbers as Anthropic's own.

### id 2
- URL: https://techcrunch.com/2026/07/09/openai-launches-its-new-family-of-models-with-gpt-5-6
- Title: OpenAI launches its new family of models with GPT-5.6
- Publisher: TechCrunch, Lucas Ropek
- Date: 2026-07-09
- Excerpt: "The company says that 5.6 is now available across ChatGPT, Codex, and the OpenAI API." Family is Sol, Terra, Luna. Vendor claim reported: Sol "sets a new state of the art at 80, 2.8 points above Fable 5, while using less than half the output tokens." Pricing: "Sol is $5 input / $30 output, Terra is $2.50 input / $15 output, and Luna is $1 input / $6 output" per million tokens.
- Supports: experiment 1, slide 2
- Type: independent journalism reporting vendor claims
- Note: no explicit "default" or "flagship" language for GPT-5.6 in this piece. OpenAI's own launch page returned 403 on re-fetch; TechCrunch stands as primary per the plan's allowance.

### id 3
- URL: https://techcrunch.com/2026/07/21/google-releases-three-new-gemini-models-but-no-3-5-pro
- Title: Google releases three new Gemini models, but no 3.5 Pro
- Publisher: TechCrunch, Rebecca Bellan
- Date: 2026-07-21
- Excerpt: "On Tuesday, Google DeepMind released Gemini 3.6 Flash, 3.5 Flash-Lite, and 3.5 Flash Cyber." "Gemini 3.6 Flash is Google's workhorse model that promises improved capabilities in coding, knowledge work, and multimodal performance while reducing token usage by up to 17%." The article distinguishes this trio from Google's actual flagship line: "Gemini Pro models are generally Google's highest-capability offerings for complex reasoning and coding tasks, while Flash models prioritize lower cost and faster response times."
- Supports: experiment 1, slides 2 to 3
- Type: independent journalism reporting vendor claims
- Note: this is the important correction from re-verification. TechCrunch explicitly says these are not Google's flagship, that is still Gemini Pro. The batch's original hook called all three launches "flagship." That claim does not hold for Gemini and has been rewritten.

### id 24
- URL: https://9to5google.com/2026/07/24/anthropic-launches-claude-opus-5/
- Title: Claude Opus 5 launches with similar performance as Fable 5 for half the price
- Publisher: 9to5Google, Andrew Romero
- Date: 2026-07-24
- Excerpt: "Claude Opus 5 reportedly costs half the price of Fable 5, yet it delivers results that are similar in performance." "On several coding and knowledge work evaluations, Opus 5 is the new state-of-the-art."
- Supports: corroborates id 1
- Type: corroborator, independent tech press

### id 25
- URL: https://www.nextgov.com/artificial-intelligence/2026/07/openais-advanced-gpt-56-models-be-available-public/414651/
- Title: OpenAI's advanced GPT-5.6 models to be publicly released
- Publisher: Nextgov/FCW, Alexandra Kelley
- Date: 2026-07-08 (a day before the TechCrunch launch piece; a pre-launch preview, not same-day confirmation)
- Excerpt: "GPT-5.6 Sol, Terra and Luna models will launch publicly on Thursday." "GPT-5.6 Sol is the strongest model of the series, and is tuned for work in biology, chemistry and cybersecurity."
- Supports: corroborates id 2, and is the only source with "strongest of the series" language for GPT-5.6
- Type: corroborator, independent trade press

### id 26
- URL: https://gcn.com/google-launches-gemini-flash-cybersecurity-model/19924/
- Title: Google launches Gemini 3.6 Flash and a cybersecurity model with 17% fewer output tokens
- Publisher: GCN, Hugo Rojas
- Date: 2026-07-22
- Excerpt: "On the DeepSWE coding benchmark, the model scores 49 percent, up from 37 percent for 3.5 Flash." "Output dropped from $9.00 to $7.50 per million tokens, with input held steady at $1.50 per million tokens." "Google describes 3.6 Flash as its workhorse model."
- Supports: corroborates id 3
- Type: corroborator, independent trade press

---

## Experiment 2, agent worktrees

### id 4
- URL: https://github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-code-july-2026-releases
- Title: GitHub Copilot in Visual Studio Code, July 2026 releases
- Publisher: GitHub Changelog
- Date: 2026-07-30
- Excerpt: "Use worktrees with any harness: Start Copilot, Claude, or Codex sessions in a Git worktree, so each session can work in an isolated copy of your repository."
- Supports: experiment 2, slides 2 to 3
- Type: vendor-reported (GitHub's own changelog)

### id 27
- URL: https://dev.to/leobaniak/copilot-in-vs-code-gives-each-agent-session-its-own-git-worktree-3j5n
- Title: Copilot in VS Code gives each agent session its own git worktree
- Publisher: dev.to, Leo Baniak
- Date: 2026-07-31
- Excerpt: "The first time I let two Copilot agents work on the same repo at the same time, one of them stomped on the other's edits inside about ninety seconds." "you can now start a Copilot, Claude, or Codex session in a git worktree, so each session works in an isolated copy of your repository."
- Supports: corroborates id 4, and supplies the concrete "what goes wrong without it" line for slide 4
- Type: corroborator, independent developer blog

### id 5
- URL: https://www.figma.com/blog/config-2026-recap
- Title: Config 2026, new materials, new tools and a more expressive canvas
- Publisher: Figma, Dylan Field
- Date: 2026-06-24
- Excerpt: "On the canvas, you can turn any design layer into an interactive code layer with just a single click (or a prompt)." "Join the waitlist... for early access when code layers rolls out starting in July."
- Supports: one cross-vendor line in experiment 2 only, not a claim of its own
- Type: vendor-reported (Figma's own blog), waitlist-gated at time of writing

---

## Experiment 3, benchmark variance

### id 6
- URL: https://arxiv.org/abs/2512.07795
- Title: ReasonBENCH: Benchmarking the (In)Stability of LLM Reasoning
- Authors: Nearchos Potamitis, Vansh Ramani, Har Ashish Arora, Dhairya Kuchhal, Lars Klein, Akhil Arora. Affiliations given on the paper are Aarhus University, IIT Delhi, and EPFL, but which author belongs to which of the three could not be confirmed cleanly from the rendered page; this piece does not name a specific author's affiliation in copy.
- Date: v1 2025-12-08, v2 2026-05-30
- Excerpt: "The highest-performing strategy wins only 77% of head-to-head runs against its nearest competitor, meaning a single observed score can silently misrank systems." Method: "We introduce ReasonBench, a benchmark suite recording 30 independent trials across 10 reasoning strategies, 12 models, and 6 tasks."
- Supports: experiment 3, all slides
- Type: independent academic research (arXiv preprint, not yet confirmed peer reviewed)
- Note: 77% is a head-to-head win rate between the top strategy and its single nearest rival, confirmed by the sentence structure itself, not an accuracy score. "Reasoning strategy" here is a distinct axis from "model": the paper tests 10 strategies across 12 different models.

---

## Experiment 4, AI reliance, confidence, appreciation and aversion

### id 28
- URL: https://techxplore.com/news/2026-04-overreliance-ai-undermine-confidence.html
- Title: Overreliance on AI programs may undermine confidence at work, study finds
- Publisher: Tech Xplore, crediting the American Psychological Association
- Date: 2026-04-16
- Excerpt: "58% of the participants agreed that AI 'did most of the thinking' to complete the work." Those participants "reported reduced confidence in their own independent reasoning, lesser perceived ownership of ideas, and making trade-offs between task speed and depth of thought." Participants who "modified, challenged, or rejected AI suggestions reported greater confidence and a stronger sense of authorship."
- Supports: experiment 4, current AI reliance finding
- Type: reporting on peer-reviewed research published in Technology, Mind, and Behavior. Study of 1,923 online adult participants across 10 simulated work tasks.
- Note: the finding is self-reported confidence and ownership, not a measured decline in intelligence. The source is 111 days before the batch date, older than 90 days, disclosed openly.

### id 22
- URL: https://doi.org/10.1037/xge0000033
- Title: Algorithm aversion: People erroneously avoid algorithms after seeing them err
- Authors: Berkeley J. Dietvorst, Joseph P. Simmons, Cade Massey
- Date: 2015
- Excerpt from the published abstract: "people more quickly lose confidence in algorithmic than human forecasters after seeing them make the same mistake." Participants were less likely to choose the algorithm even when they saw it outperform the human forecaster.
- Supports: experiment 4, algorithm-aversion framing
- Type: peer-reviewed landmark research, pre-LLM

### id 23
- URL: https://doi.org/10.1016/j.obhdp.2018.12.005
- Title: Algorithm appreciation: People prefer algorithmic to human judgment
- Authors: Jennifer M. Logg, Julia A. Minson, Don A. Moore
- Date: 2019
- Excerpt from the published abstract: "lay people adhere more to advice when they think it comes from an algorithm than from a person." The effect weakened when people compared the algorithm with their own estimate and among experienced forecasters.
- Supports: experiment 4, algorithm-appreciation framing
- Type: peer-reviewed landmark research, pre-LLM
- Note: ids 22 and 23 are behavioural concepts, not direct evidence about current chatbots.

---

## Experiment 5, code maintainability

### id 8
- URL: https://leaddev.com/ai/code-maintainability-plummets-in-the-ai-coding-era
- Title: Code maintainability plummets in the AI coding era
- Publisher: LeadDev, Bill Doerrfeld, reporting on research by GitClear
- Date: 2026-07-07
- Excerpt: "Compared to pre-AI times, code duplication is up 81%." "Move (refactor), a measurement of how often commits edit existing codebases, is down 70%, indicating declining code reuse." "Since 2023, [legacy refactoring] has fallen 74%." Attributed quote: "Every time you want something, AI creates a new package for it," Bill Harding, CEO of GitClear.
- Supports: experiment 5, slide 2
- Type: vendor-reported. GitClear sells code-analytics tooling and has a direct commercial interest in a declining-quality narrative; LeadDev is independent editorial but did not audit GitClear's methodology. GitClear's own page returned 403 on re-fetch; quoted through LeadDev only, per the plan's allowance.

### id 9
- URL: https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study
- Title: Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity
- Publisher: METR
- Date: 2025-07-10
- Excerpt: "When developers are allowed to use AI tools, they take 19% longer to complete issues, a significant slowdown that goes against developer beliefs and expert forecasts." "Developers expected AI to speed them up by 24%, and even after experiencing the slowdown, they still believed AI had sped them up by 20%."
- Supports: experiment 5, slide 3
- Type: independent research, a randomized controlled trial with 16 experienced developers across 246 real tasks. Landmark anchor for this batch, and outside the 90 day window, disclosed openly.

### id 10
- URL: https://metr.org/blog/2026-02-24-uplift-update
- Title: We are changing our developer productivity experiment design
- Publisher: METR
- Date: 2026-02-24
- Excerpt: "30% to 50% of developers told us that they were choosing not to submit some tasks because they did not want to do them without AI." "Due to the severity of these selection effects, we are working on changes to the design of our study."
- Supports: experiment 5, a later warning that ongoing replications developed recruitment selection effects and needed a redesigned study
- Type: independent research, same organization as id 9
- Note: this update is about newer recruitment and measurement problems in the continuing experiment. It does not retroactively invalidate or reverse the 2025 randomized result, and the copy must not describe it as a selection-bias correction to the original 19% figure.

### id 11
- URL: https://www.thoughtworks.com/en-us/insights/reports/the-2025-dora-report
- Title: The 2025 DORA Report, state of AI-assisted software development
- Publisher: DORA research program with Google Cloud, hosted via Thoughtworks
- Date: 2025 (no specific day found on the hosting page)
- Excerpt: "AI is an amplifier, not a fix. AI amplifies existing strengths and weaknesses." "Speed increases, but instability persists... it still correlates with higher instability."
- Supports: experiment 5, slide 4
- Type: independent research consortium

### id 12
- URL: https://survey.stackoverflow.co/2025/ai
- Title: AI, 2025 Stack Overflow Developer Survey
- Publisher: Stack Overflow
- Date: companion announcement dated 2025-12-29
- Excerpt: "AI solutions that are almost right, but not quite" is the single biggest frustration, cited by 66% of developers, followed by "Debugging AI-generated code is more time-consuming" at 45%.
- Supports: experiment 5, slide 5
- Type: self-reported developer survey

---

## Experiment 6, Arabic benchmarks

### id 13
- URL: https://huggingface.co/blog/tiiuae/qimma-arabic-leaderboard
- Title: QIMMA, a quality-first Arabic LLM leaderboard
- Publisher: Technology Innovation Institute (TII)
- Date: 2026-04-21
- Excerpt: "Even widely-used, well-regarded Arabic benchmarks contain systematic quality issues that can quietly corrupt evaluation results." "Scale does not guarantee best performance." "Some smaller Arabic-specialized models (Fanar-1-9B, ALLaM-7B) outperform much larger multilingual models on specific domains." Discard table: ArabicMMLU, 14,163 total, 436 discarded, 3.1%.
- Supports: experiment 6, all slides
- Type: self-reported. TII built the validation pipeline, the leaderboard, and ran every model on it, including third-party models it does not itself make. One team's method and finding, not independently corroborated.

### id 14
- URL: https://arxiv.org/abs/2604.03395
- Title: Are Arabic Benchmarks Reliable? QIMMA's Quality-First Approach to LLM Evaluation
- Publisher: Technology Innovation Institute, Abu Dhabi (same team as id 13)
- Date: submitted 2026-04-03
- Excerpt: "Our quality validation pipeline revealed systematic issues across existing Arabic benchmarks." "Scale alone is neither sufficient nor necessary to predict quality." ArabicMMLU: 13,727 kept, 436 discarded, matching id 13's 14,163 total and 3.1% rate.
- Supports: corroborates id 13's numbers from the paper version of the same work
- Type: self-reported, same team as id 13

### id 15
- URL: https://arxiv.org/abs/2603.16397
- Title: Fanar 2.0, Arabic Generative AI Stack
- Publisher: QCRI / Hamad Bin Khalifa University (Fanar team, independent of the TII/QIMMA team)
- Date: submitted 2026-03-17
- Excerpt: "Arabic content represents only approximately 0.5% of web data despite the language having over 400 million native speakers."
- Supports: experiment 6, slide 4
- Type: independent of id 13/14 (different institution). The 0.5% figure itself is attributed in the paper to an external citation, not an original Fanar measurement, and is stated with an approximation symbol throughout, never as an exact number.

---

## Corrections made during re-verification

- Experiment 1's premise called all three model launches "flagship." TechCrunch (id 3) explicitly states the Gemini Flash trio is not Google's flagship line, that is Gemini Pro. The premise and hook now say three major releases with three different vendor pitches.
- Broken reconnaissance URLs remain as historical ledger entries. Corrected live pages were registered through the ledger script as [24] to [28], without reusing or renumbering an old ID.
- The behavioural-economics landmarks were registered through the ledger script as [22] and [23], then framed explicitly as pre-LLM concepts.
