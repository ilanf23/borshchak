import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, useMotionValue, useTransform, useScroll, useInView, animate, AnimatePresence } from "framer-motion";
import {
  Phone, Heart, Shield, MessageSquare, GraduationCap, Scale, Briefcase,
  Gavel, Building2, TrendingUp, FileText, Users, Mic, CheckCircle2,
  Star, ChevronLeft, ChevronRight
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewCard from "@/components/home/reviews/ReviewCard";
import AnimatedCTA from "@/components/AnimatedCTA";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useConsultation } from "@/contexts/ConsultationContext";
import { reviews } from "@/data/reviews";
import dmitriyPhoto from "@/assets/dmitriy-borshchak.png";
import happyFamilyCta from "@/assets/happy-family-cta.png";
import whyCommunication from "@/assets/why-communication.jpg";
import justiceStatue from "@/assets/justice-statue.jpg";
import heroOffice from "@/assets/hero-office.jpg";

/* ─── Count-Up Number (replicates Testimonials.tsx pattern) ─── */
const CountUpNumber = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v).toString());

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    }
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
};

/* ─── Timeline Data ─── */
const timelineEntries = [
  { year: "2010", title: "Ohio University", subtitle: "B.A. Political Science", description: "Joined the student senate and began investigating how he could personally help the local community and students.", icon: GraduationCap, current: false },
  { year: "2013", title: "Capital University Law School", subtitle: "Juris Doctor", description: "Dean's List, CALI Award recipient, and member of the American Association for Justice Mock Trial Team.", icon: Scale, current: false },
  { year: "2013", title: "Pro Bono — Litigation Clinic", subtitle: "Capital University", description: "Represented individuals who could not afford an attorney at no charge during law school.", icon: Users, current: false },
  { year: "2014", title: "Milegroup Consulting", subtitle: "Mayfield Village, OH", description: "Gained concrete experience dealing with financial risk — knowledge he uses today to help clients foresee and pinpoint financial issues.", icon: TrendingUp, current: false },
  { year: "2014", title: "Kats Law", subtitle: "Shaker Heights, OH", description: "Handled personal injury claims including correspondence with insurance companies, meeting with clients, and compiling demand packets.", icon: FileText, current: false },
  { year: "2015", title: "Franklin County Prosecutor's Office", subtitle: "Columbus, OH", description: "Focused on felonies while simultaneously working as a supervised assistant prosecutor at Hilliard's Mayor's Court.", icon: Gavel, current: false },
  { year: "2016", title: "Weis & O'Connor, LLC", subtitle: "Columbus, OH", description: "Started as Law Clerk, promoted to Associate. Gained extensive experience in family law: preparing pleadings, responding to motions, and advising clients.", icon: Building2, current: false },
  { year: "2019", title: "Borshchak Law Group", subtitle: "Founder & Managing Attorney", description: "Founded his own family law practice dedicated to protecting families across Central Ohio with compassion and tenacity.", icon: Briefcase, current: true },
];


/* ─── Dmitriy's Reviews ─── */
const dmitriyReviewIds = [1, 3, 4, 8, 9, 13, 15, 16, 18];

