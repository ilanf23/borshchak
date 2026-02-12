import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const faqs = [
  {
    question: "Can you get a divorce without going to court?",
    answer: "Yes, in Ohio, it is possible to avoid traditional court hearings by pursuing either an uncontested divorce or dissolution of marriage. If both spouses agree on all terms such as custody, support, and property division, the court process can be streamlined into a paperwork-based review or a short, non-adversarial hearing. Mediation or collaborative divorce can also help you stay out of court.",
    videoId: "KP_H5vne-WE"
  },
  {
    question: "How do I get a divorce in Ohio?",
    answer: "To get a divorce in Ohio, at least one spouse must have lived in the state for 6 months. The process starts with filing a complaint for divorce in your county's domestic relations court. You will need to address child custody, division of assets, support, and more. If contested, your case proceeds through hearings. If uncontested, it can resolve more simply, sometimes with one brief court appearance.",
    videoId: "FYYwaqd4V94"
  },
  {
    question: "What is the average child support per child in Ohio?",
    answer: "Child support in Ohio is calculated using state guidelines based on both parents' incomes, number of children, and specific expenses like healthcare or childcare. While there is no fixed \"average,\" a middle-income family might expect to pay $300 to $700 per child per month depending on the case. However, every case is unique and using a calculator or getting a review from an attorney is best.",
    videoId: "Ft6lrL_O5fE"
  },
  {
    question: "What is the difference between legal separation and divorce?",
    answer: "Legal separation allows spouses to live apart with a formal agreement on finances, custody, and support but without ending the marriage. Divorce, on the other hand, legally ends the marriage. Legal separation may be preferred for religious, financial, or insurance reasons but it still involves a court order and formal process.",
    videoId: "PettmRT-6U4"
  },
  {
    question: "Are divorce or family law records public in Ohio and where can I find them?",
    answer: "Yes, divorce and family law records in Ohio are generally public and can be accessed through the Clerk of Courts in the county where the case was filed. Some sensitive details such as financial affidavits or abuse reports may be sealed. You can usually search online using the court's public access portal.",
    videoId: "IZ_-POx-Rmw"
  }
];

const FAQSection = () => {
  const headerAnim = useScrollAnimation();
  const listAnim = useScrollAnimation(0.05);

  return (
    <section className="section-padding">
      <div className="container max-w-4xl">
        <div
          ref={headerAnim.ref}
          className={`text-center mb-12 ${headerAnim.className}`}
        >
          <h2 className="heading-section">Common Questions</h2>
          <p className="text-muted-foreground mt-4 text-xl">Get answers to frequently asked questions about Ohio family law</p>
        </div>
        
        <div
          ref={listAnim.ref}
          className={`stagger-children ${listAnim.isVisible ? "stagger-visible" : ""}`}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-border rounded-xl px-6 bg-card/50"
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline">
                  <span className="font-semibold text-foreground text-xl md:text-2xl pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-6">{faq.answer}</p>
                  {faq.videoId && (
                    <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                      <iframe
                        src={`https://www.youtube.com/embed/${faq.videoId}`}
                        title={faq.question}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
