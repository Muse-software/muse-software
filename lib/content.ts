export type Service = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  approach: string;
  breakdown: string[];
  deliverables: string[];
  tools: string[];
  caseProof: string;
  image: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  outcome: string;
  metric: string;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string[];
  techStack: string[];
  results: string[];
  testimonial: string;
  image: string;
};

export type Insight = {
  slug: string;
  title: string;
  category: "Strategy" | "Engineering" | "Operations" | "Research";
  excerpt: string;
  minutes: number;
  date: string;
  sections: { id: string; title: string; content: string[] }[];
};

export const services: Service[] = [
  {
    slug: "ai-transformation",
    title: "AI Transformation",
    summary:
      "Rewire enterprise workflows with agentic systems and measurable outcomes.",
    problem:
      "Legacy operations hide decision latency, fragmented data, and manual approvals.",
    approach:
      "We map value streams, identify automation leverage, and deploy AI copilots with guardrails.",
    breakdown: [
      "Opportunity and ROI mapping",
      "Agent design and policy governance",
      "Workflow orchestration and telemetry",
      "Change management enablement",
    ],
    deliverables: [
      "Transformation roadmap",
      "AI operating model",
      "Automation playbooks",
      "Executive dashboards",
    ],
    tools: ["OpenAI", "LangGraph", "Databricks", "Snowflake", "Vercel"],
    caseProof:
      "Reduced approval cycles by 42% across a global logistics network.",
    image: "linear-gradient(135deg, #9120a6 0%, #ec5544 100%)",
  },
  {
    slug: "ai-engineering",
    title: "AI Engineering",
    summary:
      "Ship production-grade AI systems with strong observability and guardrails.",
    problem:
      "Teams struggle to move from prototypes to dependable, secure AI services.",
    approach:
      "We design model pipelines, retrieval systems, and evaluation harnesses that scale.",
    breakdown: [
      "Model selection and evaluation",
      "Retrieval and vector infrastructure",
      "LLM safety and policy enforcement",
      "Latency and cost optimization",
    ],
    deliverables: [
      "Production AI services",
      "Prompt and evaluation suites",
      "Monitoring dashboards",
      "Security and compliance docs",
    ],
    tools: ["Next.js", "Postgres", "Pinecone", "Modal", "OpenTelemetry"],
    caseProof:
      "Delivered sub-500ms response times for a finance intelligence agent.",
    image: "linear-gradient(135deg, #ec5544 0%, #f8bf54 100%)",
  },
  {
    slug: "digital-systems",
    title: "Digital Systems",
    summary:
      "Modern platforms, portals, and data layers built for scale and trust.",
    problem:
      "Disconnected systems slow down growth and create operational risk.",
    approach:
      "We architect secure, composable stacks that unlock faster product velocity.",
    breakdown: [
      "Platform strategy and roadmap",
      "System architecture and migration",
      "Data layer modernization",
      "Performance and security hardening",
    ],
    deliverables: [
      "Platform blueprint",
      "Core system rebuild",
      "Performance playbooks",
      "Runbooks and handoff",
    ],
    tools: ["Next.js", "Kubernetes", "Terraform", "Sentry", "Stripe"],
    caseProof:
      "Cut infrastructure costs by 28% while doubling release velocity.",
    image: "linear-gradient(135deg, #f8bf54 0%, #9120a6 100%)",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "axiom-logistics",
    client: "Axiom Logistics",
    industry: "Global Freight",
    outcome: "42% faster approvals",
    metric: "$18.4M revenue lift",
    summary:
      "Agentic routing and approvals system that removed bottlenecks across 14 regions.",
    challenge:
      "Routing approvals relied on manual reviews that slowed every shipment.",
    strategy:
      "Unified data sources and deployed AI approval agents with policy constraints.",
    execution: [
      "Built a retrieval layer across shipment, risk, and pricing data.",
      "Integrated approval agents with human escalation paths.",
      "Instrumented monitoring for latency and decision quality.",
    ],
    techStack: ["Next.js", "LangGraph", "Snowflake", "Vercel Edge"],
    results: [
      "42% reduction in approval time",
      "31% fewer manual escalations",
      "99.9% uptime for routing services",
    ],
    testimonial:
      "Muse rebuilt our approval backbone without disrupting operations.",
    image: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
  },
  {
    slug: "nova-finance",
    client: "Nova Finance",
    industry: "FinTech",
    outcome: "Sub-500ms AI answers",
    metric: "58% higher analyst throughput",
    summary:
      "Enterprise knowledge agent delivering instant compliance-grade insights.",
    challenge:
      "Analysts spent hours searching through compliance and policy updates.",
    strategy:
      "Created a secure retrieval stack with evaluation harnesses and guardrails.",
    execution: [
      "Built vector search with governance metadata.",
      "Implemented evaluation pipelines for factuality.",
      "Deployed observability across cost and latency.",
    ],
    techStack: ["Postgres", "Pinecone", "OpenTelemetry", "Next.js"],
    results: [
      "500ms median response time",
      "58% increase in analyst capacity",
      "SOC2-ready audit trails",
    ],
    testimonial: "The system feels like a senior analyst who never sleeps.",
    image: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  },
  {
    slug: "lumen-health",
    client: "Lumen Health",
    industry: "Healthcare",
    outcome: "28% lower infra cost",
    metric: "2x release velocity",
    summary:
      "Modernized clinical operations with a secure, scalable digital backbone.",
    challenge:
      "Legacy apps blocked clinical workflows and slowed release cycles.",
    strategy: "Replatformed to a modular architecture with shared services.",
    execution: [
      "Migrated critical workflows to a new service mesh.",
      "Established CI/CD with compliance checks.",
      "Introduced observability for operational readiness.",
    ],
    techStack: ["Kubernetes", "Terraform", "Sentry", "Next.js"],
    results: [
      "28% infrastructure cost reduction",
      "2x faster releases",
      "Zero critical downtime incidents",
    ],
    testimonial: "Their architecture unlocked our next five years of growth.",
    image: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
  },
  {
    slug: "titan-retail",
    client: "Titan Retail Group",
    industry: "Retail & E-Commerce",
    outcome: "18% faster checkout",
    metric: "$42M incremental revenue",
    summary:
      "AI-powered personalization engine driving conversion and customer lifetime value.",
    challenge:
      "Generic product recommendations left revenue on the table during peak seasons.",
    strategy:
      "Built a real-time recommendation service using collaborative filtering and contextual embeddings.",
    execution: [
      "Ingested 5 years of transaction and behavioral data into a feature store.",
      "Trained and deployed ranking models with A/B testing infrastructure.",
      "Integrated into checkout flow with 50ms latency SLA.",
    ],
    techStack: ["MLflow", "Feast", "Redis", "PostgreSQL", "Next.js"],
    results: [
      "18% faster average checkout time",
      "23% higher cart conversion",
      "15% increase in average order value",
    ],
    testimonial:
      "The personalization doubled our peak-season capacity without scaling servers.",
    image: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
  },
  {
    slug: "prism-insurance",
    client: "Prism Insurance",
    industry: "InsurTech",
    outcome: "60% faster claims",
    metric: "$8.2M savings",
    summary:
      "Claims triage agent that routes and escalates with regulatory confidence.",
    challenge:
      "Claims agents spent hours documenting and categorizing incoming claims.",
    strategy:
      "Deployed an NLP-backed agent with policy-layer guardrails and explainability.",
    execution: [
      "Built document extraction pipeline using vision models.",
      "Trained intent classification on 50K+ historical claims.",
      "Implemented human-in-the-loop validation for edge cases.",
    ],
    techStack: ["Claude", "LangChain", "Typesense", "AWS Lambda", "Next.js"],
    results: [
      "60% reduction in triage time",
      "94% accuracy on fraud flags",
      "SOC2 audit trail for all decisions",
    ],
    testimonial:
      "Regulators trusted the system because every decision was auditable and explained.",
    image: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
  },
  {
    slug: "nexus-manufacturing",
    client: "Nexus Manufacturing",
    industry: "Manufacturing",
    outcome: "22% uptime gain",
    metric: "$11.5M avoided downtime",
    summary:
      "Predictive maintenance system reducing unplanned equipment failures.",
    challenge:
      "Reactive maintenance led to production line stoppages and lost capacity.",
    strategy:
      "Created a sensor data pipeline with ML-based anomaly detection and alert routing.",
    execution: [
      "Connected 400+ industrial sensors via MQTT to a central streaming platform.",
      "Developed anomaly detection models trained on 2 years of operational data.",
      "Built mobile alerts for maintenance teams with diagnostic context.",
    ],
    techStack: [
      "Kafka",
      "TensorFlow",
      "InfluxDB",
      "Prometheus",
      "React Native",
    ],
    results: [
      "22% increase in equipment uptime",
      "35% fewer emergency repairs",
      "50% faster MTTR on fault detection",
    ],
    testimonial:
      "We caught critical faults before they became production emergencies.",
    image: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
  },
  {
    slug: "apex-energy",
    client: "Apex Energy",
    industry: "Energy & Utilities",
    outcome: "19% load optimization",
    metric: "$28.3M energy cost reduction",
    summary:
      "Smart grid optimization using real-time demand forecasting and asset allocation.",
    challenge:
      "Manual load balancing across generation assets incurred peak surcharges.",
    strategy:
      "Built a real-time optimization engine predicting demand 4-6 hours ahead.",
    execution: [
      "Ingested weather, calendar, and historical demand signals.",
      "Trained ensemble models for demand forecasting by region.",
      "Integrated with dispatch systems for automated asset allocation.",
    ],
    techStack: ["XGBoost", "Prophet", "Spark", "Kubernetes", "Grafana"],
    results: [
      "19% reduction in peak-hour load",
      "12% overall energy cost savings",
      "99.97% uptime for optimization service",
    ],
    testimonial:
      "The system paid for itself in the first optimization quarter.",
    image: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
  },
  {
    slug: "pulse-fintech",
    client: "Pulse FinTech",
    industry: "FinTech",
    outcome: "3.2x fraud catch rate",
    metric: "$16.7M fraud prevented",
    summary:
      "Real-time fraud detection system protecting 8M+ daily transactions.",
    challenge:
      "Manual review caused false positives that frustrated customers and slowed approval.",
    strategy:
      "Deployed a graph-based fraud detection model with explainability.",
    execution: [
      "Built transaction knowledge graph tracking user entities and patterns.",
      "Trained GNN-based fraud classifier on 18 months of labeled data.",
      "Integrated with payment processor for sub-100ms decision latency.",
    ],
    techStack: ["DGL", "PyTorch", "ArangoDB", "gRPC", "Next.js"],
    results: [
      "3.2x increase in caught fraud",
      "2.1% false positive rate (vs 8% baseline)",
      "Reduced customer friction on approvals",
    ],
    testimonial:
      "The graph approach caught sophisticated fraud patterns we never saw before.",
    image: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  },
];

