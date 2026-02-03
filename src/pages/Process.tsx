import { Calendar, Phone, FileText, Scale, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Free Consultation",
    subtitle: "30-60 minutes, no obligation",
    description: "We start with a confidential conversation about your situation. You'll share what's happening, what you're hoping to achieve, and what concerns you most. We'll provide initial guidance on your options and likely outcomes.",
    details: [
      "Available in-person or by video",
      "No pressure to hire us",
      "Honest assessment of your case",
      "Clear explanation of fees and process"
    ]
  },
  {
    number: "02",
    icon: FileText,
    title: "Case Strategy",
    subtitle: "Weeks 1-2",
    description: "If you choose to work with us, we immediately gather the information needed to build your case. We'll develop a legal strategy tailored to your goals, timeline, and budget—then present it for your approval.",
    details: [
      "Document collection and review",
      "Financial analysis and discovery planning",
      "Strategy presentation and discussion",
      "Timeline and cost estimates"
    ]
  },
  {
    number: "03",
    icon: Scale,
    title: "Skilled Execution",
    subtitle: "Duration varies by case",
    description: "We handle all legal filings, court appearances, negotiations, and communication with opposing counsel. You'll receive regular updates and be consulted on all significant decisions—nothing happens without your knowledge.",
    details: [
      "Direct attorney communication",
      "Regular case status updates",
      "Aggressive advocacy when needed",
      "Settlement negotiations or trial preparation"
    ]
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Resolution & Beyond",
    subtitle: "Final steps and ongoing support",
    description: "We ensure your final agreements or court orders are properly documented, filed, and enforceable. If issues arise later—modifications, enforcement, or new circumstances—we're here to help.",
    details: [
      "Final order review and filing",
      "Asset transfer coordination",
      "Future modification guidance",
      "Ongoing client relationship"
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
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Our Process
            </p>
            <h1 className="heading-hero mb-6">
              What Working With Us Looks Like
            </h1>
            <p className="text-body text-lg">
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
                        <span className="font-serif text-2xl font-semibold text-primary-foreground">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="heading-subsection">{step.title}</h2>
                        <span className="text-sm text-muted-foreground">— {step.subtitle}</span>
                      </div>
                      <p className="text-body mb-4">{step.description}</p>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
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
            <p className="text-primary-foreground/70 mb-8">
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
