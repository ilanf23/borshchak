import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How much will my divorce cost?",
    answer: "Costs vary based on complexity. An uncontested divorce with simple assets might cost $3,000-$7,000, while contested cases with custody disputes or business valuations can range from $15,000-$50,000+. During your free consultation, we'll give you a realistic estimate based on your specific situation—no surprises."
  },
  {
    question: "How long does a divorce take in Ohio?",
    answer: "Ohio requires a minimum waiting period of 30-90 days depending on your filing type. An uncontested divorce can finalize in 4-6 months. Contested cases typically take 12-18 months, sometimes longer if there are custody disputes or complex assets. We focus on efficiency without sacrificing your interests."
  },
  {
    question: "Do I really need an attorney?",
    answer: "Technically, no. But family law decisions affect your finances and children for decades. Even 'simple' divorces involve complex tax implications, pension divisions, and custody considerations. Our clients often say they didn't know what they didn't know until we identified issues they'd missed."
  },
  {
    question: "My spouse already has an attorney. Am I at a disadvantage?",
    answer: "Yes—if you go it alone. When one spouse has legal representation, agreements often favor that spouse. We level the playing field and often identify issues the other side hopes you'll overlook. Schedule a consultation immediately if your spouse has hired counsel."
  },
  {
    question: "What if we agree on everything? Do we still need two lawyers?",
    answer: "Even amicable divorces benefit from independent legal review. We can serve as your personal attorney while respecting the cooperative dynamic you've established. Many 'agreed' divorces contain terms that seem fair but create problems years later."
  },
  {
    question: "Is everything I tell you confidential?",
    answer: "Absolutely. Attorney-client privilege protects all communications. Nothing you share in consultation or representation can be disclosed without your permission. This includes consultations even if you don't hire us."
  }
];

const FAQSection = () => {
  return (
    <section className="section-padding">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="heading-section mb-4">Common Questions</h2>
          <p className="text-body">
            Honest answers to the questions we hear most often.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
              <AccordionTrigger className="text-left py-6 hover:no-underline">
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
