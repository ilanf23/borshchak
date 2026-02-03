import awardLogos from "@/assets/award-logos.png";

const AwardLogos = () => {
  return (
    <section className="py-8 bg-background border-b border-border/50 overflow-hidden">
      <div className="flex animate-marquee">
        <img 
          src={awardLogos} 
          alt="Awards and Recognition" 
          className="h-16 md:h-24 shrink-0"
        />
        <img 
          src={awardLogos} 
          alt="Awards and Recognition" 
          className="h-16 md:h-24 shrink-0"
        />
      </div>
    </section>
  );
};

export default AwardLogos;
