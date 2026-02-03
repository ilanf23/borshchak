import awardLogos from "@/assets/award-logos.png";

const AwardLogos = () => {
  return (
    <section className="py-6 bg-background border-b border-border/50 overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          <img 
            src={awardLogos} 
            alt="Awards and Recognition" 
            className="h-12 md:h-16 w-auto mx-8 object-contain"
          />
          <img 
            src={awardLogos} 
            alt="Awards and Recognition" 
            className="h-12 md:h-16 w-auto mx-8 object-contain"
          />
          <img 
            src={awardLogos} 
            alt="Awards and Recognition" 
            className="h-12 md:h-16 w-auto mx-8 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default AwardLogos;
