import { Phone, FileText, Scale, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Free Consultation",
    description: "Share your situation in a confidential meeting. We'll assess your case, answer initial questions, and discuss whether we're the right fit for your needs."
  },
  {
    number: "02",
    icon: FileText,
    title: "Case Strategy",
    description: "We develop a clear legal strategy based on your goals, timeline, and budget. You'll understand every option and likely outcome before we proceed."
  },
  {
    number: "03",
    icon: Scale,
    title: "Skilled Execution",
    description: "Whether negotiating settlement or presenting in court, we handle every legal detail. You'll receive regular updates and remain in control of key decisions."
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Resolution & Beyond",
    description: "We ensure all agreements are properly documented and enforceable. Our relationship doesn't end at signing—we're here if you need future modifications."
  }
];

const ProcessSection = () => {
  return (
    <section className="section-padding bg-navy">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heading-section text-primary-foreground mb-4">
            What Working With Us Looks Like
          </h2>
          <p className="text-primary-foreground/70">
            No surprises, no confusion. We guide you through a clear process from first call to final resolution.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-5xl font-serif font-bold text-primary-foreground/10 mb-4">
                {step.number}
              </div>
              <div className="absolute top-0 left-0 w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <step.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-medium text-primary-foreground mb-2 mt-2">
                {step.title}
              </h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
