import { Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AwardLogos from "@/components/home/AwardLogos";
import GoogleReviews from "@/components/home/GoogleReviews";
import FinalCTA from "@/components/home/FinalCTA";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import happyFamily from "@/assets/happy-family.jpg";

const Testimonials = () => {
  const { ref: videoRef, isVisible: videoVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={happyFamily}
            alt="Happy family"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container relative z-10 text-center py-20 md:py-28">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
          >
            Testimonials for Borshchak Law Group
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-lora text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
          >
            Our clients' words mean everything to us. See how we've helped
            families navigate difficult times with compassion and results.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="https://www.google.com/maps/place/Borshchak+Law+Group/@39.9611755,-82.9987942,17z/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-foreground font-semibold text-lg px-8 py-4 rounded-lg hover:bg-white/90 transition-colors"
          >
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            Leave Us a Google Review
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      {/* Award Logos */}
      <AwardLogos />

      {/* Featured Video Testimonial */}
      <section className="section-padding bg-secondary/30">
        <div className="container">
          <div
            ref={videoRef}
            className={`max-w-5xl mx-auto transition-all duration-700 ${
              videoVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="heading-section text-center mb-3">
              Hear From Our Clients
            </h2>
            <p className="text-body text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Real stories from real clients who trusted Borshchak Law Group
              during some of the most challenging moments of their lives.
            </p>
            <div
              className="aspect-video rounded-xl overflow-hidden shadow-xl border-2"
              style={{ borderColor: "hsl(var(--green-accent))" }}
            >
              <iframe
                src="https://www.youtube.com/embed/AHfY54OdW2E"
                title="Client Testimonial - Borshchak Law Group"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews />

      {/* Final CTA */}
      <FinalCTA />

      <Footer />
    </div>
  );
};

export default Testimonials;
