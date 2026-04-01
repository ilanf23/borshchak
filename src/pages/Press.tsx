import { Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Press = () => {
  const contentAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-navy">
          <div className="container max-w-4xl">
            <p
              className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--green-accent))", animationDelay: "100ms" }}
            >
              Borshchak Law Group
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
            >
              In the Press
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ color: "hsla(40, 30%, 98%, 0.85)", animationDelay: "400ms" }}
            >
              Media appearances, features, and coverage of Borshchak Law Group
              and our attorneys.
            </p>
          </div>
        </section>

        {/* Media Appearances */}
        <section className="section-padding bg-card">
          <div
            ref={contentAnim.ref}
            className={`container max-w-4xl ${contentAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section mb-10">Media Appearances</h2>

            <div className="card-elevated max-w-3xl mx-auto">
              <span className="inline-block bg-accent text-white text-sm px-4 py-1 rounded-full mb-4">
                Court TV Feature
              </span>
              <h3 className="heading-subsection mb-3">
                Dmitriy Borshchak on Court TV
              </h3>
              <p className="text-body mb-6">
                Attorney Dmitriy Borshchak was featured on Court TV discussing
                family law matters and divorce proceedings. This is a media
                appearance — not a client testimonial.
              </p>
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/GbBf903XVh4"
                  title="Dmitriy Borshchak - Court TV Feature"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              {/* TODO: Add confirmed timestamp from Dmitriy */}
              <p className="text-sm text-muted-foreground italic mt-4">
                ⏱ Dmitriy Borshchak appears at approximately [TIMESTAMP]
              </p>
            </div>

            <div className="card-elevated max-w-3xl mx-auto mt-8">
              <p className="text-body">
                Are you a member of the press? For media inquiries, please
                contact us directly at{" "}
                <a
                  href="mailto:dmitriy@dlbcounsel.com"
                  className="underline hover:opacity-80"
                >
                  dmitriy@dlbcounsel.com
                </a>{" "}
                or call{" "}
                <a
                  href="tel:+16143346851"
                  className="underline hover:opacity-80"
                >
                  614-334-6851
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-2xl text-center">
            <h2 className="heading-section mb-4">Schedule a Consultation</h2>
            <p className="text-body mb-8">
              For legal matters, reach out to our team directly.
            </p>
            <a href="tel:+16143346851" className="btn-cta">
              <Phone className="w-5 h-5 mr-2" />
              Call Us: 614-334-6851
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Press;
