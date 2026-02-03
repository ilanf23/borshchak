import awardLogos from "@/assets/award-logos.png";

const AwardLogos = () => {
  return (
    <section className="py-8 bg-background border-b border-border/50 overflow-hidden">
      <div className="relative flex">
        <div className="flex shrink-0 animate-marquee">
          <img 
            src={awardLogos} 
            alt="Awards and Recognition" 
            className="h-16 md:h-24 w-auto object-contain"
          />
        </div>
        <div className="flex shrink-0 animate-marquee">
          <img 
            src={awardLogos} 
            alt="Awards and Recognition" 
            className="h-16 md:h-24 w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default AwardLogos;
