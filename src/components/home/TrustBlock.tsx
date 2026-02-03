import { Scale, Award, Users, MapPin } from "lucide-react";

const stats = [
  {
    icon: Scale,
    value: "25+",
    label: "Years in Practice",
    description: "Serving Columbus families since 1998"
  },
  {
    icon: Users,
    value: "500+",
    label: "Families Helped",
    description: "Successful resolutions across Central Ohio"
  },
  {
    icon: Award,
    value: "4.9",
    label: "Client Rating",
    description: "Based on verified client reviews"
  },
  {
    icon: MapPin,
    value: "Franklin",
    label: "County Focus",
    description: "Deep knowledge of local courts"
  }
];

const TrustBlock = () => {
  return (
    <section className="section-padding-sm bg-card border-y border-border">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary mb-1">
                {stat.value}
              </div>
              <div className="font-medium text-foreground mb-1">{stat.label}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBlock;
