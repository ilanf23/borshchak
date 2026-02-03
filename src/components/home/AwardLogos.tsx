import awardLogos from "@/assets/award-logos.png";

const AwardLogos = () => {
  return (
    <section className="py-6 md:py-8 bg-background border-b border-border/50 overflow-hidden">
      <div className="flex animate-marquee">
        <img 
          src={awardLogos} 
          alt="Awards and Recognition" 
          className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto shrink-0 object-contain"
        />
        <img 
          src={awardLogos} 
          alt="Awards and Recognition" 
          className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto shrink-0 object-contain"
        />
      </div>
    </section>
  );
};

export default AwardLogos;
