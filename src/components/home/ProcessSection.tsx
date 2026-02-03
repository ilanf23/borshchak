import { useState } from "react";
import { Phone, FileText, Scale, Shield, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "1",
    title: "Free Consultation",
    shortDesc: "Understand your situation",
    fullDesc: "Schedule a confidential call with our team. We'll listen to your story, answer your questions, and help you understand your legal options—no pressure, no obligation.",
    icon: Phone,
    details: [
      "30-minute confidential call",
      "Discuss your unique situation",
      "Get answers to your questions",
      "No cost, no obligation"
    ]
  },
  {
    number: "2",
    title: "Custom Strategy",
    shortDesc: "Clear legal plan",
    fullDesc: "Based on your goals and circumstances, we develop a personalized legal strategy. You'll know exactly what to expect, the timeline, and the costs involved.",
    icon: FileText,
    details: [
      "Tailored to your goals",
      "Transparent pricing",
      "Clear timeline expectations",
      "Written action plan"
    ]
  },
  {
    number: "3",
    title: "Skilled Advocacy",
    shortDesc: "Negotiations or court",
    fullDesc: "Whether through negotiation, mediation, or litigation, we fight for your interests. You'll have a dedicated advocate handling every detail while keeping you informed.",
    icon: Scale,
    details: [
      "Expert negotiations",
      "Court representation",
      "Regular case updates",
      "24/7 client portal access"
    ]
  },
  {
    number: "4",
    title: "Resolution",
    shortDesc: "Protect your future",
    fullDesc: "We work to secure the best possible outcome for you and your family. Once resolved, we ensure all paperwork is finalized so you can move forward with confidence.",
    icon: Shield,
    details: [
      "Favorable settlements",
      "Complete documentation",
      "Post-case support",
      "Peace of mind"
    ]
  }
];

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section-padding bg-navy">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heading-section text-primary-foreground">
            What Working With Us Looks Like
          </h2>
          <p className="text-primary-foreground/70 mt-4">
            A proven 4-step process designed to guide you from uncertainty to resolution
          </p>
        </div>
        
        {/* Interactive Process Graph */}
        <div className="max-w-5xl mx-auto">
          {/* Progress Line - Desktop */}
          <div className="hidden md:block relative mb-8">
            <div className="absolute top-6 left-0 right-0 h-1 bg-primary-foreground/20 rounded-full" />
            <div 
              className="absolute top-6 left-0 h-1 bg-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
            
            {/* Step Indicators */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                
                return (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    <div 
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative z-10",
                        isActive 
                          ? "bg-accent text-accent-foreground scale-110 shadow-lg shadow-accent/30" 
                          : isCompleted 
                            ? "bg-accent/80 text-accent-foreground" 
                            : "bg-primary-foreground/20 text-primary-foreground/60 group-hover:bg-primary-foreground/30"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span 
                      className={cn(
                        "mt-3 text-sm font-medium transition-colors",
                        isActive 
                          ? "text-accent" 
                          : "text-primary-foreground/60 group-hover:text-primary-foreground/80"
                      )}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Step Selector */}
          <div className="md:hidden flex gap-2 justify-center mb-6 flex-wrap">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    isActive 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-primary-foreground/20 text-primary-foreground/60"
                  )}
                >
                  Step {step.number}
                </button>
              );
            })}
          </div>

          {/* Active Step Content */}
          <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 md:p-8 animate-fade-in" key={activeStep}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: Main Content */}
              <div className="lg:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="font-serif text-lg font-semibold text-accent">
                      {steps[activeStep].number}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-primary-foreground">
                    {steps[activeStep].title}
                  </h3>
                </div>
                <p className="text-primary-foreground/80 leading-relaxed text-base md:text-lg">
                  {steps[activeStep].fullDesc}
                </p>
              </div>

              {/* Right: Details List */}
              <div className="lg:w-1/3 lg:border-l lg:border-primary-foreground/10 lg:pl-8">
                <h4 className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">
                  What's Included
                </h4>
                <ul className="space-y-3">
                  {steps[activeStep].details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-primary-foreground/70 text-sm">
                      <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-between mt-8 pt-6 border-t border-primary-foreground/10">
              <button
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  activeStep === 0 
                    ? "text-primary-foreground/30 cursor-not-allowed" 
                    : "text-primary-foreground/70 hover:text-accent"
                )}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Previous Step
              </button>
              <button
                onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                disabled={activeStep === steps.length - 1}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  activeStep === steps.length - 1 
                    ? "text-primary-foreground/30 cursor-not-allowed" 
                    : "text-primary-foreground/70 hover:text-accent"
                )}
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;