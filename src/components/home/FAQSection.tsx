import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I really need a lawyer?",
    answer: "Family law decisions affect your finances and children for decades. Even 'simple' cases have tax implications and custody nuances most people miss."
  },
  {
    question: "How much does this cost?",
    answer: "Costs vary by complexity. We discuss fees openly in your free consultation—no surprises."
  },
  {
    question: "What if my spouse already hired one?",
    answer: "You need representation immediately. When one spouse has a lawyer, agreements often favor them. We level the playing field."
  },
  {
    question: "Can we avoid court?",
    answer: "Often, yes. We pursue mediation and settlement when possible. But if court is necessary, we're fully prepared."
  }
];

const FAQSection = () => {
  return (
    <section className="section-padding">
      <div className="container max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="heading-section">Common Questions</h2>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
              <AccordionTrigger className="text-left py-5 hover:no-underline">
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
