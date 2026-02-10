import { Phone, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Assets = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-4xl">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Property & Asset Division
            </p>
            <h1 className="heading-hero mb-6">
              Protecting What You've Built
            </h1>
            <p className="text-body text-lg mb-8">
              From family businesses to investment portfolios, real estate to retirement accounts—we ensure marital property is accurately valued and divided fairly. Your financial future depends on getting this right.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+13803240878" className="btn-cta">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now: 380-324-0878
              </a>
            </div>
          </div>
        </section>

        {/* What We Handle */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-8">Complex Asset Matters</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Business valuation & protection",
                "Professional practice division",
                "Stock options & RSUs",
                "Pension & retirement division",
                "Real estate portfolio division",
                "Investment account allocation",
                "Hidden asset discovery",
                "Debt allocation strategy"
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
            <h2 className="heading-section mb-6">Our Approach to Asset Division</h2>
            <div className="space-y-6 text-body">
              <p>
                Ohio is an "equitable distribution" state—meaning marital property is divided fairly, not necessarily 50/50. We build compelling arguments for why an equitable division favors your interests.
              </p>
              <p>
                For high-net-worth divorces, we partner with forensic accountants and business valuators who understand complex financial structures. We've handled cases involving private companies, professional practices, multiple real estate holdings, and international assets.
              </p>
              <p>
                We're particularly experienced in protecting business owners. Your company shouldn't be undervalued—or worse, forced into sale—because of inadequate representation. We understand operating agreements, buy-sell provisions, and the difference between enterprise and personal goodwill.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-2xl text-center">
            <h2 className="heading-section mb-4">Complex Assets? Let's Talk Strategy.</h2>
            <p className="text-body mb-8">
              Schedule a consultation to discuss protecting your financial interests.
            </p>
            <a href="tel:+13803240878" className="btn-cta">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now: 380-324-0878
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Assets;
