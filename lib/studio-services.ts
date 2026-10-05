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
      summary: "نحدد مين بيستخدم المنتج، وش يحتاج، ووش نبني أولًا.",
      situation: "الفكرة موجودة. والخطوة التالية تحتاج وضوح.",
      intro:
        "يمكن تعرف المشكلة لكن مو متأكد من شكل المنتج، أو عندك قائمة مزايا طويلة وما تعرف من وين تبدأ. نساعدك تحدد لمين تبني، وش يهمّه، ووش يستحق يكون في أول نسخة.",
      work: [
        [
          "نفهم الناس",
          "نراجع كيف ينجز المستخدم مهمته اليوم، وين يتعثر، ووش التغيير اللي يفيده.",
        ],
        [
          "نختبر الافتراضات",
          "ندرس المنتجات المشابهة والسوق، ونعرض الأسئلة المهمة على المستخدمين.",
        ],
        [
          "نحدد أول نسخة",
          "نرتّب الأولويات ونحدد أصغر نسخة مفيدة، والقرارات اللي تحتاج دليل أكثر.",
        ],
      ],
      outputs: [
        "مشكلة وجمهور محددان",
        "نطاق واضح للإصدار الأول",
        "نموذج تفاعلي عند الحاجة لاختبار الرحلة",
      ],
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
      summary: "نصمم رحلة المستخدم والشاشات، ونجهّز نموذج تقدر تجرّبه.",
      situation: "المنتج يعمل. والتجربة تستحق اهتمام أكثر.",
      intro:
        "إذا العميل يتردد، يترك المهمة، أو يحتاج أحد يشرح له الشاشة، فالرحلة تحتاج مراجعة. نجمع القرارات والواجهة والتفاعل في تجربة متماسكة.",
      work: [
        [
          "نراجع الرحلة",
          "نحدد الخطوات الزائدة والخيارات المربكة والفجوة بين توقع المستخدم وما يقدمه المنتج.",
        ],
        [
          "نجعل الفكرة ملموسة",
          "نصمّم نموذج تفاعلي تقدر تجرب فيه المهام الأساسية قبل التنفيذ.",
        ],
        [
          "نبني نظام متسق",
          "نوحّد الخطوط والمكونات والحركة والحالات المهمة، ونجهزها للتطوير.",
        ],
      ],
      outputs: [
        "رحلة مستخدم أوضح",
        "نماذج تفاعلية للواجهات",
        "نظام تصميم قابل للتنفيذ",
      ],
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
      summary: "نبني مواقع وتطبيقات، ونربطها بأنظمتك ونختبرها قبل التسليم.",
      situation: "تحتاج منتج يعتمد عليه، من أول إصدار.",
      intro:
        "موقع لعملائك، تطبيق للجوال، أو منصة لإدارة أعمالك. نربط التجربة بالأنظمة اللي تشغّلها، ونختبر التفاصيل اللي تفرق في الاستخدام اليومي.",
      work: [
        [
          "نحدد المطلوب",
          "نتفق على الرحلات الأساسية وربط الأنظمة والمحتوى ومتطلبات التشغيل قبل التنفيذ.",
        ],
        [
          "نبني بخطوات واضحة",
          "التصميم والتطوير يمشون مع بعض. تراجع معنا منتج يعمل أثناء بنائه، والقرارات تبقى قريبة من الواقع.",
        ],
        [
          "نجهز للاستخدام",
          "نختبر المهام والأجهزة والتحميل والأخطاء، ونتفق على التسليم والدعم اللي يحتاجه المنتج.",
        ],
      ],
      outputs: [
        "موقع أو تطبيق يعمل",
        "رحلات أساسية وربط أنظمة مختبر",
        "توثيق وخطة تسليم متفق عليها",
      ],
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
      summary: "نربط أدواتك ونؤتمت الخطوات المتكررة، مع مراجعة بشرية عند الحاجة.",
      situation: "وقت كثير يضيع في نقل المعلومات.",
      intro:
        "نبدأ من الإجراء نفسه: إدخال متكرر، أدوات منفصلة، أو معلومات يصعب الوصول لها. بعدها نحدد وين تفيد الأتمتة أو الذكاء الاصطناعي، ووين لازم يبقى القرار بيد الإنسان.",
      work: [
        [
          "نحدد الفرصة المفيدة",
          "نراجع العمل الحالي ونحدد التكرار والتأخير والقرارات اللي تستحق تحسين.",
        ],
        [
          "نربط الأنظمة المناسبة",
          "نبني أتمتة أو مزايا ذكية حول الأدوات اللي يستخدمها فريقك فعلًا.",
        ],
        [
          "نصمّم المراجعة والتحكم",
          "نضيف خطوات مراجعة وحدود واضحة وطريقة للتعامل مع الأخطاء والتحقق من النتيجة.",
        ],
      ],
      outputs: [
        "إجراء موثّق وفرصة واضحة",
        "أتمتة مركزة أو ميزة ذكية",
        "مسارات مراجعة ومعالجة للأخطاء",
      ],
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
      summary: "نصمم البداية والتقدم والمكافآت عشان المستخدم يحقق هدفه.",
      situation: "الناس تجرّب المنتج. وبعدين يقل الاستخدام.",
      intro:
        "المكافأة وحدها غالبًا ما تكفي. نفهم السلوك اللي تبغى تدعمه، والجهد اللي يحتاجه، وكيف نخلي التقدّم واضح وله قيمة.",
      work: [
        [
          "نفهم الدافع",
          "نحدد وش يهم المستخدم، وين يفقد حماسه، ووش السلوك المفيد له فعلًا.",
        ],
        [
          "نصمّم تقدّم له معنى",
          "نبني البداية والتفاعل والمكافآت حول إنجازات حقيقية تناسب طبيعة المنتج.",
        ],
        [
          "نختبر التجربة",
          "نجرب مع الناس، نبحث عن الارتباك أو الضغط، ونعدّل عشان تكون المشاركة مفيدة ومريحة.",
        ],
      ],
      outputs: [
        "تصور واضح للسلوك والدافع",
        "رحلات تهيئة وتقدّم",
        "تجربة تفاعل قابلة للاختبار",
      ],
      example: [
        "رحلة تعلّم بخطوات ممكنة",
        "يشوف المتعلم نشاط أول واضح، ملاحظات مفيدة، والهدف الصغير التالي. التقدّم يعكس اللي تعلّمه، مو عدد النقرات.",
        "هل التجربة تساعده يتقدّم في شيء يهمّه؟",
      ],
      intent: "improve",
    },
  ],
} as const;
