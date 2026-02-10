import { Phone } from "lucide-react";

const FinalCTA = () => {
  

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container max-w-2xl text-center">
        <h2 className="heading-section mb-4">
          You Don't Have to Go Through This Alone
        </h2>
        <p className="text-body mb-8">
          Family law is one of the most personal and stressful areas of law. We walk with you through every stage, protect your interests, and help you make clear decisions during a difficult time.
        </p>
        
        <a href="tel:+13803240878" className="btn-cta text-lg px-10 py-4">
          <Phone className="w-5 h-5 mr-2" />
          Call Us Now: 380-324-0878
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;
