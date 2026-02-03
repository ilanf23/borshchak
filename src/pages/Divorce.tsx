import { Calendar, Phone, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Divorce = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-4xl">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Divorce Representation
            </p>
            <h1 className="heading-hero mb-6">
              Strategic Divorce Counsel for Complex Situations
            </h1>
            <p className="text-body text-lg mb-8">
              Whether you're facing a contested divorce or seeking an amicable resolution, you need an attorney who understands the financial and emotional stakes. We protect your assets, your parental rights, and your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-cta">
                <Calendar className="w-5 h-5 mr-2" />
                Book Free Consultation
              </Link>
              <a href="tel:+16145551234" className="btn-secondary">
                <Phone className="w-5 h-5 mr-2" />
                (614) 555-1234
              </a>
            </div>
          </div>
        </section>

        {/* What We Handle */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-8">What We Handle</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Contested & uncontested divorce",
                "High-asset divorce proceedings",
                "Spousal support negotiations",
                "Property division strategy",
                "Business owner divorces",
                "Military divorce matters",
                "Divorce mediation support",
                "Post-divorce modifications"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="section-padding bg-card">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">Our Approach to Divorce</h2>
            <div className="space-y-6 text-body">
              <p>
                Every divorce is different. Some can be resolved through negotiation and mediation; others require aggressive courtroom advocacy. We assess your situation and recommend the approach most likely to achieve your goals efficiently.
              </p>
              <p>
                For high-asset divorces, we work with forensic accountants, business valuators, and financial planners to ensure nothing is overlooked. For custody-focused cases, we prioritize arrangements that protect your relationship with your children.
              </p>
              <p>
                Throughout the process, you'll work directly with your attorney—not a paralegal. We believe informed clients make better decisions, so we explain every option and likely outcome before recommending a strategy.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-2xl text-center">
            <h2 className="heading-section mb-4">Ready to Discuss Your Situation?</h2>
            <p className="text-body mb-8">
              Schedule a confidential consultation to understand your options and develop a clear path forward.
            </p>
            <Link to="/contact" className="btn-cta">
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Divorce;
