import type { Service } from "../shared";

export const services: Service[] = [
  {
    slug: "product-strategy-discovery",
    icon: "gear",
    title: "Product Strategy & Discovery",
    summary: "Find the product decision worth making before the feature list takes over.",
    cta: "Shape the product",
    intro: [
      "A product can be well built and still solve the wrong problem. We start by getting clear on the market, the user, and the decision the product has to earn.",
      "Where a proven model already exists, we study why it works and what must change for this market. Where the question is new, we turn it into something concrete enough to test."
    ],
    approachHeading: "How we approach discovery",
    approachIntro: [
      "Discovery should reduce the cost of a wrong decision. It should not become a research project with no product at the end.",
      "We research, map, challenge, prototype, and narrow the work until the next product decision is clear."
    ],
    pillars: [
      {
        title: "Start with evidence",
        body: "We examine the market, comparable products, existing behavior, and the constraints already shaping the opportunity."
      },
      {
        title: "Find the decision",
        body: "A product usually turns on a few important choices. We identify those before a backlog makes every feature look equally urgent."
      },
      {
        title: "Design for this market",
        body: "Local institutions, habits, language, and operating realities change the product itself, not only its copy."
      }
    ],
    whyHeadline: "A long backlog can hide an unresolved product decision",
    whyReasons: [
      "Teams collect requests before agreeing on the problem they are solving.",
      "Competitor features get copied without understanding the behavior that made them work.",
      "Local constraints appear late, after the product shape is already expensive to change.",
      "Research keeps expanding because nobody has defined what evidence would change the decision."
    ],
    whatWeDoHeadline: "We turn an open question into a product direction you can act on.",
    whatWeDo: [
      {
        title: "Market and Product Teardowns",
        body: "A structured look at proven products, their key decisions, and where their model does or does not transfer."
      },
      {
        title: "User and Workflow Research",
        body: "Interviews and workflow mapping focused on what people do today, where the friction sits, and what must change."
      },
      {
        title: "Opportunity Framing",
        body: "A clear statement of the audience, problem, constraints, and product bet, so the team is solving the same thing."
      },
      {
        title: "Scope and Roadmap",
        body: "The smallest coherent release, the decisions it must test, and what waits until the evidence supports it."
      },
      {
        title: "Concept Prototypes",
        body: "Clickable product concepts that make the direction discussable before production work begins."
      }
    ],
    faq: [
      {
        q: "Do you validate ideas before building?",
        a: "We test the decisions that can be tested before build, then define the smallest real release needed to answer what research alone cannot."
      },
      {
        q: "Can you work from an existing product idea?",
        a: "Yes. We can sharpen an existing idea, examine the model behind a proven product, or untangle a backlog that has lost its product direction."
      },
      {
        q: "What comes out of discovery?",
        a: "A product direction, a defined first scope, the reasoning behind the important choices, and a prototype when the experience needs to be tested visibly."
      }
    ]
  },
  {
    slug: "product-experience-design",
    icon: "share",
    title: "Product & Experience Design",
    summary: "Turn a product idea into an experience people can understand, use, and trust.",
    cta: "Design the experience",
    intro: [
      "A polished screen cannot rescue a broken flow. We design the decisions, states, and interactions that make the product make sense from the first action to the last.",
      "The work stays connected to engineering from the start, so the experience is designed for the product that will actually ship."
    ],
    approachHeading: "How we design",
    approachIntro: [
      "We make the product tangible early. A working flow exposes weak assumptions faster than a long specification.",
      "We map, sketch, prototype, test, and refine until the product has a coherent system behind every screen."
    ],
    pillars: [
      {
        title: "Flow before finish",
        body: "We resolve the journey, hierarchy, and key decisions before visual polish makes a weak structure expensive to change."
      },
      {
        title: "Every state counts",
        body: "Empty, loading, error, offline, and edge cases are part of the product, so they are designed with the main path."
      },
      {
        title: "Design with engineering",
        body: "Design and engineering work against the same constraints, which keeps the intended experience intact through build."
      }
    ],
    whyHeadline: "Most product friction lives between the screens",
    whyReasons: [
      "The happy path looks finished while errors and empty states are left to chance.",
      "Navigation reflects the company structure instead of the task a person came to complete.",
      "Visual decisions drift because the product has components but no coherent system.",
      "Design is handed over as static screens, leaving the important interaction decisions unresolved."
    ],
    whatWeDoHeadline: "We design the product as a system, then make it real enough to test.",
    whatWeDo: [
      {
        title: "Experience Architecture",
        body: "The journeys, information structure, and interaction model that hold the product together."
      },
      {
        title: "Interface Design",
        body: "Clear, purposeful screens built around the task, content, and decisions in front of the user."
      },
      {
        title: "Interactive Prototypes",
        body: "Clickable flows for testing behavior and alignment before production code carries the cost of change."
      },
      {
        title: "Design Systems",
        body: "Reusable tokens, components, states, and rules that keep the product coherent as it grows."
      },
      {
        title: "Product Testing",
        body: "Structured sessions around real tasks, followed by concrete changes to the flow and interface."
      }
    ],
    faq: [
      {
        q: "Do you only design new products?",
        a: "No. We can shape a new product, repair a specific journey, or bring an inconsistent existing interface into one coherent system."
      },
      {
        q: "Do you deliver static screens or working prototypes?",
        a: "The format follows the decision. Key journeys are made interactive when behavior needs to be tested, while production details are documented in the design system."
      },
      {
        q: "How does design work with engineering?",
        a: "They work against the same product constraints from the start. That reduces handoff loss and keeps implementation decisions visible while the experience is still being shaped."
      }
    ]
  },
  {
    "slug": "ai-transformation",
    "icon": "gear",
    "title": "AI Transformation",
    "summary": "Your AI strategy, executed all the way to production, not just decked.",
    "cta": "Plan the transformation",
    "image": "/photos/pillar-ai-transformation.jpg",
    "intro": [
      "The gap compounds every quarter you wait. Businesses that stay AI-absent get left behind by the ones that moved.",
      "We build your AI strategy and run it across three fronts: product, process, and people."
    ],
    "approachHeading": "Strategy",
    "approachIntro": [
      "No 6-month diagnostics. No 100-slide strategy decks with nothing behind them.",
      "We get straight to it. A 2 to 6 week audit that finds the AI use cases actually worth doing, what they're worth, and what it takes to ship them.",
      "Every engagement ends with a clear adoption report your team can run with, or hand back to us for execution."
    ],
    "pillars": [
      {
        "title": "Product Transformation",
        "body": "Rebuilding what you ship so AI is native to the product, not bolted onto it.",
        "crossLinkSlug": "product-engineering",
        "crossLinkLabel": "Just interested in Product Engineering?"
      },
      {
        "title": "Process Transformation",
        "body": "We look at how the work actually flows, automate the parts that are worth it, and train the team so the change holds."
      },
      {
        "title": "People Transformation",
        "body": "Training built for your team and the tools they'll actually use, run as hands-on workshops, not slideware."
      }
    ],
    "whyHeadline": "Becoming AI-native is hard, and nobody does it for you",
    "whyReasons": [
      "No one owns AI transformation internally, so it stalls or gets half-finished.",
      "Deep technical AI expertise is required, but rarely available in-house.",
      "Getting people to actually use it takes real training and buy-in, not a memo from the top.",
      "Most consultancies overcharge, are under-qualified, or separate strategy from execution entirely."
    ],
    "whatWeDoHeadline": "We run it with you, from the first audit to systems in production.",
    "whatWeDo": [
      {
        "title": "Process Survey",
        "body": "We find where the workflow actually breaks, and what fixing it is worth."
      },
      {
        "title": "Executive Survey",
        "body": "We sit with leadership to get clear on the priorities, and where AI is actually worth doing."
      },
      {
        "title": "Expert Interviews",
        "body": "We talk to the people who run each part of the business, so the plan matches how it really works."
      },
      {
        "title": "Custom Training Programs",
        "body": "Training built around the AI tools your team will actually use, run hands-on."
      },
      {
        "title": "AI Tooling",
        "body": "The actual systems, built from a mix of off-the-shelf tools, our own, and custom code."
      }
    ],
    "faq": [
      {
        "q": "How long before we see something concrete?",
        "a": "The audit runs 2 to 6 weeks and ends with a clear adoption report your team can act on, whether you run it yourselves or hand execution back to us."
      },
      {
        "q": "Do you only advise, or do you build it too?",
        "a": "Both. We run it with you from the first audit all the way to systems running in production, not a strategy deck we hand off."
      },
      {
        "q": "What does AI transformation actually cover?",
        "a": "Three fronts: product, process, and people, so the change lands in what you ship, how you operate, and how your team works."
      }
    ]
  },
  {
    "slug": "product-engineering",
    "icon": "shield",
    "title": "Product Engineering",
    "summary": "Production-grade software, shipped fast, without dropping the quality bar.",
    "cta": "Build the product",
    "image": "/photos/pillar-product-engineering.jpg",
    "intro": [
      "From first prototype to production scale, we design and ship production-grade software fast, without dropping the quality bar to get there."
    ],
    "approachHeading": "What we believe",
    "approachIntro": [],
    "pillars": [
      {
        "title": "We hire the best",
        "body": "One senior engineer can do more than ten mediocre ones, so that's who we hire."
      },
      {
        "title": "We use AI (a lot)",
        "body": "We use the best off-the-shelf AI tools, and build our own to move faster."
      },
      {
        "title": "We hold a written quality bar",
        "body": "Every state designed, real data only, and nothing ships that we would not use ourselves."
      },
      {
        "title": "We measure ourselves on what shipped",
        "body": "Planned is not done. The only status that counts is running in production."
      }
    ],
    "whyHeadline": "Hiring in-house is slow, risky, and extremely important",
    "whyReasons": [
      "The right hire can take months to land, and you need them now.",
      "Hiring senior engineers has never been more expensive.",
      "Speed is a real edge when the market moves this fast.",
      "Unwinding slow, AI-resistant habits inside an existing team is genuinely difficult."
    ],
    "whatWeDoHeadline": "We work inside your team, not from a distance.",
    "whatWeDo": [
      {
        "title": "Application Development",
        "body": "Full-stack builds, from backend APIs to frontend UI, handled end to end."
      },
      {
        "title": "Fine-Tuning Models",
        "body": "Tuning models to your actual use cases, not a generic benchmark."
      },
      {
        "title": "Code Migration & Refactors",
        "body": "Language migrations, version upgrades, and codebase restructuring."
      },
      {
        "title": "Data Engineering & Analysis",
        "body": "Data warehouse migrations, cleaning, and preprocessing pipelines that hold up."
      },
      {
        "title": "Custom Agentic Solutions",
        "body": "AI agents built to do a specific job inside your business."
      }
    ],
    "whyWorkHeadline": "We work inside the tools your team already uses.",
    "whyWorkWithUs": [
      {
        "title": "Dedicated Team",
        "body": "A technical product manager and engineers who support your product end to end."
      },
      {
        "title": "Agile By Default",
        "body": "Priorities move, and we move with them. You redirect the work whenever you need to, not at a fixed checkpoint."
      },
      {
        "title": "Shared Tracking",
        "body": "We work inside your existing tracker, whichever one your team already lives in."
      },
      {
        "title": "Regular Check-ins",
        "body": "Calls to review where things stand and what's next."
      },
      {
        "title": "Something Working, Early",
        "body": "You see the product running in front of you throughout, not in a single reveal at the end."
      },
      {
        "title": "Shared Comms",
        "body": "A shared channel for real-time updates, not a support queue."
      }
    ],
    "faq": [
      {
        "q": "Are you a dev shop or something else?",
        "a": "We work inside your team, not from a distance, with a technical product manager and senior engineers who stay from first prototype to production."
      },
      {
        "q": "How soon do we see working software?",
        "a": "You see the product running in front of you throughout, not in a single reveal at the end."
      },
      {
        "q": "How do you keep quality up while moving fast?",
        "a": "There's a written quality bar: every state designed, real data only, and nothing ships that we wouldn't use ourselves."
      }
    ]
  },
  {
    "slug": "gamification-experience",
    "icon": "share",
    "title": "Gamification & Experience",
    "summary": "Turn adoption into something people actually want to do.",
    "cta": "Design the experience",
    "image": "/photos/pillar-gamification.jpg",
    "intro": [
      "Interactive, rewarding digital experiences that make change stick instead of stalling out."
    ],
    "approachHeading": "What we believe",
    "approachIntro": [],
    "pillars": [
      {
        "title": "Behavior beats decoration",
        "body": "A badge means nothing if it doesn't change what someone does next."
      },
      {
        "title": "The first win matters most",
        "body": "People decide whether to come back in their first two minutes, not their tenth session."
      },
      {
        "title": "Prototypes beat specs",
        "body": "We'd rather hand you something clickable in week one than a deck about what it might feel like."
      }
    ],
    "whyHeadline": "Adoption dies quietly, long before anyone notices",
    "whyReasons": [
      "New tools compete with old habits, and habits usually win by default.",
      "Most onboarding is a tour, not an experience, and people forget it by day two.",
      "Reward systems built without behavioral grounding train the wrong behavior.",
      "Without instrumentation, you find out adoption failed months after it did."
    ],
    "whatWeDoHeadline": "We design the experience people actually stick with.",
    "whatWeDo": [
      {
        "title": "Reward System Design",
        "body": "Points, streaks, and milestones tuned to the behavior you actually want to encourage."
      },
      {
        "title": "Onboarding Journeys",
        "body": "Guided first-run experiences that get people to their first win fast."
      },
      {
        "title": "Interactive Prototypes",
        "body": "Playable, clickable demos stakeholders can feel before production code is written."
      },
      {
        "title": "Engagement Analytics",
        "body": "Instrumentation that shows exactly where people drop off, and why."
      }
    ],
    "whyWorkHeadline": "We build the experience and the engineering behind it.",
    "whyWorkWithUs": [
      {
        "title": "One Team, Start to Finish",
        "body": "The same team that designs the experience ships it, with no handoff gap."
      },
      {
        "title": "Weekly Playable Builds",
        "body": "You're clicking through something real every week, not reviewing static comps."
      },
      {
        "title": "Data From Day One",
        "body": "Engagement tracking is built in from the first release, not bolted on later."
      }
    ],
    "faq": [
      {
        "q": "Is this just points and badges?",
        "a": "No. A badge means nothing if it doesn't change what someone does next, so we design reward systems around the behavior you actually want."
      },
      {
        "q": "When do we get to try something?",
        "a": "Early. You're clicking through something real week by week, instead of reviewing a deck about how it might feel."
      },
      {
        "q": "How do we know adoption is actually working?",
        "a": "Engagement tracking is built in from the first release, so you see exactly where people drop off, and why, not months later."
      }
    ]
  }
];
