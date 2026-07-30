/**
 * Placeholder monogram avatars (not photos) until real headshots are
 * available — deliberately generic, not a stand-in photo of an unrelated
 * real person.
 */
const team = [
  {
    name: "Abdullah Al Subaie",
    title: "Chief Executive Officer",
    initials: "AA",
    bio: "Abdullah leads Muse Studios' overall strategy and client partnerships, setting the direction for how the studio grows and who it chooses to work with. He's focused on building a team that can execute at a global standard while staying rooted in the Saudi market Muse was built to serve.",
  },
  {
    name: "Mohammad Aamir",
    title: "Chief Technology Officer",
    initials: "MA",
    bio: "Mohammad leads engineering and product delivery at Muse Studios, setting the technical bar for every client engagement. He's focused on keeping the studio's output fast without cutting corners — the same outcomes-first standard Muse holds its clients to.",
  },
];

export default function Leadership() {
  return (
    <section className="bg-[#060608] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1000px] px-5 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
          Leadership
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {team.map((person) => (
            <div key={person.name} className="border border-white/10 p-8">
              <div className="flex h-16 w-16 items-center justify-center bg-[#4C0014] font-space-grotesk text-xl font-bold text-[#fd4601]">
                {person.initials}
              </div>
              <h3 className="mt-5 font-space-grotesk text-xl font-bold text-white">
                {person.name}
              </h3>
              <p className="text-sm uppercase tracking-[0.2em] text-[#fd4601]">{person.title}</p>
              <p className="mt-4 text-base leading-7 text-white/70">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