export const insights: Insight[] = [
  {
    slug: "ai-operating-models",
    title: "AI Operating Models That Scale",
    category: "Strategy",
    excerpt:
      "Structure AI initiatives around measurable value streams and accountable owners.",
    minutes: 6,
    date: "2026-02-12",
    sections: [
      {
        id: "problem",
        title: "The bottleneck",
        content: [
          "Most AI initiatives stall because ownership is unclear and metrics are shallow.",
          "Define clear value streams before you invest in tooling.",
        ],
      },
      {
        id: "strategy",
        title: "The operating model",
        content: [
          "Align executives on a single scoreboard tied to revenue, risk, or time saved.",
          "Design cross-functional squads with AI governance embedded from day one.",
        ],
      },
      {
        id: "execution",
        title: "Execution focus",
        content: [
          "Build a delivery cadence that prioritizes experimentation with guardrails.",
          "Instrument every release with quality and adoption telemetry.",
        ],
      },
    ],
  },
  {
    slug: "trustworthy-agents",
    title: "Engineering Trustworthy AI Agents",
    category: "Engineering",
    excerpt:
      "Reliability comes from evaluation harnesses, not just bigger models.",
    minutes: 7,
    date: "2026-01-28",
    sections: [
      {
        id: "problem",
        title: "Why agents fail",
        content: [
          "Agents fail when data is stale, policies are unclear, and monitoring is absent.",
          "Reliability is a system property, not a model feature.",
        ],
      },
      {
        id: "strategy",
        title: "Evaluation first",
        content: [
          "Define success criteria and build evaluation suites before deployment.",
          "Human-in-the-loop review is essential for critical workflows.",
        ],
      },
      {
        id: "execution",
        title: "Production guardrails",
        content: [
          "Add policy enforcement, red teaming, and continuous retrieval checks.",
          "Deploy telemetry for latency, cost, and response quality.",
        ],
      },
    ],
  },
  {
    slug: "ai-ops-metrics",
    title: "AI Ops Metrics That Matter",
    category: "Operations",
    excerpt: "Measure AI with the same rigor as any revenue-critical system.",
    minutes: 5,
    date: "2026-01-10",
    sections: [
      {
        id: "problem",
        title: "Hidden cost centers",
        content: [
          "Without clear metrics, AI costs balloon while outcomes stagnate.",
          "Track value delivery in the same dashboards as your core systems.",
        ],
      },
      {
        id: "strategy",
        title: "Unified telemetry",
        content: [
          "Combine latency, cost, and adoption metrics into a single view.",
          "Set thresholds for drift, hallucination, and SLA risk.",
        ],
      },
      {
        id: "execution",
        title: "Continuous improvement",
        content: [
          "Run monthly cost and quality reviews with accountable owners.",
          "Automate alerts for regressions before users feel them.",
        ],
      },
    ],
  },
  {
    slug: "edge-deployment",
    title: "Edge Deployment for Global AI",
    category: "Research",
    excerpt:
      "Edge-ready architectures keep AI experiences fast and compliant worldwide.",
    minutes: 8,
    date: "2025-12-19",
    sections: [
      {
        id: "problem",
        title: "Latency kills adoption",
        content: [
          "Global teams need low-latency AI systems with consistent policy enforcement.",
          "Centralized deployments struggle under regional compliance needs.",
        ],
      },
      {
        id: "strategy",
        title: "Edge-first strategy",
        content: [
          "Use edge caching and regional routing to keep inference fast.",
          "Pair with localized data policies and audit trails.",
        ],
      },
      {
        id: "execution",
        title: "Scaling playbook",
        content: [
          "Measure regional performance and tune caching strategies.",
          "Automate failover and load shedding for resilience.",
        ],
      },
    ],
  },
  {
    slug: "rag-retrieval-patterns",
    title: "RAG Architecture Patterns for Enterprise",
    category: "Engineering",
    excerpt:
      "Move beyond vector search to hybrid retrieval systems that rank by relevance and recency.",
    minutes: 9,
    date: "2026-02-01",
    sections: [
      {
        id: "problem",
        title: "Vector search limitations",
        content: [
          "Pure semantic search returns stale or irrelevant results when documents have similar embeddings.",
          "Enterprise data requires multi-signal ranking: relevance, freshness, metadata, user context.",
        ],
      },
      {
        id: "strategy",
        title: "Hybrid retrieval",
        content: [
          "Combine vector search with BM25, metadata filtering, and temporal decay.",
          "Rank candidates using learnable scoring functions calibrated on user feedback.",
        ],
      },
      {
        id: "execution",
        title: "Implementation",
        content: [
          "Use Postgres with pgvector for vectors and native full-text search.",
          "Implement LLM-as-judge re-ranking for top-k results.",
          "Track retrieval metrics: precision@k, latency, user satisfaction.",
        ],
      },
    ],
  },
  {
    slug: "llm-fine-tuning",
    title: "When and How to Fine-Tune LLMs",
    category: "Engineering",
    excerpt:
      "Fine-tuning is rarely the answer. Here's the decision tree for your use case.",
    minutes: 6,
    date: "2026-01-15",
    sections: [
      {
        id: "problem",
        title: "The fine-tuning trap",
        content: [
          "Teams assume fine-tuning solves hallucination, cost, or latency—it doesn't address root causes.",
          "Fine-tuning is expensive, slow to iterate, and hard to roll back.",
        ],
      },
      {
        id: "strategy",
        title: "Decision tree",
        content: [
          "Domain knowledge? Use RAG + prompt engineering first.",
          "Cost reduction? Optimize token usage, use smaller models, or batch requests.",
          "Style consistency? Few-shot examples in the prompt is often enough.",
        ],
      },
      {
        id: "execution",
        title: "When to fine-tune",
        content: [
          "Fine-tuning makes sense for format-specific tasks (classification, extraction) with 100+ labeled examples.",
          "Use a small model (7B-13B), validate on holdout set, and monitor for distribution shift.",
        ],
      },
    ],
  },
  {
    slug: "ai-cost-governance",
    title: "AI Cost Governance and Unit Economics",
    category: "Operations",
    excerpt:
      "Track cost per decision, cost per user, and cost per dollar of value unlocked.",
    minutes: 7,
    date: "2026-01-05",
    sections: [
      {
        id: "problem",
        title: "AI costs balloon silently",
        content: [
          "Token costs multiply across inference, fine-tuning, and feedback loops.",
          "Without bucketing by use case, teams miss optimization opportunities.",
        ],
      },
      {
        id: "strategy",
        title: "Governance framework",
        content: [
          "Tag every API call with business context: use case, user segment, decision type.",
          "Calculate unit economics: cost per request, cost per conversion, ROI by feature.",
        ],
      },
      {
        id: "execution",
        title: "Monitoring",
        content: [
          "Build dashboards tracking cost trends, cost per model, cost anomalies.",
          "Set cost budgets by use case and alert on overages.",
          "Monthly reviews with product and finance to justify spending.",
        ],
      },
    ],
  },
  {
    slug: "guardrails-safety",
    title: "Safety Guardrails Without Blocking Value",
    category: "Strategy",
    excerpt:
      "Implement policy as code, not as friction. Let guardrails guide behavior without killing UX.",
    minutes: 8,
    date: "2025-12-28",
    sections: [
      {
        id: "problem",
        title: "Over-strict safety kills adoption",
        content: [
          "Heavy-handed content filters block legitimate use cases.",
          "Users circumvent restrictions, leading to worse outcomes.",
        ],
      },
      {
        id: "strategy",
        title: "Graceful degradation",
        content: [
          "Use soft guardrails: warn, suggest alternatives, log for review.",
          "Hard blocks only for truly dangerous situations (fraud, phishing).",
          "Let humans override with audit trail.",
        ],
      },
      {
        id: "execution",
        title: "Framework",
        content: [
          "Implement policy as composable rules in policy engine (e.g., Open Policy Agent).",
          "Measure false positive and false negative rates.",
          "Iterate with domain experts and user feedback.",
        ],
      },
    ],
  },
  {
    slug: "agentic-workflows",
    title: "Designing Reliable Agentic Workflows",
    category: "Strategy",
    excerpt:
      "Agents need clear boundaries, measurable success criteria, and human override paths.",
    minutes: 10,
    date: "2025-12-01",
    sections: [
      {
        id: "problem",
        title: "Agents are unreliable by default",
        content: [
          "Open-ended instruction following leads to hallucination, infinite loops, and cost overruns.",
          "Agents need explicit constraints and termination conditions.",
        ],
      },
      {
        id: "strategy",
        title: "Bounded agency",
        content: [
          "Define a fixed action space: agents can only call specific tools.",
          "Set max iterations and cost caps per request.",
          "Require human approval before high-stakes actions (transfers, deletions).",
        ],
      },
      {
        id: "execution",
        title: "Best practices",
        content: [
          "Use structured outputs and validation to prevent malformed commands.",
          "Log all decisions and intermediate steps for auditing.",
          "Test agents with adversarial inputs and edge cases before production.",
          "Monitor for new failure modes and collect feedback for retraining.",
        ],
      },
    ],
  },
];
