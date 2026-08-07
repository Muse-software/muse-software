# X thread, Experiment 6. Arabic benchmarks

1/ The Arabic benchmarks everyone cites have measurable errors. And a small Arabic-first model can beat a giant one.

2/ We rank Arabic models off leaderboard averages. What if the benchmarks themselves are dirty?

3/ QIMMA, built by TII in April 2026, quality-checked popular Arabic benchmarks before scoring anything, and found systematic issues. On ArabicMMLU alone it discarded 436 of 14,163 items as flawed, 3.1% [13][14].

4/ Scale did not decide the ranking. Some smaller Arabic-specialised models, named in the same leaderboard as Fanar-1-9B and ALLaM-7B, outperform much larger multilingual models on specific domains [13].

5/ Arabic is spoken by over 400 million people and still makes up only about 0.5% of web data [15]. Native quality is a choice, not a default. Test on your own Arabic and dialects, not an average.

6/ Where has a smaller Arabic-first model beaten a bigger one for you, and which Arabic tasks still break?

Sources: [13][14] TII, QIMMA leaderboard and paper, April 2026. [15] QCRI/HBKU, Fanar 2.0, March 2026. Full register in sources/sources.md.
