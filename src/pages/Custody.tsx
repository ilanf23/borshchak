import { Phone, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Custody = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-4xl">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Child Custody & Parenting
            </p>
            <h1 className="heading-hero mb-6">
              Protecting Your Relationship With Your Children
            </h1>
            <p className="text-body text-lg mb-8">
              Custody decisions shape your family for years to come. We fight for arrangements that protect your parental rights while prioritizing your children's wellbeing—whether through negotiation or litigation.
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
            <h2 className="heading-section mb-8">Custody Matters We Handle</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Initial custody determination",
                "Shared parenting agreements",
                "Sole custody advocacy",
                "Custody modification requests",
                "Relocation disputes",
                "Parenting time schedules",
                "Grandparent visitation rights",
                "Emergency custody motions"
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
            <h2 className="heading-section mb-6">Focused on Your Children's Best Interests</h2>
            <div className="space-y-6 text-body">
              <p>
                Ohio courts prioritize the "best interests of the child" standard. We help you demonstrate why your proposed arrangement serves those interests while protecting your parental rights.
              </p>
              <p>
                When co-parenting is possible, we help craft detailed parenting plans that minimize future conflict. When the other parent is uncooperative or poses concerns, we advocate aggressively for protective arrangements.
              </p>
              <p>
                We're experienced in high-conflict custody disputes, including cases involving allegations of abuse, substance issues, or parental alienation. Franklin County judges know our reputation for thorough preparation and credible advocacy.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-2xl text-center">
            <h2 className="heading-section mb-4">Concerned About Custody?</h2>
            <p className="text-body mb-8">
              Get clear guidance on your rights and options in a confidential consultation.
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

export default Custody;
