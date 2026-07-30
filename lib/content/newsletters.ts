import type { NewsletterIssue } from "./shared";

export const newsletters: NewsletterIssue[] = [
  {
    "slug": "ai-ready-is-not-a-milestone",
    "title": "\"AI-Ready\" Is Not a Milestone",
    "excerpt": "\"Ready\" is a status update, not a shipped product, and most companies chasing the label know it.",
    "minutes": 3,
    "date": "2025-09-04",
    "featuredImage": {
      "src": "/photos/cover-neon-city.jpg",
      "alt": "Neon-lit city street at night"
    },
    "content": [
      {
        "type": "paragraph",
        "text": "Every proposal we get asked to respond to now has a line about being \"AI-ready.\" Nobody can define what that means, and most of the people asking for it aren't ready for anything specific — they're ready to have another meeting about readiness."
      },
      {
        "type": "paragraph",
        "text": "The label is comforting because it postpones the hard part. You can be \"AI-ready\" forever. You can hire a readiness consultant, run a readiness workshop, publish a readiness roadmap, and never once ship a working feature that changes how anyone in the business actually works."
      },
      {
        "type": "paragraph",
        "text": "Readiness, as a category, has no failure mode. Shipping does. That asymmetry is exactly why it gets chosen over shipping, again and again, by teams that are otherwise smart and well resourced."
      },
      {
        "type": "quote",
        "text": "Readiness, as a category, has no failure mode. Shipping does. That asymmetry is exactly why it gets chosen over shipping, again and again, by teams that are otherwise smart and well resourced."
      },
      {
        "type": "paragraph",
        "text": "We don't ask clients if they're AI-ready. We ask what workflow, this month, would visibly change if a model were doing part of it. If nobody in the room can answer in under a minute, there's no readiness problem to solve — there's a clarity problem, and no amount of infrastructure fixes that."
      },
      {
        "type": "paragraph",
        "text": "The companies actually pulling ahead right now didn't wait to become ready. They picked one unglamorous process, wired a model into it badly, watched it fail in specific ways, and fixed those specific ways. That's the whole method. It just doesn't fit on a slide."
      },
      {
        "type": "image",
        "src": "/photos/hero-silhouette-sunset.jpg",
        "alt": "Silhouette against a sunset sky"
      },
      {
        "type": "paragraph",
        "text": "If your AI strategy has a \"readiness phase,\" you already know what we'd tell you: skip it, and go build the smallest real thing you can point at in production."
      }
    ]
  },
  {
    "slug": "the-meeting-that-tells-you-everything",
    "title": "The Meeting That Tells You Everything",
    "excerpt": "One thirty-minute conversation, early on, predicts whether a project ships more reliably than any plan.",
    "minutes": 3,
    "date": "2025-09-25",
    "featuredImage": {
      "src": "/photos/hero-silhouette-sunset.jpg",
      "alt": "Silhouette against a sunset sky"
    },
    "content": [
      {
        "type": "paragraph",
        "text": "We can usually tell whether a project will ship inside the first kickoff call, before a single line of scope is agreed. It's not about budget, timeline, or how polished the deck is. It's about who's in the room and what they're allowed to decide."
      },
      {
        "type": "paragraph",
        "text": "The signal is simple: does the person with the authority to say yes also understand, in specific terms, what's being built? Not the pitch version — the actual mechanics. If the answer is no, the project is already in trouble, no matter how excited everyone sounds."
      },
      {
        "type": "paragraph",
        "text": "We've sat across from rooms full of enthusiasm and zero authority. Everyone nods, everyone's aligned, and then the actual decision-maker sees it for the first time three months later and asks a question that unravels the whole plan. That meeting should have happened in week one."
      },
      {
        "type": "quote",
        "text": "We've sat across from rooms full of enthusiasm and zero authority."
      },
      {
        "type": "paragraph",
        "text": "The inverse is just as telling. A skeptical, blunt stakeholder who asks hard questions early and has the power to greenlight or kill the thing is a far better sign than a room of easy agreement with no authority behind it. Friction up front is cheap. Friction at launch is not."
      },
      {
        "type": "paragraph",
        "text": "So we've started asking directly, before scoping anything: who in this room can say no, and are they here. If the honest answer is \"they'll review it later,\" we push to get them in the room instead of writing another page of requirements."
      },
      {
        "type": "image",
        "src": "/photos/hero-group-silhouette.jpg",
        "alt": "Group of silhouetted figures"
      },
      {
        "type": "paragraph",
        "text": "A plan with the wrong audience is not a smaller risk than no plan at all. It's the same risk, dressed up as progress."
      }
    ]
  },
  {
    "slug": "no-you-do-not-need-a-rebuild",
    "title": "No, You Don't Need a Rebuild",
    "excerpt": "The instinct to rebuild everything in month one is almost always a way of avoiding a smaller, harder decision.",
    "minutes": 3,
    "date": "2025-10-20",
    "featuredImage": {
      "src": "/photos/cover-orange-blur.jpg",
      "alt": "Abstract orange motion blur"
    },
    "content": [
      {
        "type": "paragraph",
        "text": "Almost every new client conversation eventually arrives at the same request: rebuild the whole platform, start clean, do it properly this time. It's an understandable instinct. The existing system is embarrassing, slow, patched together by three different agencies over five years. Starting over feels like relief."
      },
      {
        "type": "paragraph",
        "text": "It's usually the wrong call. A full rebuild trades a known, working, ugly system for an unknown one that won't be feature-complete for months, during which the business still has to run on the thing everyone hates."
      },
      {
        "type": "paragraph",
        "text": "What we tell clients instead: pick the single workflow that's costing the most time or money right now, and rebuild only that, in production, alongside the old system. Not a parallel prototype — a real replacement for one real slice of the business."
      },
      {
        "type": "quote",
        "text": "What we tell clients instead: pick the single workflow that's costing the most time or money right now, and rebuild only that, in production, alongside the old system."
      },
      {
        "type": "paragraph",
        "text": "This does two things a full rebuild can't. It proves the new approach against real usage within weeks instead of quarters, and it gives the team a concrete win to point to when the inevitable \"is this actually better\" question comes up internally."
      },
      {
        "type": "paragraph",
        "text": "Most of the time, once that first slice is live, the appetite for a ground-up rebuild quietly disappears. The old system turns out to be fine in the parts nobody was complaining about. The rebuild instinct was really just frustration with one bad workflow, misdiagnosed as an architecture problem."
      },
      {
        "type": "image",
        "src": "/photos/pillar-ai-transformation.jpg",
        "alt": "Abstract blue and violet light trails"
      },
      {
        "type": "paragraph",
        "text": "Rebuilds are sometimes genuinely necessary. But we've never once seen \"let's redo everything in month one\" turn out to be the right first move, and we've seen it proposed constantly."
      }
    ]
  },
  {
    "slug": "most-internal-tools-are-already-dying",
    "title": "Most Internal Tools Are Already Dying",
    "excerpt": "The moment a build is announced, most internal tools have already started their countdown to abandonment.",
    "minutes": 3,
    "date": "2025-11-05",
    "featuredImage": {
      "src": "/photos/hero-group-silhouette.jpg",
      "alt": "Group of silhouetted figures"
    },
    "content": [
      {
        "type": "paragraph",
        "text": "Most internal tools are dead within a year, and you can usually tell which ones on launch day. The tell isn't the tech. It's whether anyone owns the tool's problems after the launch party ends."
      },
      {
        "type": "paragraph",
        "text": "Internal tools get built to solve a founder's or a manager's frustration, ship to applause in a demo, and then get handed to whoever's available for support. Six months later a workflow changes upstream, the tool quietly stops matching reality, and everyone routes around it with a spreadsheet again."
      },
      {
        "type": "paragraph",
        "text": "External products survive because someone's revenue depends on fixing them. Internal tools have no such pressure. Nobody loses a sale when the internal dashboard is three weeks stale. That's precisely why they rot faster, not slower, than customer-facing software."
      },
      {
        "type": "quote",
        "text": "External products survive because someone's revenue depends on fixing them."
      },
      {
        "type": "paragraph",
        "text": "The fix isn't more polish at launch. It's assigning a named owner, with actual time budgeted, before the tool ships — not a team, one person whose job includes noticing when the tool drifts from what the business needs."
      },
      {
        "type": "paragraph",
        "text": "We also push clients to build internal tools smaller and rougher than they'd want. A tool built to be flexible for every future use case takes longer to build and creates more surface area to maintain. A tool built for exactly this quarter's problem, and rebuilt again next quarter, ages better than either extreme."
      },
      {
        "type": "image",
        "src": "/photos/pillar-product-engineering.jpg",
        "alt": "Warm abstract architectural texture"
      },
      {
        "type": "paragraph",
        "text": "If nobody can name the person responsible for a tool six months from now, don't build it yet. That conversation is cheaper before launch than the abandoned tool is after."
      }
    ]
  },
  {
    "slug": "busy-is-not-the-same-as-fast",
    "title": "Busy Is Not the Same as Fast",
    "excerpt": "A packed calendar and constant standups are usually signs of a team that isn't actually moving.",
    "minutes": 3,
    "date": "2025-12-01",
    "featuredImage": {
      "src": "/photos/cover-red-light-figure.jpg",
      "alt": "Silhouetted figure under red light"
    },
    "content": [
      {
        "type": "paragraph",
        "text": "The teams that look the busiest are rarely the fastest. Standups, status decks, alignment syncs, sprint reviews — all of it can run smoothly while nothing real ships for months. Busy is a performance. Fast is an outcome."
      },
      {
        "type": "paragraph",
        "text": "Fast teams have fewer meetings, not more, because most meetings exist to manufacture the feeling of progress when actual progress has stalled. If a team needs a daily standup to know what's happening, that's information the work itself should already be surfacing."
      },
      {
        "type": "paragraph",
        "text": "The real marker of a fast team is how quickly a wrong decision gets reversed. Slow teams defend decisions once made, because reversing one feels like admitting the process failed. Fast teams treat every decision as provisional until it survives contact with real users, and they change course without ceremony."
      },
      {
        "type": "quote",
        "text": "The real marker of a fast team is how quickly a wrong decision gets reversed."
      },
      {
        "type": "paragraph",
        "text": "We look for this in how a team talks about a mistake from last month. A fast team describes it plainly and what changed after. A team that's just busy tends to reframe it, or bury it in a longer story about circumstances."
      },
      {
        "type": "paragraph",
        "text": "None of this means fast teams are chaotic. They plan. They just plan around the next real decision point, not around a calendar of check-ins that exist to reassure people something is happening."
      },
      {
        "type": "image",
        "src": "/photos/pillar-gamification.jpg",
        "alt": "Vibrant abstract light pattern"
      },
      {
        "type": "paragraph",
        "text": "If your team's calendar is full and your roadmap hasn't moved in a month, that's not bad luck. That's the calendar doing the work the roadmap should be doing."
      }
    ]
  },
  {
    "slug": "we-changed-how-we-scope-agent-projects",
    "title": "We Changed How We Scope Agent Projects",
    "excerpt": "A handful of early failures taught us to scope AI agent work by the exception, not the happy path.",
    "minutes": 3,
    "date": "2025-12-16",
    "featuredImage": {
      "src": "/photos/pillar-product-engineering.jpg",
      "alt": "Warm abstract architectural texture"
    },
    "content": [
      {
        "type": "paragraph",
        "text": "Our first few agent projects were scoped the same way we'd scope any software feature: define the happy path, build it, demo it, ship it. That approach failed consistently, and it took us a couple of expensive lessons to understand why."
      },
      {
        "type": "paragraph",
        "text": "An agent doesn't fail like normal software fails. Normal software fails loudly, in ways a test suite catches. An agent fails quietly, by doing something plausible-sounding and wrong, and the person on the other end often can't tell the difference without checking the underlying data themselves."
      },
      {
        "type": "paragraph",
        "text": "So we stopped scoping agent projects around what the agent should do, and started scoping them around what happens when it's wrong. Who reviews it, how fast, at what cost, and what's the blast radius if nobody catches it that day."
      },
      {
        "type": "quote",
        "text": "So we stopped scoping agent projects around what the agent should do, and started scoping them around what happens when it's wrong."
      },
      {
        "type": "paragraph",
        "text": "That single shift changes almost everything about the build. It means investing early in the boring parts — logging, confidence signals, easy human override — instead of the flashy parts, because the boring parts are what makes an agent safe to actually put in front of real users."
      },
      {
        "type": "paragraph",
        "text": "It also changes what gets automated first. We now default to lower-stakes, high-volume tasks where a wrong answer costs minutes, not tasks where a wrong answer costs a customer relationship or a compliance headache."
      },
      {
        "type": "image",
        "src": "/photos/cover-neon-city.jpg",
        "alt": "Neon-lit city street at night"
      },
      {
        "type": "paragraph",
        "text": "None of this is exotic. It's the same discipline any production system needs. We just had to relearn it the hard way, because agents are convincing enough to make you forget they need it."
      }
    ]
  },
  {
    "slug": "gamification-is-not-a-feature-you-bolt-on",
    "title": "Gamification Is Not a Feature You Bolt On",
    "excerpt": "When a client asks for \"just add gamification,\" the real problem is almost never the absence of points and badges.",
    "minutes": 3,
    "date": "2026-01-10",
    "featuredImage": {
      "src": "/photos/pillar-ai-transformation.jpg",
      "alt": "Abstract blue and violet light trails"
    },
    "content": [
      {
        "type": "paragraph",
        "text": "\"Just add some gamification\" is one of the most common briefs we get, and it's almost always the wrong ask. Points, badges, and streaks don't fix a product people don't want to use — they just add noise on top of the reason they're leaving."
      },
      {
        "type": "paragraph",
        "text": "Gamification works when it amplifies a motivation that already exists. It fails when it's asked to manufacture motivation from nothing. A habit tracker with a streak counter works because people already wanted to build the habit. A boring internal form with a streak counter is still a boring form, now with a number that mocks you for skipping it."
      },
      {
        "type": "quote",
        "text": "Gamification works when it amplifies a motivation that already exists."
      },
      {
        "type": "paragraph",
        "text": "Before we design any game mechanic, we ask what the user was already trying to do, and where the product currently gets in their way. Usually the honest answer points at friction, unclear value, or a task that's genuinely tedious — not a lack of dopamine hooks."
      },
      {
        "type": "paragraph",
        "text": "When gamification is the right call, it's rarely the first thing we ship. It's layered on after the core experience actually works, to sustain behavior that's already proving valuable, not to disguise a weak core experience as something more exciting than it is."
      },
      {
        "type": "image",
        "src": "/photos/cover-red-light-figure.jpg",
        "alt": "Silhouetted figure under red light"
      },
      {
        "type": "paragraph",
        "text": "The clients who get the most out of gamification are the ones willing to hear that the brief needs to change. The ones who insist on points and leaderboards regardless usually end up with a product that's fun to demo once and abandoned within a month, same as any other tool nobody needed."
      }
    ]
  },
  {
    "slug": "speed-beats-polish-right-now",
    "title": "Speed Beats Polish Right Now",
    "excerpt": "In Saudi's current buildout, moving fast and rough is worth more than moving slow and finished.",
    "minutes": 3,
    "date": "2026-02-08",
    "featuredImage": {
      "src": "/photos/cover-neon-city.jpg",
      "alt": "Neon-lit city street at night"
    },
    "content": [
      {
        "type": "paragraph",
        "text": "Riyadh right now has more ambition than infrastructure to match it, and more budget than proven execution capacity. That gap is the opportunity, and most teams are answering it with the wrong instinct: polish."
      },
      {
        "type": "paragraph",
        "text": "Polish is what you optimize for in a mature, saturated market, where the baseline is already high and small refinements are the only lever left. That's not the market here. Here, an unglamorous, functional version of something shipped this quarter beats a beautifully designed version shipped next year, almost every time."
      },
      {
        "type": "paragraph",
        "text": "We see this constantly in how projects get pitched internally at client organizations. The polished deck wins the budget approval. The rough, working pilot wins the renewal. Those are different audiences with different standards, and confusing them is how good budgets fund things that never actually launch."
      },
      {
        "type": "quote",
        "text": "We see this constantly in how projects get pitched internally at client organizations."
      },
      {
        "type": "paragraph",
        "text": "Speed also compounds differently here than polish does. A team that ships something rough this month learns what the market actually wants by next month. A team polishing an unreleased product learns nothing except how to polish."
      },
      {
        "type": "paragraph",
        "text": "This isn't an argument for sloppy work — production still has to work every time, for every user, on real data. It's an argument against spending the scarce time this moment offers on refinements nobody asked for yet, before the core thing has even met a real user."
      },
      {
        "type": "image",
        "src": "/photos/cover-orange-blur.jpg",
        "alt": "Abstract orange motion blur"
      },
      {
        "type": "paragraph",
        "text": "The organizations that will define this buildout aren't the most polished ones today. They're the ones shipping real, working, slightly rough things fastest, and improving them in public."
      }
    ]
  },
  {
    "slug": "what-ten-minutes-tells-us",
    "title": "What Ten Minutes Tells Us",
    "excerpt": "We can usually tell whether a discovery call will lead anywhere within the first ten minutes.",
    "minutes": 2,
    "date": "2026-03-01",
    "featuredImage": {
      "src": "/photos/pillar-gamification.jpg",
      "alt": "Vibrant abstract light pattern"
    },
    "content": [
      {
        "type": "paragraph",
        "text": "We can usually tell within the first ten minutes of a discovery call whether it's going to lead to real work. It's not about budget size or industry. It's about how specific the pain is when someone describes it."
      },
      {
        "type": "paragraph",
        "text": "Vague pain sounds like \"we need to modernize\" or \"we want to leverage AI.\" Specific pain sounds like \"this report takes one person two days every month and it's always slightly wrong.\" One of these leads to a scoped, shippable project. The other leads to a strategy engagement that ends in a deck."
      },
      {
        "type": "quote",
        "text": "Vague pain sounds like \"we need to modernize\" or \"we want to leverage AI.\" Specific pain sounds like \"this report takes one person two days every month and it's always slightly wrong.\" One of these leads to a scoped, shippable project."
      },
      {
        "type": "paragraph",
        "text": "We also listen for who's talking. If the person who feels the pain most directly is in the room and describing it themselves, that's a strong signal. If it's being relayed secondhand by someone several layers removed, the brief will keep shifting as it passes back through those layers."
      },
      {
        "type": "paragraph",
        "text": "The third thing we listen for is what happens when we push back. We usually challenge some part of the initial ask within the first few minutes, on purpose. Clients who engage with the pushback and adjust their thinking on the spot tend to be great to work with. Clients who repeat the original ask, unchanged, are telling us the brief is fixed before the conversation even started."
      },
      {
        "type": "image",
        "src": "/photos/hero-silhouette-sunset.jpg",
        "alt": "Silhouette against a sunset sky"
      },
      {
        "type": "paragraph",
        "text": "None of this is about screening people out. It's about knowing, fast, whether we're about to scope something real or write a proposal that gets filed away. Ten minutes is usually enough to know which one we're in."
      }
    ]
  },
  {
    "slug": "we-stopped-pitching-decks",
    "title": "We Stopped Pitching Decks",
    "excerpt": "We used to open engagements with a strategy deck; now we open with a working pilot instead.",
    "minutes": 3,
    "date": "2026-04-12",
    "featuredImage": {
      "src": "/photos/pillar-product-engineering.jpg",
      "alt": "Warm abstract architectural texture"
    },
    "content": [
      {
        "type": "paragraph",
        "text": "For a while, every new engagement started the same way: weeks of discovery, a strategy deck, a roadmap, a big internal presentation to get sign-off. We don't do that anymore, and the change came from watching how little those decks actually predicted."
      },
      {
        "type": "paragraph",
        "text": "A strategy deck is a set of claims about what will work. It's persuasive, and it's cheap to produce compared to building something, which is exactly the problem. Nothing in a deck has been tested against a real user or real data, no matter how confident the slides sound."
      },
      {
        "type": "paragraph",
        "text": "Now, where we can, we skip straight to a small working pilot instead of a deck. Not a mockup — something a handful of real users actually touch, on real data, within the first couple of weeks. It's rougher than a polished proposal and far more honest."
      },
      {
        "type": "quote",
        "text": "Now, where we can, we skip straight to a small working pilot instead of a deck."
      },
      {
        "type": "paragraph",
        "text": "The pilot does the persuading a deck used to attempt. Either it works and the case for expanding it is obvious, or it doesn't and we've learned something specific and cheap, instead of something vague and expensive three months later."
      },
      {
        "type": "paragraph",
        "text": "This has changed our client conversations too. Instead of debating hypotheticals in a boardroom, we're debating what actually happened when real people used the thing. Those conversations are shorter, less political, and much harder to argue with."
      },
      {
        "type": "image",
        "src": "/photos/hero-group-silhouette.jpg",
        "alt": "Group of silhouetted figures"
      },
      {
        "type": "paragraph",
        "text": "We still write things down. We just stopped mistaking the writing for the work."
      }
    ]
  },
  {
    "slug": "it-was-never-a-communication-problem",
    "title": "It Was Never a Communication Problem",
    "excerpt": "Cross-functional teams don't stall because people won't talk to each other; they stall over who actually decides.",
    "minutes": 3,
    "date": "2026-05-20",
    "featuredImage": {
      "src": "/photos/cover-red-light-figure.jpg",
      "alt": "Silhouetted figure under red light"
    },
    "content": [
      {
        "type": "paragraph",
        "text": "When a cross-functional project stalls, everyone reaches for the same diagnosis: we need better communication. More syncs, a shared channel, a weekly alignment meeting. It rarely works, because communication was rarely the actual problem."
      },
      {
        "type": "paragraph",
        "text": "The real problem is almost always unclear decision rights. Design, engineering, and business all have a say, nobody has final say, and every disagreement quietly becomes a negotiation instead of a decision. More communication just means the negotiation happens more often, and more visibly."
      },
      {
        "type": "paragraph",
        "text": "You can spot this pattern by watching what happens after a disagreement gets \"resolved\" in a meeting. If the same disagreement resurfaces two weeks later in a different form, it wasn't resolved — it was postponed, because nobody actually had the authority to close it."
      },
      {
        "type": "quote",
        "text": "You can spot this pattern by watching what happens after a disagreement gets \"resolved\" in a meeting."
      },
      {
        "type": "paragraph",
        "text": "The fix isn't a better meeting cadence. It's naming, explicitly, who owns the final call in each area, and holding to it even when other functions disagree. That feels uncomfortable in cultures that prize consensus, but consensus without an owner just means the loudest or most senior voice wins by default, dressed up as agreement."
      },
      {
        "type": "paragraph",
        "text": "We've started asking clients, before a project starts, to name a single decision-owner for each major tradeoff — not a committee, one person. It cuts meeting time immediately, because there's no longer a reason to relitigate settled questions with everyone in the room."
      },
      {
        "type": "image",
        "src": "/photos/pillar-ai-transformation.jpg",
        "alt": "Abstract blue and violet light trails"
      },
      {
        "type": "paragraph",
        "text": "Teams that communicate constantly and decide nothing will always look busier than teams that communicate less and decide fast. Only one of them ships."
      }
    ]
  },
  {
    "slug": "what-we-got-wrong-about-pricing",
    "title": "What We Got Wrong About Pricing",
    "excerpt": "Underpricing early engineering work didn't buy us goodwill; it bought us clients who valued us accordingly.",
    "minutes": 3,
    "date": "2026-07-02",
    "featuredImage": {
      "src": "/photos/hero-silhouette-sunset.jpg",
      "alt": "Silhouette against a sunset sky"
    },
    "content": [
      {
        "type": "paragraph",
        "text": "Early on, we priced engineering work the way most young studios do: as low as we could stand, to win the relationship and prove ourselves. If we could go back, we'd tell ourselves that plan doesn't work the way it sounds like it should."
      },
      {
        "type": "paragraph",
        "text": "Underpricing doesn't buy goodwill. It buys a client relationship anchored to a number, and numbers are sticky. The next project, the renewal, the referral conversation — all of it gets measured against that first low price, regardless of how much value showed up in between."
      },
      {
        "type": "paragraph",
        "text": "It also attracts a specific kind of client: one optimizing for cost first. Those clients rarely become the ones who trust you with judgment calls later, because the relationship was never about judgment to begin with — it was about being the cheapest credible option in the room."
      },
      {
        "type": "quote",
        "text": "It also attracts a specific kind of client: one optimizing for cost first."
      },
      {
        "type": "paragraph",
        "text": "What we'd do differently is price for the decision quality we bring, not the hours we spend. A senior team making the right call in a week is worth more than a junior team grinding through the wrong plan for a month, and pricing that reflects hours alone punishes exactly the speed clients say they want."
      },
      {
        "type": "paragraph",
        "text": "We'd also stop treating a lower price as a way to de-risk a new relationship. It doesn't. A client testing whether you're worth the higher price is a better filter than a client who only showed up because the price was low. The first kind sticks around after the first project. The second kind negotiates the next one down further."
      },
      {
        "type": "image",
        "src": "/photos/pillar-product-engineering.jpg",
        "alt": "Warm abstract architectural texture"
      },
      {
        "type": "paragraph",
        "text": "Price like the outcome-first team you actually are. Clients who don't want that were never going to be the good long-term ones anyway."
      }
    ]
  }
];
