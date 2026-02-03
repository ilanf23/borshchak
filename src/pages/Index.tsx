import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import AwardLogos from "@/components/home/AwardLogos";
import TrustBlock from "@/components/home/TrustBlock";
import WhoWeHelp from "@/components/home/WhoWeHelp";
import VideoSection from "@/components/home/VideoSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProcessSection from "@/components/home/ProcessSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AwardLogos />
        <WhoWeHelp />
        <VideoSection />
        <WhyChooseUs />
        <TrustBlock />
        <ServicesOverview />
        <ProcessSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
