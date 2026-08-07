# X thread, Experiment 3. Benchmark variance

1/ Run the same benchmark twice and the winner can change.

2/ We treat one benchmark score as the answer. It is one sample.

3/ ReasonBENCH, an arXiv paper revised in May 2026, ran 10 reasoning strategies across 12 models and 6 tasks, 30 independent trials each [6].

4/ The result: the highest-performing strategy won only 77% of head-to-head runs against its nearest competitor [6]. That is a win rate across runs, not an accuracy score.

5/ Meaning two close systems can swap places from one run to the next, and a single number can silently misrank them. Run your eval more than once, report a range, and distrust a narrow win.

6/ Have you seen a model win one day and lose the next on the same test? What do you do about eval variance?

Sources: [6] arXiv 2512.07795, v2 2026-05-30. Full register in sources/sources.md.
