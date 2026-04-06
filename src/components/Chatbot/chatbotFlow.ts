export interface ChatOption {
  label: string;
  nextNodeId: string;
}

export interface ChatNode {
  id: string;
  message: string;
  options?: ChatOption[];
  /** If true, show a free-text input instead of (or in addition to) quick replies */
  allowFreeText?: boolean;
  /** If set, render a link button (e.g. to schedule or call) */
  action?: {
    type: "link" | "phone" | "consultation";
    label: string;
    href?: string;
  };
}

export const chatbotFlow: Record<string, ChatNode> = {
  // ── Root ──────────────────────────────────────────────
  welcome: {
    id: "welcome",
    message:
      "Welcome to Borshchak Law Group. I'm here to help you find the information you need - no pressure, just guidance. How can I assist you today?",
    options: [
      { label: "I need help with a family law matter", nextNodeId: "area_select" },
      { label: "I'd like to schedule a consultation", nextNodeId: "schedule" },
      { label: "I have a general question", nextNodeId: "general_question" },
    ],
  },

  // ── Practice area selection ───────────────────────────
  area_select: {
    id: "area_select",
    message: "I understand - taking this step can feel overwhelming, but you're in the right place. Which area best describes your situation?",
    options: [
      { label: "Divorce", nextNodeId: "divorce" },
      { label: "Child Custody", nextNodeId: "custody" },
      { label: "Child Support", nextNodeId: "child_support" },
      { label: "Property & Assets", nextNodeId: "assets" },
      { label: "Spousal Support / Alimony", nextNodeId: "spousal_support" },
      { label: "Something else", nextNodeId: "other_area" },
    ],
  },

  // ── Divorce branch ────────────────────────────────────
  divorce: {
    id: "divorce",
    message:
      "We handle all types of divorce cases in Colorado, from amicable dissolutions to complex high-asset matters. Our attorneys will protect your rights while pursuing the best possible outcome. What would you like to know?",
    options: [
      { label: "What does the divorce process look like?", nextNodeId: "divorce_process" },
      { label: "How long does it typically take?", nextNodeId: "divorce_timeline" },
      { label: "I'm ready to talk to an attorney", nextNodeId: "schedule" },
    ],
  },

  divorce_process: {
    id: "divorce_process",
    message:
      "In Colorado, divorce involves filing a petition, exchanging financial disclosures, negotiating terms (custody, support, property), and finalizing the decree. We guide you through each step and handle the legal complexity so you can focus on your future. Would you like to schedule a confidential consultation to discuss your specific situation?",
    options: [
      { label: "Yes, schedule a consultation", nextNodeId: "schedule" },
      { label: "How long does it take?", nextNodeId: "divorce_timeline" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  divorce_timeline: {
    id: "divorce_timeline",
    message:
      "Colorado requires a minimum 91-day waiting period from filing. Uncontested cases can wrap up in 3–4 months, while contested matters may take 6–12+ months. Every case is different - we can give you a more accurate timeline after reviewing your situation.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Tell me about costs", nextNodeId: "costs" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  // ── Custody branch ────────────────────────────────────
  custody: {
    id: "custody",
    message:
      "Your children's well-being is our top priority. Colorado courts focus on the \"best interests of the child\" standard when making custody (parenting time) decisions. How can we help?",
    options: [
      { label: "What factors do courts consider?", nextNodeId: "custody_factors" },
      { label: "I'm concerned about my parenting time", nextNodeId: "custody_concerns" },
      { label: "Talk to an attorney", nextNodeId: "schedule" },
    ],
  },

  custody_factors: {
    id: "custody_factors",
    message:
      "Colorado courts consider each parent's relationship with the child, the child's adjustment to home and community, each parent's willingness to encourage the child's relationship with the other parent, and more. Our attorneys are experienced in building strong cases for parenting time.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "I have custody concerns", nextNodeId: "custody_concerns" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  custody_concerns: {
    id: "custody_concerns",
    message:
      "We hear you, and your concerns are valid. Whether you're worried about losing time with your children or ensuring their safety, our team has helped many parents navigate this process. A confidential consultation is the best way to discuss the specifics of your situation.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Learn about fathers' rights", nextNodeId: "fathers_rights" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  fathers_rights: {
    id: "fathers_rights",
    message:
      "Colorado law does not favor either parent based on gender. Fathers have equal rights to custody and parenting time. Our attorneys have extensive experience advocating for fathers and will fight to protect your relationship with your children.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  // ── Child support branch ──────────────────────────────
  child_support: {
    id: "child_support",
    message:
      "Child support in Colorado is determined by a formula that considers both parents' incomes, parenting time, and other factors. Whether you need to establish, modify, or enforce support, we can help.",
    options: [
      { label: "How is support calculated?", nextNodeId: "support_calculation" },
      { label: "I need to modify my support order", nextNodeId: "support_modify" },
      { label: "Talk to an attorney", nextNodeId: "schedule" },
    ],
  },

  support_calculation: {
    id: "support_calculation",
    message:
      "Colorado uses a standardized worksheet that factors in gross income, overnight parenting time, health insurance costs, and childcare expenses. The amount can be adjusted for extraordinary circumstances. For an accurate estimate, we'd need to review your specific details.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  support_modify: {
    id: "support_modify",
    message:
      "Support orders can be modified when there's a significant change in circumstances - such as a job change, income shift, or change in parenting time. We'll review your current order and advise you on whether modification makes sense.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  // ── Assets branch ─────────────────────────────────────
  assets: {
    id: "assets",
    message:
      "Dividing property and assets is one of the most complex parts of divorce. Colorado is an \"equitable distribution\" state, meaning assets are divided fairly - but not always equally. What's your concern?",
    options: [
      { label: "High-value or complex assets", nextNodeId: "high_assets" },
      { label: "Business ownership", nextNodeId: "business" },
      { label: "I want to protect what's mine", nextNodeId: "asset_protection" },
      { label: "Talk to an attorney", nextNodeId: "schedule" },
    ],
  },

  high_assets: {
    id: "high_assets",
    message:
      "High-asset divorces involve real estate portfolios, investment accounts, retirement funds, stock options, and more. Our team works with forensic accountants and financial experts to ensure nothing is overlooked and you receive a fair settlement.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  business: {
    id: "business",
    message:
      "If you or your spouse owns a business, accurate valuation is critical. We work with valuation experts to determine fair market value and protect your business interests throughout the divorce process.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  asset_protection: {
    id: "asset_protection",
    message:
      "Protecting your assets starts with understanding what's marital vs. separate property. Prenuptial agreements, inheritance documentation, and thorough financial disclosure all play a role. Let us review your situation.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Learn about prenups", nextNodeId: "prenup" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  prenup: {
    id: "prenup",
    message:
      "A prenuptial agreement is one of the best ways to protect your assets before marriage. We draft clear, enforceable agreements that give both parties peace of mind going forward.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  // ── Spousal support branch ────────────────────────────
  spousal_support: {
    id: "spousal_support",
    message:
      "Spousal maintenance (alimony) in Colorado depends on the length of the marriage, each spouse's income, and other factors. Whether you may be entitled to support or may be required to pay it, we'll help you understand your options.",
    options: [
      { label: "How is alimony determined?", nextNodeId: "alimony_factors" },
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  alimony_factors: {
    id: "alimony_factors",
    message:
      "Colorado has advisory guidelines for maintenance based on income and marriage duration. Courts also consider each spouse's financial resources, earning capacity, lifestyle during the marriage, and contributions to the other's career. The outcome can vary significantly case by case.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  // ── Other practice areas ──────────────────────────────
  other_area: {
    id: "other_area",
    message: "We handle a wide range of family law matters. Which of these applies to you?",
    options: [
      { label: "Mediation", nextNodeId: "mediation" },
      { label: "Legal Separation", nextNodeId: "legal_separation" },
      { label: "Protection Orders", nextNodeId: "protection_orders" },
      { label: "Post-Decree Modifications", nextNodeId: "post_decree" },
      { label: "Contempt / Enforcement", nextNodeId: "contempt" },
      { label: "I'm not sure - I need guidance", nextNodeId: "schedule" },
    ],
  },

  mediation: {
    id: "mediation",
    message:
      "Mediation can be a less adversarial, more cost-effective path to resolution. Our attorneys are skilled mediators who help couples reach agreements on custody, support, and property division while minimizing conflict.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  legal_separation: {
    id: "legal_separation",
    message:
      "A legal separation addresses the same issues as divorce - custody, support, and property - without dissolving the marriage. It may be right for couples who need space but aren't ready for divorce.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  protection_orders: {
    id: "protection_orders",
    message:
      "If you or your children are in danger, a civil protection order can provide immediate safety. We can help you obtain or respond to a protection order with urgency and care.",
    options: [
      { label: "I need help urgently", nextNodeId: "urgent" },
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  urgent: {
    id: "urgent",
    message:
      "If you're in immediate danger, please call 911. For urgent legal matters, contact our office directly at (303) 747-4686. We take these situations very seriously and will do everything we can to help.",
    action: {
      type: "phone",
      label: "Call (303) 747-4686",
      href: "tel:+13037474686",
    },
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  post_decree: {
    id: "post_decree",
    message:
      "Life changes after a divorce decree - and sometimes the court order needs to change too. We handle modifications to custody, support, and parenting plans when circumstances warrant it.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  contempt: {
    id: "contempt",
    message:
      "When a court order isn't being followed, we can help you file a motion for contempt or enforcement. You shouldn't have to tolerate non-compliance - let us hold the other party accountable.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  // ── General questions ─────────────────────────────────
  general_question: {
    id: "general_question",
    message: "Of course - what would you like to know?",
    options: [
      { label: "What areas of law do you practice?", nextNodeId: "practice_areas" },
      { label: "How much does it cost?", nextNodeId: "costs" },
      { label: "Where are you located?", nextNodeId: "location" },
      { label: "Who are your attorneys?", nextNodeId: "attorneys" },
    ],
  },

  practice_areas: {
    id: "practice_areas",
    message:
      "We focus exclusively on family law in Colorado, including divorce, child custody, child support, property division, spousal support, prenuptial agreements, mediation, protection orders, and post-decree matters. Our focused practice means deeper expertise for your case.",
    options: [
      { label: "Tell me about a specific area", nextNodeId: "area_select" },
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "general_question" },
    ],
  },

  costs: {
    id: "costs",
    message:
      "Every case is unique, so costs vary. We're transparent about fees from the start and offer a free initial consultation so you can understand your options without any financial commitment. There are no surprises - just honest guidance.",
    options: [
      { label: "Schedule a free consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "area_select" },
    ],
  },

  location: {
    id: "location",
    message:
      "We're located in Denver, Colorado and serve clients throughout the Denver Metro area, including Arapahoe, Jefferson, Douglas, Adams, and Boulder counties. We also offer virtual consultations for your convenience.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "general_question" },
    ],
  },

  attorneys: {
    id: "attorneys",
    message:
      "Our team is led by Dmitriy Borshchak, a dedicated family law attorney with deep experience in Colorado family courts. Each member of our team brings compassion, strategic thinking, and a commitment to our clients' well-being.",
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Visit our Attorneys page", nextNodeId: "attorneys_link" },
      { label: "Back to topics", nextNodeId: "general_question" },
    ],
  },

  attorneys_link: {
    id: "attorneys_link",
    message: "You can learn more about our team on our website.",
    action: {
      type: "link",
      label: "Meet Our Attorneys",
      href: "/about",
    },
    options: [
      { label: "Schedule a consultation", nextNodeId: "schedule" },
      { label: "Back to topics", nextNodeId: "general_question" },
    ],
  },

  // ── Schedule / CTA ────────────────────────────────────
  schedule: {
    id: "schedule",
    message:
      "We'd love to help. You can schedule a free, confidential consultation with one of our attorneys. There's no obligation - just an opportunity to discuss your situation and understand your options.",
    action: {
      type: "consultation",
      label: "Schedule Free Consultation",
    },
    options: [
      { label: "I'd prefer to call", nextNodeId: "phone" },
      { label: "I have more questions", nextNodeId: "area_select" },
    ],
  },

  phone: {
    id: "phone",
    message:
      "You can reach us at (303) 747-4686 during business hours (Monday–Friday, 8:30 AM – 5:00 PM). We're happy to speak with you.",
    action: {
      type: "phone",
      label: "Call (303) 747-4686",
      href: "tel:+13037474686",
    },
    options: [
      { label: "Schedule online instead", nextNodeId: "schedule" },
      { label: "I have more questions", nextNodeId: "area_select" },
    ],
  },

  // ── Free-text fallback ────────────────────────────────
  freetext_fallback: {
    id: "freetext_fallback",
    message:
      "Thank you for your question. For the most accurate and helpful response, I'd recommend speaking directly with one of our attorneys - they can address the specifics of your situation. In the meantime, I can point you in the right direction.",
    options: [
      { label: "Schedule a free consultation", nextNodeId: "schedule" },
      { label: "Browse practice areas", nextNodeId: "area_select" },
      { label: "Call the office", nextNodeId: "phone" },
    ],
  },
};

// ── Keyword → node mapping for free-text matching ───────
interface KeywordRule {
  keywords: string[];
  nodeId: string;
}

const keywordRules: KeywordRule[] = [
  { keywords: ["divorce", "divorcing", "end my marriage", "ending marriage", "dissolution"], nodeId: "divorce" },
  { keywords: ["custody", "parenting time", "parenting plan", "visitation", "kids", "children"], nodeId: "custody" },
  { keywords: ["child support", "support payment", "child payment"], nodeId: "child_support" },
  { keywords: ["father", "dad", "fathers rights", "paternity"], nodeId: "fathers_rights" },
  { keywords: ["asset", "property", "house", "home", "real estate", "divide", "division"], nodeId: "assets" },
  { keywords: ["business", "company", "valuation", "llc", "partnership"], nodeId: "business" },
  { keywords: ["high asset", "high net worth", "complex asset", "investment", "stock", "retirement"], nodeId: "high_assets" },
  { keywords: ["prenup", "prenuptial", "premarital"], nodeId: "prenup" },
  { keywords: ["alimony", "spousal support", "spousal maintenance", "maintenance"], nodeId: "spousal_support" },
  { keywords: ["mediation", "mediator", "negotiate", "settlement"], nodeId: "mediation" },
  { keywords: ["separation", "legal separation", "separate"], nodeId: "legal_separation" },
  { keywords: ["protection order", "restraining order", "domestic violence", "abuse", "safety", "danger"], nodeId: "protection_orders" },
  { keywords: ["contempt", "enforcement", "not following", "violat", "non-compliance"], nodeId: "contempt" },
  { keywords: ["modify", "modification", "change order", "post-decree", "post decree"], nodeId: "post_decree" },
  { keywords: ["cost", "price", "fee", "how much", "afford", "expensive", "payment plan"], nodeId: "costs" },
  { keywords: ["location", "office", "where", "address", "denver", "colorado", "county"], nodeId: "location" },
  { keywords: ["attorney", "lawyer", "team", "dmitriy", "borshchak", "hank", "keri"], nodeId: "attorneys" },
  { keywords: ["schedule", "consultation", "appointment", "meet", "talk to"], nodeId: "schedule" },
  { keywords: ["call", "phone", "number", "ring"], nodeId: "phone" },
  { keywords: ["urgent", "emergency", "immediate", "help now", "911"], nodeId: "urgent" },
  { keywords: ["annulment", "annul", "void marriage"], nodeId: "area_select" },
  { keywords: ["process", "how does it work", "steps", "what to expect"], nodeId: "divorce_process" },
  { keywords: ["how long", "timeline", "duration", "time frame", "timeframe"], nodeId: "divorce_timeline" },
];

/**
 * Match free-text input to the best decision-tree node.
 * Returns the node ID or "freetext_fallback" if no match.
 */
export function matchFreeText(input: string): string {
  const lower = input.toLowerCase();

  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const rule of keywordRules) {
    let score = 0;
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) {
        // Longer keyword phrases score higher (more specific)
        score += kw.split(" ").length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = rule.nodeId;
    }
  }

  return bestMatch ?? "freetext_fallback";
}
