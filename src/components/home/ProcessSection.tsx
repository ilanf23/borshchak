const steps = [
  {
    number: "1",
    title: "Free Consultation",
    description: "Understand your situation"
  },
  {
    number: "2",
    title: "Strategy",
    description: "Clear legal plan"
  },
  {
    number: "3",
    title: "Action",
    description: "Negotiations or court"
  },
  {
    number: "4",
    title: "Resolution",
    description: "Protect your future"
  }
];

const ProcessSection = () => {
  return (
    <section className="section-padding bg-navy">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heading-section text-primary-foreground">
            What Working With Us Looks Like
          </h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-xl font-semibold text-accent">
                  {step.number}
                </span>
              </div>
              <h3 className="font-medium text-primary-foreground mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-primary-foreground/70">
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
