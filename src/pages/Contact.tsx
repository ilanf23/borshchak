import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Lock, ArrowRight, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedCTA from "@/components/AnimatedCTA";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactCards = [
  {
    href: "tel:+16143346851",
    interactive: true,
    icon: Phone,
    title: "Call Us",
    value: "614-334-6851",
    description: "Speak directly with our team",
  },
  {
    href: "mailto:info@borshchaklawgroup.com",
    interactive: true,
    icon: Mail,
    title: "Email Us",
    value: "info@borshchaklawgroup.com",
    description: "We respond within one business day",
  },
  {
    href: undefined,
    interactive: false,
    icon: MapPin,
    title: "Visit Us",
    value: "1650 Lake Shore Drive\nSuite 380\nColumbus, OH 43204",
    description: undefined,
  },
  {
    href: undefined,
    interactive: false,
    icon: Clock,
    title: "Office Hours",
    value: "Mon - Fri: 8:30 AM - 5:30 PM",
    description: "Evenings & weekends by appointment",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    situation: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us. We will reach out within one business day.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  /* Hero parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(heroScrollProgress, [0, 1], [0, 80]);

  /* Scroll animations for form section */
  const formHeaderAnim = useScrollAnimation(0.15);
  const formCardAnim = useScrollAnimation(0.15);

  /* AnimatedCTA inView guard */
  const formCtaRef = useRef(null);
  const formCtaInView = useInView(formCtaRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">

        {/* ════════════════════════════════════════════════════════
            1. HERO — Parallax + Staggered Text
        ════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden"
          style={{ borderBottom: "3px solid hsl(var(--green-accent))" }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80"
            alt="Modern office space representing a professional law firm environment"
            className="absolute inset-0 w-full h-[130%] object-cover"
            style={{ y: heroImageY }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(150deg, hsla(215,50%,10%,0.92) 0%, hsla(215,42%,16%,0.88) 100%)",
            }}
          />

          <div className="container max-w-4xl section-padding relative z-10">
            {/* Decorative green dots */}
            <div
              className="flex items-center gap-1.5 mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "50ms" }}
            >
              <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
              <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
              <span className="block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
            </div>

            <p
              className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in"
              style={{ color: "hsla(40, 30%, 98%, 0.7)", animationDelay: "100ms" }}
            >
              Columbus, OH Family Law Firm
            </p>

            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              Get in Touch
            </h1>

            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Take the first step toward resolving your family law matter. We're here to listen, advise, and advocate for you.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            2. CONTACT INFO — Navy + Glassmorphism Cards
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-16 md:py-24 bg-navy overflow-hidden">
          {/* Dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="container max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <p
                className="text-base font-medium uppercase tracking-wider mb-3"
                style={{ color: "hsla(40, 30%, 98%, 0.5)" }}
              >
                Reach Us Directly
              </p>
              <h2
                className="heading-section mb-4"
                style={{ color: "hsl(var(--primary-foreground))" }}
              >
                Contact Information
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-lg">
                Whether you prefer to call, email, or visit in person, we make it easy to connect with our team.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactCards.map((card, index) => {
                const Icon = card.icon;
                const Tag = card.href ? "a" : "div";
                const linkProps = card.href
                  ? { href: card.href }
                  : {};

                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Tag
                      {...linkProps}
                      className={`block text-center p-6 rounded-2xl border border-white/10 backdrop-blur-sm group transition-all duration-300 ${
                        card.interactive
                          ? "bg-white/10 hover:bg-white/20 hover:scale-[1.02] cursor-pointer"
                          : "bg-white/10 hover:bg-white/15"
                      }`}
                      style={{ borderTop: "3px solid hsl(var(--green-accent))" }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: "hsla(153,30%,25%,0.25)" }}
                      >
                        <Icon className="w-6 h-6" style={{ color: "#7cc9a0" }} />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-white mb-2">{card.title}</h3>
                      {card.title === "Visit Us" ? (
                        <p className="text-white/70 text-sm">
                          1650 Lake Shore Drive<br />
                          Suite 380<br />
                          Columbus, OH 43204
                        </p>
                      ) : (
                        <p
                          className="font-medium text-lg"
                          style={{ color: "#7cc9a0", wordBreak: card.title === "Email Us" ? "break-all" : undefined }}
                        >
                          {card.value}
                        </p>
                      )}
                      {card.description && (
                        <p className="text-sm text-white/50 mt-1">{card.description}</p>
                      )}
                      {/* Accent bar */}
                      <div
                        className="h-1 mx-auto mt-4 rounded-full transition-all duration-300 group-hover:w-20"
                        style={{
                          width: "3rem",
                          backgroundColor: "hsl(var(--green-accent))",
                          opacity: 0.6,
                        }}
                      />
                    </Tag>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            3. CONTACT FORM — Scroll Animations + Accents
        ════════════════════════════════════════════════════════ */}
        <section className="relative section-padding overflow-hidden">
          {/* Decorative background blob */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(var(--green-accent)) 0%, transparent 70%)",
            }}
          />

          <div className="container max-w-3xl relative z-10">
            {/* Header */}
            <div
              ref={formHeaderAnim.ref}
              className={`text-center mb-12 ${formHeaderAnim.className}`}
            >
              {/* Decorative green dots */}
              <div className="flex justify-center gap-1.5 mb-4">
                {[0, 1, 2].map((d) => (
                  <div key={d} className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--green-accent))" }} />
                ))}
              </div>
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h2 className="heading-section mb-4">Send Us a Message</h2>
              <p className="text-body max-w-2xl mx-auto">
                Tell us about your situation and we'll get back to you promptly. All communications are confidential and protected by attorney-client privilege.
              </p>
            </div>

            {/* Form card with green left border strip */}
            <div
              ref={formCardAnim.ref}
              className={`relative ${formCardAnim.className}`}
            >
              <div className="flex">
                {/* Green gradient left strip */}
                <div
                  className="w-1 shrink-0 rounded-l-lg"
                  style={{
                    background: "linear-gradient(to bottom, hsl(var(--green-accent)), hsla(153,30%,25%,0.3))",
                  }}
                />
                <form onSubmit={handleSubmit} className="card-elevated flex-1 rounded-l-none space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-2"
                        placeholder="(614) 555-1234"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="situation" className="text-foreground">What best describes your situation? *</Label>
                    <select
                      id="situation"
                      name="situation"
                      required
                      value={formData.situation}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">Select one...</option>
                      <option value="divorce">Considering or filing for divorce</option>
                      <option value="custody">Child custody or parenting dispute</option>
                      <option value="modification">Modifying existing order</option>
                      <option value="assets">Complex property/asset division</option>
                      <option value="mediation">Interested in mediation</option>
                      <option value="other">Other family law matter</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground">Tell us briefly about your situation</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2"
                      placeholder="Share what's happening and what you're hoping to achieve. This helps us prepare for your consultation."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                    <div ref={formCtaRef}>
                      {formCtaInView ? (
                        <AnimatedCTA delay={0.3}>
                          <button type="submit" className="btn-cta group">
                            Send Message
                            <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </AnimatedCTA>
                      ) : (
                        <div className="opacity-0 h-12" />
                      )}
                    </div>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      Your information is confidential and protected.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Contact;
