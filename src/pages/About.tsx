import { Calendar, Phone, Scale, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-4xl">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              About Borshchak Law Group
            </p>
            <h1 className="heading-hero mb-6">
              Columbus Family Law Attorneys Since 1998
            </h1>
            <p className="text-body text-lg">
              For over 25 years, we've helped Central Ohio families navigate their most challenging legal transitions. Our focus has never changed: provide strategic counsel with personal attention, achieving the best possible outcomes for every client.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding-sm bg-card border-y border-border">
          <div className="container">
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
              <div>
                <Scale className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="font-serif text-3xl font-semibold text-primary">25+</div>
                <div className="text-sm text-muted-foreground">Years in Practice</div>
              </div>
              <div>
                <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="font-serif text-3xl font-semibold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Families Helped</div>
              </div>
              <div>
                <Award className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="font-serif text-3xl font-semibold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Client Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">Our Philosophy</h2>
            <div className="space-y-6 text-body">
              <p>
                Family law is personal. When someone walks into our office, they're not just bringing a legal problem—they're bringing fear, uncertainty, and often grief about the life they expected. We never forget that.
              </p>
              <p>
                At the same time, family law requires clear-headed strategy. Emotional decisions often lead to regrettable outcomes. Our job is to help you think through decisions rationally while honoring what you're going through emotionally.
              </p>
              <p>
                We've built our practice on direct attorney involvement. You'll never be handed off to a paralegal for important conversations. When you call with a question, you get an answer—not a callback in three days. This approach means we take fewer cases, but we handle each one better.
              </p>
            </div>
          </div>
        </section>

        {/* Local Focus */}
        <section className="section-padding bg-card">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">Deep Local Experience</h2>
            <div className="space-y-6 text-body">
              <p>
                We practice almost exclusively in Franklin County and surrounding Central Ohio courts. This focus means we understand local judicial preferences, procedural quirks, and what arguments resonate with the judges who will decide your case.
              </p>
              <p>
                We know the opposing attorneys, the court staff, and the procedures that can expedite or delay your case. This institutional knowledge matters when you need results efficiently.
              </p>
              <p>
                Our office in downtown Columbus is convenient for clients across the metro area, and we offer video consultations for those who prefer them.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-2xl text-center">
            <h2 className="heading-section mb-4">Meet With Us</h2>
            <p className="text-body mb-8">
              Schedule a consultation to discuss your situation and see if we're the right fit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+13803240878" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 380-324-0878
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
