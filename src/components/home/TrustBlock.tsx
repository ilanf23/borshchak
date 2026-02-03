import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Best decision I ever made was reaching out to Dmitriy.",
    author: "Google Review"
  },
  {
    quote: "He removed all the stress and put it on his shoulders.",
    author: "Google Review"
  },
  {
    quote: "Professional, empathetic, and always responsive.",
    author: "Google Review"
  }
];

const TrustBlock = () => {
  return (
    <section className="section-padding-sm bg-card border-y border-border">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Google Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <div>
              <p className="font-semibold text-foreground">147+ Reviews • 4.8 Stars</p>
              <p className="text-sm text-muted-foreground">on Google</p>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="max-w-xs">
                <p className="text-sm text-foreground italic mb-1">"{testimonial.quote}"</p>
                <p className="text-xs text-muted-foreground">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBlock;
