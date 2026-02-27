import awardAvvo from "@/assets/award-avvo-reviews.png";
import awardClientsChoice from "@/assets/award-avvo-clients-choice.png";
import awardAvvoRating from "@/assets/award-avvo-rating.png";
import awardExpertise from "@/assets/award-expertise.png";
import awardAilaRisingStar from "@/assets/award-aila-rising-star.png";
import awardTop40 from "@/assets/award-top40-under40.png";
import awardTop10FamilyLaw from "@/assets/award-top10-family-law.png";
import award10BestClientSatisfaction from "@/assets/award-10best-client-satisfaction.png";
import awardTrialLawyersTop40 from "@/assets/award-trial-lawyers-top40.png";

const logos = [
  { src: awardAvvo, alt: "Avvo 5-Star Reviews - Dmitriy Lev Borshchak" },
  { src: awardClientsChoice, alt: "Avvo Clients' Choice Award 2022 - Dmitriy Lev Borshchak" },
  { src: awardAvvoRating, alt: "Avvo Rating 8.7 Top Attorney - Dmitriy Lev Borshchak" },
  { src: awardExpertise, alt: "Expertise.com Best Divorce Lawyers in Columbus 2021" },
  { src: awardAilaRisingStar, alt: "American Institute of Legal Advocates Rising Star 2019" },
  { src: awardTop40, alt: "American Academy of Attorneys Top 40 Under 40 2019" },
  { src: awardTop10FamilyLaw, alt: "Attorney and Practice Magazine Top 10 Family Law Law Firm 2019" },
  { src: award10BestClientSatisfaction, alt: "10 Best Attorney Client Satisfaction 2022 - American Institute of Family Law Attorneys" },
  { src: awardTrialLawyersTop40, alt: "American Institute of Trial Lawyers Top 40 Under 40 2019" },
];

const LogoSet = () => (
  <>
    {logos.map((logo, i) => (
      <img
        key={i}
        src={logo.src}
        alt={logo.alt}
        className="h-32 sm:h-40 md:h-48 lg:h-56 w-auto shrink-0 object-contain mx-4 md:mx-7"
      />
    ))}
  </>
);

const AwardLogos = () => {
  return (
    <section className="py-4 bg-background border-b border-border/50 overflow-hidden">
      <div className="flex items-center [&>div]:flex [&>div]:items-center [&>div]:shrink-0">
        <div className="animate-marquee">
          <LogoSet />
          <LogoSet />
          <LogoSet />
          <LogoSet />
          <LogoSet />
          <LogoSet />
        </div>
        <div className="animate-marquee" aria-hidden="true">
          <LogoSet />
          <LogoSet />
          <LogoSet />
          <LogoSet />
          <LogoSet />
          <LogoSet />
        </div>
      </div>
    </section>
  );
};

export default AwardLogos;
