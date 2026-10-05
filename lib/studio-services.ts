export const studioServices = {
  en: [
    {
      slug: "product-strategy-discovery",
      title: "Product strategy",
      summary:
        "Define who the product is for, what they need, and what to build first.",
      situation: "You have an idea. The next decision is less obvious.",
      intro:
        "Perhaps you know the problem but not the right product. Or you have a long list of features without a clear first release. We help you decide who to build for, what matters to them, and where to begin.",
      work: [
        [
          "Understand the people",
          "Map what people do today, what gets in their way, and what would make a meaningful difference.",
        ],
        [
          "Test the assumptions",
          "Study comparable products, explore the market, and put the important questions in front of real users.",
        ],
        [
          "Shape the first release",
          "Define the smallest useful version, its priorities, and the decisions that need more evidence.",
        ],
      ],
      outputs: [
        "A clear problem and audience",
        "A focused first-release scope",
        "A prototype when the journey needs testing",
      ],
      example: [
        "A booking idea, before the build",
        "You want to make booking a local service easier. Before adding payments, loyalty and an app, we map how customers currently find a time and confirm a booking.",
        "Can someone complete the booking without calling for help?",
      ],
      intent: "build",
    },
    {
      slug: "product-experience-design",
      title: "Experience design",
      summary:
        "Design the user journey and screens, with a prototype you can try.",
      situation: "The product works. The experience can work harder.",
      intro:
        "If customers hesitate, abandon a task, or need someone to explain the screen, the journey deserves attention. We bring the decisions, interface and feedback into one coherent experience.",
      work: [
        [
          "Map the journey",
          "Find the unnecessary steps, unclear choices, and gaps between what people expect and what the product does.",
        ],
        [
          "Make it tangible",
          "Design a working prototype that lets you try the important tasks before the product is built.",
        ],
        [
          "Build a consistent system",
          "Bring typography, components, motion and every meaningful state together, ready for implementation.",
        ],
      ],
      outputs: [
        "A clearer user journey",
        "Interactive interface prototypes",
        "An implementable design system",
      ],
      example: [
        "An enquiry that people can finish",
        "A form asks for too much before explaining what happens next. We test a shorter journey, sensible defaults, helpful errors, and a clear completion state.",
        "Can a first-time visitor complete the task without an explanation?",
      ],
      intent: "improve",
    },
    {
      slug: "product-engineering",
      title: "Websites & software",
      summary:
        "Build websites and apps, connect your systems, and test before handover.",
      situation: "You need something dependable, from the first release.",
      intro:
        "A customer-facing website, a mobile app, or an internal business platform. We connect the experience to the systems behind it, then test the details that matter in everyday use.",
      work: [
        [
          "Define what needs to work",
          "Agree on the essential journeys, integrations, content and operating constraints before implementation.",
        ],
        [
          "Build in visible steps",
          "Bring design and engineering together. Review working software as it develops, so decisions stay connected to the real product.",
        ],
        [
          "Prepare for real use",
          "Check key tasks, device sizes, loading and errors. Agree on handover and the support the product will need.",
        ],
      ],
      outputs: [
        "Working website or application",
        "Tested core journeys and integrations",
        "Documentation and an agreed handover",
      ],
      example: [
        "A service website that earns its place",
        "Visitors need to understand the offer, choose a service and send an enquiry. The team needs those enquiries to arrive reliably and contain useful context.",
        "Does the whole journey work, including the message that reaches your team?",
      ],
      intent: "build",
    },
    {
      slug: "ai-transformation",
      title: "AI & automation",
      summary:
        "Connect your tools and automate repeated steps, with human review where needed.",
      situation: "Too much time goes into moving information around.",
      intro:
        "We start with the workflow: repeated data entry, disconnected tools, or information that is hard to find. Then we decide where automation or AI can help, and where a person needs to stay in control.",
      work: [
        [
          "Find the useful opportunity",
          "Observe the existing process and identify the repetitive steps, delays, and decisions worth improving.",
        ],
        [
          "Connect the right systems",
          "Build focused automations or AI features around the tools your team actually uses.",
        ],
        [
          "Make oversight part of the design",
          "Include review steps, clear limits, failure recovery and a way to check the result.",
        ],
      ],
      outputs: [
        "A mapped workflow and clear opportunity",
        "A focused automation or AI feature",
        "Human review and recovery paths",
      ],
      example: [
        "From a customer request to a reviewed reply",
        "Incoming requests arrive in different formats. A system can organise them and prepare a draft, while a person checks the details before anything is sent.",
        "Does it reduce repetitive work while keeping the team in control?",
      ],
      intent: "ai",
    },
    {
      slug: "gamification-experience",
      title: "Engagement & gamification",
      summary:
        "Design onboarding, progress and rewards that help people reach their goals.",
      situation: "People try the product. Then the habit fades.",
      intro:
        "A reward alone is rarely enough. We look at the behaviour you want to support, the effort it takes, and how the experience can make progress understandable and satisfying.",
      work: [
        [
          "Understand the motivation",
          "Find out what matters to the user, where they lose momentum, and which behaviour is actually useful.",
        ],
        [
          "Design meaningful progress",
          "Shape onboarding, feedback and rewards around real milestones, rather than adding points to every action.",
        ],
        [
          "Test the experience",
          "Try the loop with people, look for confusion or pressure, and refine it around healthy, useful participation.",
        ],
      ],
      outputs: [
        "A clear behaviour and motivation model",
        "Onboarding and progress flows",
        "A testable engagement experience",
      ],
      example: [
        "A learning journey that feels achievable",
        "A new learner sees a clear first activity, useful feedback, and the next small milestone. Progress reflects what they learned rather than time spent clicking.",
        "Does the experience help someone make progress they care about?",
      ],
      intent: "improve",
    },
  ],
  ar: [
    {
      slug: "product-strategy-discovery",
      // Landing-page card copy (approved content review); other pages use summary.
      homeSummary: "نساعدك توضح فكرة المنتج، تحدد فرصته، وترتب أولوياته قبل ما تستثمر في بنائه.",
      title: "استراتيجية المنتج",
      // "What we do" card description (approved content review).
      summary: "نساعدك توضح فكرة المنتج، تحدد فرصته، وترتب أولوياته قبل ما تستثمر في بنائه.",
      points: ["بحث وفهم المستخدم والسوق", "تحديد الفرص وأولويات المنتج", "خارطة طريق واضحة للتطوير"],
      situation: "الفكرة موجودة. والخطوة التالية تحتاج وضوح.",
      intro: "نرتب الصورة قبل التطوير: نفهم المستخدم، نختبر الفرضيات، ونحدد أول نسخة من المنتج.",
      work: [["نفهم الناس", "نفهم كيف يستخدم الناس المنتج، وين يواجهون صعوبة، وأين توجد فرصة للتحسين."], ["نختبر الافتراضات", "نراجع السوق والمنافسين، ونختبر الفرضيات الأساسية مع المستخدمين قبل اتخاذ القرارات."], ["نحدد أول نسخة", "نرتب الأولويات ونحدد أول نسخة تركز على ما يحتاجه المنتج فعلاً."]],
      outputs: ["مشكلة واضحة وجمهور محدد", "أولويات ونطاق واضح للإصدار الأول", "نموذج أولي لاختبار الفكرة والتجربة"],
      // Approved content review: service page hero copy, related pair, closing.
      heroSummary: "نحوّل الفكرة إلى اتجاه واضح للمنتج، من فهم المستخدم إلى تحديد الأولويات وما يستحق البناء أولاً.",
      related: ["product-experience-design", "product-engineering"],
      closing: "عندك فكرة وتحتاج لها اتجاه أوضح؟",
      scopeNote: true,
      example: [
        "فكرة حجز، قبل التنفيذ",
        "تبغى تسهّل حجز خدمة محلية. قبل إضافة الدفع والولاء والتطبيق، نفهم كيف يختار العميل الموعد وكيف يتأكد حجزه.",
        "هل يقدر العميل يكمل الحجز بدون ما يتصل يطلب مساعدة؟",
      ],
      intent: "build",
    },
    {
      slug: "product-experience-design",
      // Landing-page card copy (approved content review); other pages use summary.
      homeSummary: "نحوّل الفكرة إلى تجربة سهلة وواضحة، ونصمم رحلة المستخدم والواجهات قبل التطوير.",
      title: "تصميم التجربة الرقمية",
      // "What we do" card description (approved content review).
      summary: "نصمم تجارب رقمية مبنية على فهم المستخدم، ونختبرها قبل تحويلها إلى منتج.",
      points: ["بحث المستخدم وتحليل احتياجاته", "تصميم تجربة المستخدم والواجهات", "اختبارات الاستخدام وتحسين التجربة"],
      situation: "التجربة الأفضل تبدأ من فهم المستخدم.",
      intro: "نسمع من المستخدمين، نراجع سلوكهم، ونختبر معهم الحلول قبل ما تتحول إلى قرارات تصميم.",
      work: [["نفهم المستخدم", "نبحث، نسأل، ونراقب كيف يستخدم الناس المنتج عشان نفهم احتياجاتهم ونقاط التعثر."], ["نصمم ونختبر", "نحوّل الأفكار إلى نماذج تفاعلية، ونختبرها مع المستخدمين قبل بدء التطوير."], ["نبني تجربة حول المستخدم", "نحوّل ما تعلمناه من البحث والاختبار إلى تجربة متماسكة وواجهات جاهزة للتطوير."]],
      outputs: ["رحلة مستخدم مبنية على بحث فعلي", "نماذج تفاعلية قابلة للاختبار", "نظام تصميم جاهز للتطوير"],
      // Approved content review: service page hero copy, related pair, closing.
      heroSummary: "نقرب من المستخدم، نفهم احتياجه، ونصمم تجربة مبنية على سلوكه واستخدامه الفعلي.",
      related: ["product-strategy-discovery", "product-engineering"],
      closing: "عندك تجربة تحتاج نفهمها ونطوّرها؟",
      scopeNote: true,
      example: [
        "نموذج تواصل يقدر الناس يكملونه",
        "النموذج يطلب معلومات كثيرة قبل ما يوضح وش بيصير بعدها. نختبر رحلة أقصر، خيارات مناسبة، أخطاء مفهومة، وتأكيد واضح.",
        "هل يقدر زائر جديد يكمل المهمة بدون شرح؟",
      ],
      intent: "improve",
    },
    {
      slug: "product-engineering",
      // Landing-page card copy (approved content review); other pages use summary.
      homeSummary: "نحوّل التصميم إلى منتج يعمل، ونبني المواقع والتطبيقات ونربطها بالأنظمة المطلوبة.",
      title: "هندسة وتطوير البرمجيات",
      // "What we do" card description (approved content review).
      summary: "نحوّل التصميم إلى منتج رقمي متكامل، من التطوير والربط إلى الاختبار والإطلاق.",
      points: ["تطوير المواقع والتطبيقات", "تكامل الأنظمة والخدمات", "اختبار المنتج وتجهيزه للإطلاق"],
      situation: "منتج يعتمد عليه، من أول إصدار.",
      intro: "موقع لعملائك، تطبيق لفريقك، أو منصة تدير أعمالك. نربط المنتج بالأنظمة اللي يعتمد عليها، ونختبر التفاصيل اللي تظهر في الاستخدام اليومي.",
      work: [["نحدد المطلوب", "نحدد الوظائف الأساسية، التكاملات، ومتطلبات التشغيل قبل بدء التطوير."], ["نبني بخطوات واضحة", "نطوّر المنتج على مراحل، ونراجع ما تم بناؤه باستمرار لضمان جودة التنفيذ قبل الانتقال للمرحلة التالية."], ["نجهز للإطلاق", "نختبر الوظائف، الأداء، والأجهزة المختلفة، ونجهز المنتج للإطلاق والتسليم."]],
      outputs: ["موقع أو تطبيق جاهز للاستخدام", "تكاملات وربط أنظمة مختبرة", "توثيق واضح وتسليم منظم"],
      // Approved content review: service page hero copy, related pair, closing.
      heroSummary: "نحوّل التصميم إلى منتج رقمي متكامل، من التطوير والربط إلى الاختبار والإطلاق.",
      related: ["product-strategy-discovery", "product-experience-design"],
      closing: "جاهز تحوّل التصميم إلى منتج يعمل؟",
      scopeNote: true,
      example: [
        "موقع خدمات يؤدي غرضه",
        "الزائر يحتاج يفهم العرض ويختار الخدمة ويرسل استفساره. والفريق يحتاج الاستفسار يوصل بشكل موثوق ومعه تفاصيل مفيدة.",
        "هل الرحلة كاملة تعمل، إلى الرسالة اللي توصل لفريقك؟",
      ],
      intent: "build",
    },
    {
      slug: "ai-transformation",
      // Landing-page card copy (approved content review); other pages use summary.
      homeSummary: "نستخدم الذكاء الاصطناعي والأتمتة لتبسيط العمليات وتقليل العمل المتكرر.",
      title: "الذكاء الاصطناعي والأتمتة",
      // "What we do" card description (approved content review).
      summary: "ندعم المنتجات والعمليات بتقنيات الذكاء الاصطناعي والأتمتة لرفع الكفاءة وتبسيط العمل.",
      points: ["دمج الذكاء الاصطناعي في المنتجات والخدمات", "أتمتة العمليات وسير العمل", "ربط الأدوات والأنظمة لتقليل العمل اليدوي"],
      situation: "أعمال تتكرر كل يوم، ويمكن إنجازها بشكل أذكى.",
      intro: "نربط الأنظمة والأدوات، ونستخدم الأتمتة والذكاء الاصطناعي لتقليل الخطوات اليدوية وتسريع العمليات، مع إبقاء القرارات المهمة تحت المراجعة البشرية.",
      work: [["نفهم طريقة العمل", "نفهم كيف تنتقل المعلومات بين الفريق والأنظمة، وأي خطوات يمكن تبسيطها أو أتمتتها."], ["نربط ونؤتمت", "نربط الأدوات والأنظمة، ونبني تدفقات آلية أو قدرات ذكاء اصطناعي داخل العمليات الحالية."], ["نحدد دور الإنسان", "نحدد ما يمكن تنفيذه تلقائيًا، وما يحتاج مراجعة أو قرار بشري، مع مسار واضح للتعامل مع الحالات غير المتوقعة."]],
      outputs: ["فرصة واضحة للتحسين والأتمتة", "أتمتة أو ميزة ذكية قابلة للاستخدام", "مسارات واضحة للمراجعة ومعالجة الأخطاء"],
      // Approved content review: service page hero copy, related pair, closing.
      heroSummary: "ندعم المنتجات والعمليات بالذكاء الاصطناعي والأتمتة لتقليل العمل المتكرر ورفع الكفاءة.",
      related: ["product-strategy-discovery", "product-experience-design"],
      closing: "عندك عملية تحتاج تصير أبسط وأذكى؟",
      scopeNote: false,
      example: [
        "من طلب العميل إلى رد يراجعه الفريق",
        "طلبات العملاء توصل بصيغ مختلفة. النظام يقدر يرتّبها ويجهز مسودة رد، والموظف يراجع التفاصيل قبل الإرسال.",
        "هل خفّ العمل المتكرر وبقي التحكم بيد الفريق؟",
      ],
      intent: "ai",
    },
    {
      slug: "gamification-experience",
      // Landing-page card copy (approved content review); other pages use summary.
      homeSummary: "نصمم آليات تفاعل وتقدم ومكافآت تشجع المستخدم على الاستمرار وتحقيق هدفه.",
      title: "التلعيب",
      // "What we do" card description (approved content review).
      summary: "نصمم تجارب تفاعلية تستخدم التقدم والتحفيز والمكافآت لدعم سلوك المستخدم وتحقيق أهداف المنتج.",
      points: ["تصميم أنظمة التقدم والتحفيز", "المكافآت وآليات التفاعل", "قياس التفاعل وتحسين التجربة"],
      situation: "جذب المستخدم بداية. الاستمرار هو التحدي.",
      intro: "التلعيب مو مجرد نقاط ومكافآت. نفهم دوافع المستخدم، ونصمم التقدم والتفاعل بطريقة تعطيه سبب واضح للاستمرار.",
      work: [["نفهم الدافع", "نفهم وش يحفّز المستخدم، متى يفقد اهتمامه، وأي سلوك نحتاج ندعمه داخل التجربة."], ["نصمّم تقدّم له معنى", "نصمم مسارات التقدم والتحفيز والمكافآت حول أهداف واضحة تناسب طبيعة المنتج والمستخدم."], ["نختبر التجربة", "نختبر التجربة مع المستخدمين، نراقب التفاعل، ونحسّن ما يشجّع على الاستمرار بدون ضغط أو تعقيد."]],
      outputs: ["تصور واضح للدوافع والسلوك", "رحلات تهيئة وتقدم واضحة", "نموذج تفاعلي قابل للاختبار"],
      // Approved content review: service page hero copy, related pair, closing.
      heroSummary: "نحوّل التفاعل إلى تجربة تشجّع المستخدم على التقدم والاستمرار، باستخدام التحفيز والمكافآت بطريقة تخدم هدف المنتج.",
      heroTitle: "التلعيب (Gamification)",
      related: ["product-strategy-discovery", "product-experience-design"],
      closing: "تبغى تفاعل يستمر، مو بس يبدأ؟",
      scopeNote: false,
      example: [
        "رحلة تعلّم بخطوات ممكنة",
        "يشوف المتعلم نشاط أول واضح، ملاحظات مفيدة، والهدف الصغير التالي. التقدّم يعكس اللي تعلّمه، مو عدد النقرات.",
        "هل التجربة تساعده يتقدّم في شيء يهمّه؟",
      ],
      intent: "improve",
    },
  ],
} as const;
