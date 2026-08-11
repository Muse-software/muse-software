import type { CareerRole } from "../shared";

/**
 * Arabic career records. Batch 3 of the content programme
 * (docs/i18n-plan.md section 9). DRAFT, NOT REVIEWED, same gate as
 * `../ar/services.ts`.
 *
 * `department` stays an English union value because `shared.ts` types it as
 * one and the careers filter compares against it. Translating the value here
 * would silently break the filter, which is the same trap Phase 2 hit with the
 * form select values (plan section 15, correction 4).
 *
 * The visible department name is resolved separately, from
 * `Careers.departments` in the message catalogue. That lookup did not exist
 * until 2026-08-03 — the value was rendered raw, so /ar/careers showed
 * "Strategy", "Marketing" and "Engineering" in Latin in the filter row and
 * again on every card. Adding a role with a new department means adding its
 * label to both catalogues.
 */
export const careerRoles: CareerRole[] = [
  {
    slug: "business-developer",
    title: "مطوّر أعمال",
    department: "Strategy",
    blurb: "أنت أول من يتواصل معه العميل المحتمل، وتكمل معه لين توقيع المشروع.",
    location: "الرياض، السعودية (من المقر)",
    employmentType: "دوام كامل",
    compensation: "تنافسي، حسب الخبرة",
    responsibilities: [
      "تأهيل فرص الأعمال الجديدة في قطاعاتنا المستهدفة",
      "متابعة مسار الفرص من أول تواصل حتى توقيع العقد",
      "تمثيل الاستوديو في اجتماعات العملاء والعروض والتفاوض على المقترحات",
      "تحديد نطاق المشاريع مع فريق التنفيذ قبل أن نعد العميل بأي شيء",
      "البقاء قريبين من عملائنا الحاليين، ورصد أين يمكن أن نخدمهم أكثر",
    ],
    requirements: [
      "خبرة 3 سنوات فأكثر في تطوير الأعمال أو المبيعات أو الاستشارات المباشرة مع العملاء",
      "إتقان العربية والإنجليزية",
      "القدرة على بيع خدمات تقنية ورقمية لصنّاع القرار في المؤسسات",
      "الإقامة في الرياض أو الاستعداد للانتقال إليها",
    ],
    niceToHaves: [
      "شبكة علاقات قائمة في المؤسسات السعودية أو القطاعات القريبة من الحكومة",
      "خلفية في الوكالات الرقمية أو الاستشارات أو مبيعات البرمجيات كخدمة",
    ],
  },
  {
    slug: "digital-marketing-director",
    title: "مدير التسويق الرقمي",
    department: "Marketing",
    blurb: "تملّك حضورنا أمام الناس، والطلب اللي يجي منه.",
    location: "الرياض، السعودية (من المقر)",
    employmentType: "دوام كامل",
    compensation: "تنافسي، حسب الخبرة",
    responsibilities: [
      "تملّك استراتيجية التسويق عندنا عبر المحتوى والتواصل الاجتماعي والإعلانات المدفوعة والشراكات",
      "تشغيل محرك المحتوى خلف النشرة البريدية وكل ما ننشره",
      "تشغيل حملات تحوّل الاهتمام إلى عملاء محتملين",
      "إدارة اتساق العلامة في كل نقطة تماس عامة",
      "رفع تقارير عمّا ينجح فعلًا، وإعادة توزيع الميزانية والجهد بناءً عليها",
    ],
    requirements: [
      "خبرة 5 سنوات فأكثر في قيادة التسويق لشركة تعمل مع الشركات أو بنموذج الوكالة",
      "مهارة كتابة قوية، مع القدرة على إنتاج المحتوى أو توجيهه عن قرب بنفسه",
      "القدرة على تملّك ميزانية والقياس على أثرها في مسار الفرص",
      "إتقان العربية والإنجليزية",
    ],
    niceToHaves: [
      "خبرة في تسويق منتجات تقنية أو منتجات ذكاء اصطناعي لمشتري المؤسسات",
      "قيادة تسويق داخل شركة سابقًا، مو في الوكالات فقط",
    ],
  },
  {
    slug: "gtm-engineer",
    title: "مهندس GTM",
    department: "Engineering",
    blurb: "دخول السوق لازم يشتغل مثل المنتج. أنت تبني الأدوات والأتمتة اللي توصله لهناك.",
    location: "الرياض، السعودية (من المقر أو هجين)",
    employmentType: "دوام كامل",
    compensation: "تنافسي، حسب الخبرة",
    responsibilities: [
      "بناء وصيانة الأدوات الداخلية التي تشغّل التواصل الخارجي وتوجيه الفرص والتقارير",
      "أتمتة عمليات التسليم بين التسويق والمبيعات والتنفيذ حتى لا يسقط شيء",
      "دمج أنظمة إدارة العملاء والتحليلات وأدوات التواصل في مسار واحد يعمل",
      "بناء نماذج أوّلية لسير عمل مدعوم بالذكاء الاصطناعي لتأهيل الفرص الواردة وترتيب أولوياتها",
      "العمل مباشرة مع تطوير الأعمال والتسويق لإطلاق ما يحتاجونه فعلًا",
    ],
    requirements: [
      "مهارة قوية في البرمجة النصية والأتمتة (JavaScript أو TypeScript أو Python)",
      "خبرة في دمج واجهات البرمجة بين أنظمة إدارة العملاء والبريد والتحليلات",
      "القدرة على العمل مباشرة مع معنيين من خارج الهندسة",
      "الإقامة في الرياض أو الاستعداد للانتقال إليها",
    ],
    niceToHaves: [
      "خبرة في أطر الوكلاء الأذكياء أو الأتمتة المبنية على النماذج اللغوية",
      "عمل سابق في هندسة GTM أو عمليات الإيرادات أو هندسة المبيعات",
    ],
  },
];
