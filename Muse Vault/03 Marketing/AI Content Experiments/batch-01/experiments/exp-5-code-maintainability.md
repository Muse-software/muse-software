# Experiment 5. AI is helping us ship more code. Maintainability is going the other way

## 1. Premise and audience job

Muse's own opinion, grounded in evidence and stated fairly: AI is raising code volume and speed while eroding the signals that mark maintainable code, and developers are not well positioned to notice it happening to their own work. The job for the reader: take a side with their own experience, and check their own codebase against the question this raises.

## 2. Best format and channel adaptation

X thread as the primary format, since opinion travels on X, see `threads/exp-5-thread.md`. LinkedIn gets the same substance with the sharp edge removed, one number and the maintenance question kept, aimed at engineering leads.

## 3. Truthful hook

"AI is helping us ship more code, faster. The maintainability is going the other way."

## 4. On-slide copy, 5 slides

**Slide 1**
AI is helping us write more code, faster.
That part is real. The quality signals are the worry.

**Slide 2**
One analysis of code changes, reported by LeadDev in July 2026 from research by the vendor GitClear: code duplication up 81%, refactoring activity down 70%, legacy refactoring down 74% since 2023 [8]. GitClear sells code-quality tooling, stated plainly since it is a real conflict of interest.

**Slide 3**
A controlled trial from METR: experienced developers took 19% longer to complete real issues with AI, yet still believed AI had sped them up by 20% afterward [9]. We are poor judges of our own speed. METR later redesigned the continuing experiment after newer recruitment selection effects made its current estimates unreliable [10]. That does not reverse the 2025 result, but it warns against treating one sample as universal. Separately, in the 2025 Stack Overflow survey, the single biggest developer frustration, cited by 66%, was "AI solutions that are almost right, but not quite" [12].

**Slide 4**
The honest frame, from the 2025 DORA report: "AI is an amplifier, not a fix" [11]. It rewards strong foundations and punishes weak ones. Volume is not the same as craft.

**Slide 5**
Counter-argument, fairly: METR's sample was small and self-selected, and GitClear sells the exact tool that measures this problem [9][10][8]. Six months on, is your AI-assisted code easier or harder to maintain than what you wrote by hand?

## 5. X thread version

See `threads/exp-5-thread.md`. Same argument, 7 posts, ready to paste.

## 6. Caption or opener

An opinion we can defend, with the counter-argument attached: AI is lifting our output and quietly lowering our maintainability, and most of us cannot feel it happening while we work.

## 7. Discussion question

Six months on, is your AI-assisted code easier or harder to maintain than what you wrote by hand?

## 8. Why it can earn engagement, by behaviour

- Comments: people taking a side with their own experience, on either side of the argument
- Saves: the sources bundled in one place, useful to reference later
- Shares: sent into a team channel where this argument is already happening
- Quote posts: this is built to be quote-argued, which is the point, not a flaw

## 9. Risks and how the published version avoids them

- Highest outrage risk in the batch. The counter-argument stays in on slide 5 rather than being cut for a cleaner narrative, and the tone stays curious rather than anti-AI.
- GitClear has a commercial interest in this exact narrative. Stated aloud on slide 2, and its numbers are quoted through LeadDev's independent reporting, not from GitClear's own page, which returned a 403 on re-fetch.
- METR's 2025 sample was narrow, 16 developers. Its 2026 update concerns selection effects in later recruitment, not a retroactive reversal of the 2025 randomized result. The copy keeps those points separate.
- Never implies a specific company writes bad code. No company or codebase is named as an example of poor quality anywhere in this piece.

## 10. Distribution plan

Personal account first: a founder posts and stays on to argue in good faith through the day. Muse amplifies within a few hours. LinkedIn adaptation: same substance, sharp edge removed, one number and the maintenance question kept, speaking to engineering leads.

## 11. Founder first-day interaction plan

- Before posting: reply usefully to 3 to 5 recent posts from engineers discussing AI and code quality, no link drops
- First 60 to 90 minutes: answer every substantive comment with a fact or a follow-up question, never argue to win; deepen the best comment
- Quote-post targets: 1 to 2 senior engineers who have written about AI and code quality, quoted to extend the discussion, never to dunk
- Follow-up: the strongest counter-argument in the replies gets addressed directly in a follow-up post

## 12. Success hypothesis and metrics

Hypothesis: a fair, evidence-backed opinion with a real counter-argument attached earns quote posts and debate rather than a pile-on. Primary metric: quote posts. Secondary: substantive replies, plus reach tracked but not celebrated on its own.

## 13. Source list

[8] LeadDev, Bill Doerrfeld, "Code maintainability plummets in the AI coding era," 2026-07-07, reporting on GitClear research
[9] METR, "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity," 2025-07-10
[10] METR, "We are changing our developer productivity experiment design," 2026-02-24
[11] The 2025 DORA Report, DORA research program with Google Cloud, via Thoughtworks
[12] Stack Overflow, 2025 Developer Survey, AI section
Full verbatim excerpts in `../sources/sources.md`.
