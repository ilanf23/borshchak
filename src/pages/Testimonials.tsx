import { Star, ExternalLink, Users, Scale, Heart } from "lucide-react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AwardLogos from "@/components/home/AwardLogos";
import GoogleReviews from "@/components/home/GoogleReviews";
import FinalCTA from "@/components/home/FinalCTA";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import testimonialsHero from "@/assets/testimonials-hero.jpg";
import dmitriyPhoto from "@/assets/dmitriy-borshchak.png";

const LiteYouTube = ({ videoId, title }: { videoId: string; title: string }) => {
  const [playing, setPlaying] = useState(false);
  const handlePlay = useCallback(() => setPlaying(true), []);

  if (playing) {
    return (
      <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      onClick={handlePlay}
      className="relative aspect-video w-full rounded-xl overflow-hidden shadow-xl group cursor-pointer"
      aria-label={`Play ${title}`}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <svg className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
};

const stats = [
  { icon: Users, numValue: 20, suffix: "+", label: "Years of Experience", decimals: 0, color: "from-blue-500 to-blue-600", iconBg: "bg-blue-500/25", iconColor: "text-blue-400" },
  { icon: Star, numValue: 150, suffix: "+", label: "5-Star Reviews", decimals: 0, color: "from-yellow-500 to-amber-500", iconBg: "bg-yellow-500/25", iconColor: "text-yellow-400" },
  { icon: Scale, numValue: 3, suffix: "", label: "Family Law Attorneys", decimals: 0, color: "from-emerald-500 to-green-600", iconBg: "bg-emerald-500/25", iconColor: "text-emerald-400" },
  { icon: Heart, numValue: 100, suffix: "%", label: "Family Law Focus", decimals: 0, color: "from-rose-500 to-pink-600", iconBg: "bg-rose-500/25", iconColor: "text-rose-400" },
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
  const pressAnim = useScrollAnimation();

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
            We've Changed the Trajectory of Our Clients' Lives.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-lora text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
          >
            Don't take our word for it. Hear directly from the families we've
            represented - through some of the most difficult moments of their lives -
            and the outcomes we helped them achieve.
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
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-white/10 hover:bg-white/15 transition-colors duration-300 h-full flex flex-col items-center justify-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${stat.iconBg}`}>
                    <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                  </div>
                  <div className="font-playfair text-4xl md:text-5xl font-bold text-white mb-2 h-[1.2em] flex items-center justify-center">
                    <CountUpNumber value={stat.numValue} decimals={stat.decimals} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm md:text-base text-white/70 font-medium">
                    {stat.label}
                  </div>
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
              Real stories from real families who trusted Borshchak Law Group
              during some of the most challenging moments of their lives.
            </p>
            <div className="space-y-10">
              <LiteYouTube videoId="AHfY54OdW2E" title="Client Testimonial" />
              <LiteYouTube videoId="YbH9wGdOMbc" title="Client Testimonial - Linda Bowers" />
              <LiteYouTube videoId="wlhS80XSOic" title="Client Testimonial" />
            </div>

          </div>
        </div>
      </section>

      {/* Press / Media Appearance */}
      <section className="section-padding bg-navy">
        <div
          ref={pressAnim.ref}
          className={`container max-w-4xl ${pressAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
        >
          <p
            className="text-sm font-medium uppercase tracking-widest mb-3 text-center"
            style={{ color: "hsl(var(--green-accent))" }}
          >
            As Seen On
          </p>
          <h2
            className="heading-section mb-4 text-center"
            style={{ color: "hsl(var(--primary-foreground))" }}
          >
            See How We Protect Families in Action
          </h2>
          <p
            className="text-lg leading-relaxed text-center max-w-2xl mx-auto mb-10"
            style={{ color: "hsla(40, 30%, 98%, 0.85)" }}
          >
            Attorney Dmitriy Borshchak walks through a real family law case,
            from the challenges the client faced to the strategy we used to
            protect their interests and secure a favorable outcome.
          </p>

          <div className="max-w-5xl mx-auto text-center">
            <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
              <video
                src="/dmitriy-interview.mp4"
                controls
                preload="auto"
                className="w-full h-full"
                title="Interview with Dmitriy Borshchak"
              />
            </div>
            <Link
              to="/press"
              className="inline-block mt-6 text-accent underline hover:opacity-80 transition-opacity"
            >
              View all press appearances →
            </Link>
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
