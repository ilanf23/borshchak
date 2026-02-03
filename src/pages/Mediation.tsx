import { Calendar, Phone, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Mediation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-4xl">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Mediation & Alternative Resolution
            </p>
            <h1 className="heading-hero mb-6">
              Resolution Without the Courtroom Battle
            </h1>
            <p className="text-body text-lg mb-8">
              Not every divorce needs to be a fight. When both parties are willing, mediation and collaborative processes can achieve fair outcomes faster, with less expense and emotional toll. We guide productive negotiations while protecting your interests.
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

        {/* Options */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-8">Alternative Resolution Options</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Divorce mediation representation",
                "Collaborative divorce process",
                "Settlement conference preparation",
                "Negotiated agreements",
                "Custody mediation support",
                "Post-decree dispute resolution",
                "Separation agreements",
                "Uncontested divorce filing"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When Mediation Works */}
        <section className="section-padding bg-card">
          <div className="container max-w-4xl">
            <h2 className="heading-section mb-6">Is Mediation Right for You?</h2>
            <div className="space-y-6 text-body">
              <p>
                Mediation works well when both parties are willing to negotiate in good faith and can communicate respectfully. It's often ideal for couples who want to preserve a co-parenting relationship or avoid public court proceedings.
              </p>
              <p>
                However, mediation isn't appropriate in every situation. If there's a significant power imbalance, hidden assets, or safety concerns, litigation may be necessary to protect your interests. We'll give you an honest assessment during your consultation.
              </p>
              <p>
                Even in mediation, you need your own attorney. We attend sessions with you, ensure proposed agreements are fair, and catch issues before you sign anything. Our goal is resolution—but not at the expense of your rights.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-2xl text-center">
            <h2 className="heading-section mb-4">Explore Your Options</h2>
            <p className="text-body mb-8">
              Let's discuss whether mediation or litigation is the right path for your situation.
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

export default Mediation;
