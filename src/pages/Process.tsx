import { Calendar, Phone, FileText, Scale, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Free Consultation",
    subtitle: "30–60 minutes, confidential",
    description: "We start with a confidential conversation about your situation. You'll explain what's happening, what you're hoping to achieve, and what concerns you most. We'll give you an honest picture of how Ohio law applies to your circumstances and what your realistic options are.",
    details: [
      "Available in-person or by video",
      "No pressure to retain us",
      "Candid assessment of your situation",
      "Clear explanation of fees and next steps"
    ]
  },
  {
    number: "02",
    icon: FileText,
    title: "Case Strategy",
    subtitle: "Weeks 1–2",
    description: "If you choose to retain us, we immediately gather the information needed to understand your full picture. We develop a legal strategy tailored to your goals and present it to you for review before any action is taken.",
    details: [
      "Document collection and review",
      "Financial analysis and discovery planning",
      "Strategy review with your attorney",
      "Timeline and cost estimates"
    ]
  },
  {
    number: "03",
    icon: Scale,
    title: "Skilled Execution",
    subtitle: "Duration varies by case",
    description: "We manage all legal filings, court appearances, negotiations, and communication with the other side. You'll receive regular updates and be consulted before any significant decision is made. Nothing happens without your knowledge.",
    details: [
      "Direct attorney communication",
      "Regular case status updates",
      "Negotiation, mediation, or litigation as your case requires",
      "Settlement discussions or trial preparation"
    ]
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Resolution and Beyond",
    subtitle: "Final steps and ongoing support",
    description: "We ensure your final agreements or court orders are properly documented, filed, and enforceable. We walk you through exactly what the order means and what to do if your circumstances change in the future.",
    details: [
      "Final order review and filing",
      "Clear explanation of your rights and obligations",
      "Guidance on future modifications or enforcement",
      "Continued attorney relationship"
    ]
  }
];

const Process = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-4xl">
            <p className="text-base font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Our Process
            </p>
            <h1 className="heading-hero mb-6">
              What Working With Us Looks Like
            </h1>
            <p className="text-body text-xl">
              No surprises, no confusion. From first call to final resolution, we guide you through a clear, predictable process. You'll always know what's happening, what comes next, and what decisions you need to make.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-6 md:gap-10">
                    {/* Number */}
                    <div className="shrink-0">
                      <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center">
                        <span className="font-serif text-3xl font-semibold text-primary-foreground">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="heading-subsection">{step.title}</h2>
                        <span className="text-base text-muted-foreground">| {step.subtitle}</span>
                      </div>
                      <p className="text-body mb-4">{step.description}</p>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-base text-muted-foreground">
                            <ArrowRight className="w-4 h-4 text-accent shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-px h-16 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-navy">
          <div className="container max-w-2xl text-center">
            <h2 className="heading-section text-primary-foreground mb-4">Ready to Start?</h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              The first step is a free consultation. Let's discuss your situation and see how we can help.
            </p>
            <Link to="/contact" className="btn-cta">
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Process;
