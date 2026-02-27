import { Star, ExternalLink, Users, Scale, Heart } from "lucide-react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AwardLogos from "@/components/home/AwardLogos";
import GoogleReviews from "@/components/home/GoogleReviews";
import FinalCTA from "@/components/home/FinalCTA";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import testimonialsHero from "@/assets/testimonials-hero.jpg";

const stats = [
  { icon: Users, numValue: 500, suffix: "+", label: "Families Helped", decimals: 0, color: "from-blue-500 to-blue-600", iconBg: "bg-blue-500/10", iconColor: "text-blue-600" },
  { icon: Star, numValue: 4.8, suffix: "", label: "Google Rating", decimals: 1, color: "from-yellow-500 to-amber-500", iconBg: "bg-yellow-500/10", iconColor: "text-yellow-600" },
  { icon: Scale, numValue: 25, suffix: "+", label: "Years Combined Experience", decimals: 0, color: "from-emerald-500 to-green-600", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-600" },
  { icon: Heart, numValue: 98, suffix: "%", label: "Client Satisfaction", decimals: 0, color: "from-rose-500 to-pink-600", iconBg: "bg-rose-500/10", iconColor: "text-rose-600" },
];

const CountUpNumber = ({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  );

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    }
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const Testimonials = () => {
  const { ref: videoRef, isVisible: videoVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={testimonialsHero}
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

      {/* Why Clients Trust Us Stats */}
      <section className="relative py-16 md:py-20 bg-primary overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container max-w-5xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center font-playfair text-2xl md:text-3xl font-bold text-white mb-12"
          >
            Why Clients Trust Us
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-white/10 hover:bg-white/15 transition-colors duration-300">
                  <div className={`w-14 h-14 rounded-xl ${stat.iconBg} flex items-center justify-center mx-auto mb-4 bg-white/20`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`font-playfair text-4xl md:text-5xl font-bold text-white mb-2`}>
                    <CountUpNumber value={stat.numValue} decimals={stat.decimals} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm md:text-base text-white/70 font-medium">
                    {stat.label}
                  </div>
                  {/* Bottom accent bar */}
                  <div className={`h-1 w-12 mx-auto mt-4 rounded-full bg-gradient-to-r ${stat.color} opacity-80 group-hover:w-20 transition-all duration-300`} />
                </div>
              </motion.div>
            ))}
          </div>
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