/* ─── Main Component ─── */
const DmitriyBorshchak = () => {
  const { openConsultation } = useConsultation();

  /* Scroll animations */
  const philosophyAnim = useScrollAnimation(0.15, "left");
  const quoteAnim = useScrollAnimation(0.15, "scale");
  const videoAnim = useScrollAnimation(0.15, "scale");
  const speakingAnim = useScrollAnimation(0.15, "scale");
  const ctaAnim = useScrollAnimation(0.2);

  /* Hero parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroPhotoY = useTransform(heroScrollProgress, [0, 1], [0, 80]);

  /* Timeline scroll progress */
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef, offset: ["start end", "end start"] });
  const timelineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

  /* Timeline expand state */
  const [expandedNode, setExpandedNode] = useState<number | null>(null);

  /* Testimonials carousel */
  const dmitriyReviews = useMemo(() => reviews.filter((r) => dmitriyReviewIds.includes(r.id)), []);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true, slidesToScroll: 1 });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => {
      clearInterval(interval);
    };
  }, [emblaApi]);

  /* CTA inView for AnimatedCTA */
  const finalCtaRef = useRef(null);
  const finalCtaInView = useInView(finalCtaRef, { once: true, margin: "-100px" });
  const heroCtaRef = useRef(null);
  const heroCtaInView = useInView(heroCtaRef, { once: true });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">

        {/* ════════════════════════════════════════════════════════
            1. CINEMATIC HERO WITH TYPEWRITER NAME
        ════════════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative bg-navy min-h-[550px] md:min-h-[650px] overflow-hidden">
          <div className="flex flex-col-reverse md:flex-row min-h-[550px] md:min-h-[650px]">
            {/* Text */}
            <div className="flex-1 md:w-[55%] flex items-center section-padding relative z-10">
              <div className="max-w-xl ml-auto mr-4 md:mr-8">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-base font-medium uppercase tracking-wider mb-4"
                  style={{ color: "hsla(40, 30%, 98%, 0.7)" }}
                >
                  Borshchak Law Group | Columbus, OH
                </motion.p>

                {/* Typewriter Name */}
                <h1 className="heading-hero mb-4" style={{ color: "hsl(var(--primary-foreground))" }}>
                  {"Dmitriy Borshchak".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.04, delay: 0.4 + i * 0.045 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="text-xl md:text-2xl font-lora mb-6 font-medium"
                  style={{ color: "#7cc9a0" }}
                >
                  Dedicated Family Lawyer. Founder. Advocate.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="text-body text-lg leading-relaxed mb-8"
                >
                  Dmitriy Borshchak is a dedicated family lawyer in Columbus and founding attorney of Borshchak Law Group. After first pursuing a brief career in medicine, Dmitriy found his true passion in the legal field, assisting clients and helping them navigate tough situations.
                </motion.p>

                <div ref={heroCtaRef} className="flex flex-wrap gap-4">
                  {heroCtaInView ? (
                    <AnimatedCTA delay={1.6}>
                      <a href="tel:+16143346851" className="btn-cta text-lg px-8 py-4 inline-flex items-center gap-2 whitespace-nowrap">
                        <Phone className="w-5 h-5" />
                        Call Us Now: 614-334-6851
                      </a>
                    </AnimatedCTA>
                  ) : (
                    <div className="opacity-0 h-14" />
                  )}
                </div>
              </div>
            </div>

            {/* Photo */}
            <motion.div className="md:w-[45%] relative h-[350px] md:h-auto" style={{ y: heroPhotoY }}>
              <img
                src={dmitriyPhoto}
                alt="Dmitriy Borshchak"
                className="w-full h-full object-cover object-[center_15%] brightness-110 contrast-[1.05]"
              />
              <div
                className="absolute inset-0 pointer-events-none hidden md:block"
                style={{ background: "linear-gradient(to right, hsl(var(--trust-navy)) 0%, transparent 50%)" }}
              />
              <div
                className="absolute inset-0 pointer-events-none md:hidden"
                style={{ background: "linear-gradient(to top, hsl(var(--trust-navy)) 0%, transparent 40%)" }}
              />
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            2. ANIMATED STATS BAR
        ════════════════════════════════════════════════════════ */}
        <section className="py-10 md:py-14 bg-card border-y border-border">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: 10, suffix: "+", label: "Years Experience" },
                { value: 150, suffix: "+", label: "Client Reviews" },
                { value: 100, suffix: "%", label: "Family Law Focus" },
                { value: 9, suffix: "", label: "Awards & Honors" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <div className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-2">
                    <CountUpNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            3. PHILOSOPHY / "MY APPROACH" SECTION
        ════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-secondary/30">
          <div className="container max-w-6xl">
            <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-start">
              {/* Left — Philosophy Points */}
              <div
                ref={philosophyAnim.ref}
                className={`md:col-span-3 ${philosophyAnim.className}`}
              >
                <h2 className="heading-section mb-8">My Approach to Family Law</h2>
                <div className="space-y-6">
                  {[
                    { icon: Heart, title: "Compassion First", text: "Every family situation is unique. I listen to understand your story, your fears, and your goals before crafting a strategy tailored specifically to you." },
                    { icon: Shield, title: "Aggressive When Needed", text: "While I always seek fair resolutions, I am fully prepared to fight aggressively in court when your rights or your children's well-being are at stake." },
                    { icon: MessageSquare, title: "Constant Communication", text: "You will never be left in the dark. I personally respond to emails and calls, keeping you informed at every step of your case." },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className="flex gap-5"
                    >
                      <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}>
                        <item.icon className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                      </div>
                      <div>
                        <h3 className="heading-subsection text-xl mb-1">{item.title}</h3>
                        <p className="text-body text-lg">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right — Image with Overlaid Quote */}
              <div
                ref={quoteAnim.ref}
                className={`md:col-span-2 relative ${quoteAnim.className}`}
              >
                <img
                  src={whyCommunication}
                  alt="Professional consultation"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="relative -mt-24 mx-4 card-bordered p-6 border-l-4 bg-card/95 backdrop-blur-sm" style={{ borderLeftColor: "hsl(var(--green-accent))" }}>
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-base italic text-foreground/80 mb-3 leading-relaxed">
                    "He told me the stress was on his shoulders… I put my life into Dmitriy's hands… He really made me feel protected."
                  </blockquote>
                  <cite className="text-sm font-semibold text-primary not-italic">— Kate Oakley, Google Review</cite>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            5. INTERACTIVE CAREER TIMELINE
        ════════════════════════════════════════════════════════ */}
        <section className="relative section-padding bg-navy overflow-hidden">
          {/* Background texture */}
          <img src={justiceStatue} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none" />

          <div className="container max-w-5xl relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="heading-section text-center mb-16"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              Career Journey
            </motion.h2>

            <div ref={timelineRef} className="relative">
              {/* Vertical line track */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-white/20" />
              {/* Animated fill */}
              <motion.div
                className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 w-0.5 origin-top"
                style={{ height: timelineHeight, backgroundColor: "hsl(var(--green-accent))" }}
              />

              <div className="space-y-12">
                {timelineEntries.map((entry, i) => {
                  const isLeft = i % 2 === 0;
                  const isExpanded = expandedNode === i;
                  const Icon = entry.icon;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-60px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="grid grid-cols-[3rem_1fr] md:grid-cols-[1fr_3rem_1fr] items-start"
                    >
                      {/* Node */}
                      <div className="col-start-1 md:col-start-2 row-start-1 flex justify-center relative z-10">
                        <button
                          onClick={() => setExpandedNode(isExpanded ? null : i)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer ${
                            entry.current
                              ? "border-[hsl(var(--green-accent))] bg-[hsl(var(--green-accent))]/20"
                              : "border-white/50 bg-[hsl(var(--trust-navy))] hover:border-white/80"
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${entry.current ? "text-[hsl(var(--green-accent))]" : "text-white"}`} style={entry.current ? { color: "hsl(var(--green-accent))" } : {}} />
                        </button>
                        {entry.current && (
                          <span className="absolute top-0 right-0 w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                        )}
                      </div>

                      {/* Card */}
                      <div className={`col-start-2 row-start-1 pl-4 ${isLeft ? "md:col-start-1 md:pl-0 md:pr-8 md:text-right" : "md:col-start-3 md:pl-8"}`}>
                        <button
                          onClick={() => setExpandedNode(isExpanded ? null : i)}
                          className="text-left md:text-inherit w-full"
                        >
                          <span className="text-sm font-medium uppercase tracking-wider" style={{ color: "hsl(var(--green-accent))" }}>
                            {entry.year}
                          </span>
                          <h3 className={`text-xl font-semibold text-white mt-1 flex items-center gap-2 flex-wrap ${isLeft ? "md:justify-end" : ""}`}>
                            {entry.title}
                            {entry.current && (
                              <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-full" style={{ backgroundColor: "hsl(var(--green-accent))", color: "hsl(var(--trust-navy))" }}>
                                Current
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-white/80">{entry.subtitle}</p>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-white/85 mt-3 text-base leading-relaxed">{entry.description}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            6. SPEAKING ENGAGEMENT SHOWCASE
        ════════════════════════════════════════════════════════ */}
        <section className="relative section-padding overflow-hidden" style={{ borderTop: "3px solid hsl(var(--green-accent))" }}>
          {/* Background image */}
          <img src={heroOffice} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          <div className="absolute inset-0 bg-foreground/85 pointer-events-none" />

          <div className="container max-w-4xl relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="heading-section text-center mb-10 text-white"
            >
              Speaking Engagements
            </motion.h2>

            <div
              ref={speakingAnim.ref}
              className={speakingAnim.className}
            >
              <div className="rounded-xl border border-white/20 p-8 md:p-10 bg-white/10 backdrop-blur">
                <div className="flex items-start gap-4 mb-6">
                  <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white/20">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Uncovering Hidden Assets During Litigation</h3>
                    <p className="text-base font-medium text-white/60">Featured Seminar</p>
                  </div>
                </div>
                <p className="text-lg text-white/80 mb-6">
                  Dmitriy led a comprehensive seminar covering asset division strategies, including evaluating and finding hidden assets, classifying marital vs. non-marital assets, and valuation techniques.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Evaluating hidden assets",
                    "Marital vs. non-marital assets",
                    "Federal Form 1040 analysis",
                    "Asset valuation & division",
                  ].map((topic, i) => (
                    <motion.div
                      key={topic}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
                      className="flex items-center gap-2 text-white/80 text-base"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "hsl(var(--green-accent))" }} />
                      {topic}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            7. "MEET DMITRIY" VIDEO
        ════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-navy">
          <div className="container">
            <div
              ref={videoAnim.ref}
              className={`max-w-4xl mx-auto ${videoAnim.className}`}
            >
              {/* Decorative dots */}
              <div className="flex justify-center gap-1.5 mb-4">
                {[0, 1, 2].map((d) => (
                  <div key={d} className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                ))}
              </div>
              <h2 className="heading-section text-center mb-8" style={{ color: "hsl(var(--primary-foreground))" }}>
                Meet Dmitriy
              </h2>
              <div
                className="aspect-video rounded-xl overflow-hidden shadow-xl border-2"
                style={{ borderColor: "hsl(var(--green-accent))" }}
              >
                <iframe
                  src="https://www.youtube.com/embed/lN_avUAmYnk"
                  title="Dmitriy Borshchak - Borshchak Law Group"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            8. CLIENT TESTIMONIALS CAROUSEL
        ════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <div className="flex justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h2 className="heading-section mb-2">What Clients Say About Dmitriy</h2>
              <p className="text-muted-foreground text-lg">Real reviews from real clients</p>
            </motion.div>

            {/* Carousel */}
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {dmitriyReviews.map((review) => (
                    <div key={review.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] pl-4 first:pl-0 md:first:pl-4">
                      <ReviewCard review={review} index={0} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={scrollPrev}
                className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-foreground hover:bg-secondary transition-colors z-10"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-foreground hover:bg-secondary transition-colors z-10"
                aria-label="Next reviews"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>


            <p className="text-xs text-muted-foreground text-center mt-6">
              *Individual results vary. Past client experiences do not guarantee a similar outcome.
            </p>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════
            10. FINAL CTA
        ════════════════════════════════════════════════════════ */}
        <section className="relative section-padding overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src={happyFamilyCta} alt="Happy family together" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/70" />
          </div>

          <div
            ref={ctaAnim.ref}
            className={`container max-w-2xl text-center relative z-10 ${ctaAnim.className}`}
          >
            <h2 className="heading-section mb-4 text-white drop-shadow-lg">
              Ready to Take the Next Step?
            </h2>
            <p className="text-lg text-white/90 mb-8 drop-shadow">
              Schedule a confidential consultation with Dmitriy to discuss your family law matter and explore your options.
            </p>

            <div ref={finalCtaRef} className="flex justify-center">
              {finalCtaInView ? (
                <AnimatedCTA delay={0.3}>
                  <a href="tel:+16143346851" className="btn-cta text-lg px-10 py-4 inline-flex items-center gap-2 whitespace-nowrap">
                    <Phone className="w-5 h-5" />
                    Call Us Now: 614-334-6851
                  </a>
                </AnimatedCTA>
              ) : (
                <div className="opacity-0 h-14" />
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default DmitriyBorshchak;
