import { Phone, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const smallerCourts = [
  {
    county: "Pickaway",
    url: "https://www.pickaway.org/government/courts/common-pleas",
  },
  {
    county: "Licking",
    url: "https://lickingcountyohio.us/courts/domestic-relations/",
  },
  {
    county: "Union",
    url: "https://www.co.union.oh.us/Courts/Court-of-Common-Pleas/",
  },
  {
    county: "Madison",
    url: "https://www.co.madison.oh.us/government/courts",
  },
  {
    county: "Fairfield",
    url: "https://www.fairfieldcountyoh.gov/government/courts",
  },
];

const CourtInfo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-navy min-h-[450px] md:min-h-[500px] flex items-center">
          <div className="container max-w-4xl section-padding relative z-10">
            <p
              className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in"
              style={{
                color: "hsla(40, 30%, 98%, 0.7)",
                animationDelay: "100ms",
              }}
            >
              Courts We Practice In
            </p>
            <h1
              className="heading-hero mb-6 opacity-0 animate-fade-in"
              style={{
                color: "hsl(var(--primary-foreground))",
                animationDelay: "250ms",
              }}
            >
              Know Your Local Family Court
            </h1>
            <p
              className="text-body text-xl leading-relaxed max-w-2xl opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Borshchak Law Group practices throughout Central Ohio. Find
              domestic relations court details, forms, and parenting time
              schedules for all 7 counties we serve.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding bg-card">
          <div className="container max-w-5xl">
            {/* SVG County Map */}
            <div className="bg-navy rounded-xl p-8 max-w-3xl mx-auto mb-12">
              <svg width="100%" viewBox="0 0 680 440" xmlns="http://www.w3.org/2000/svg">
                {/* Union County top left */}
                <rect x="60" y="40" width="140" height="120" rx="4"
                  fill="hsl(var(--trust-navy))" stroke="hsl(var(--green-accent))" strokeWidth="0.5" strokeOpacity="0.4"/>
                <text x="130" y="95" textAnchor="middle"
                  style={{fontFamily:"serif",fontSize:"14px",fontWeight:600,fill:"hsl(var(--primary-foreground))"}}>Union</text>
                <text x="130" y="113" textAnchor="middle"
                  style={{fontSize:"11px",fill:"hsla(40,30%,98%,0.5)"}}>County</text>

                {/* Delaware County top center */}
                <rect x="200" y="40" width="160" height="120" rx="4"
                  fill="hsl(var(--trust-navy))" stroke="hsl(var(--green-accent))" strokeWidth="0.5" strokeOpacity="0.4"/>
                <text x="280" y="95" textAnchor="middle"
                  style={{fontFamily:"serif",fontSize:"14px",fontWeight:600,fill:"hsl(var(--primary-foreground))"}}>Delaware</text>
                <text x="280" y="113" textAnchor="middle"
                  style={{fontSize:"11px",fill:"hsla(40,30%,98%,0.5)"}}>County</text>

                {/* Licking County top right */}
                <rect x="360" y="40" width="160" height="120" rx="4"
                  fill="hsl(var(--trust-navy))" stroke="hsl(var(--green-accent))" strokeWidth="0.5" strokeOpacity="0.4"/>
                <text x="440" y="95" textAnchor="middle"
                  style={{fontFamily:"serif",fontSize:"14px",fontWeight:600,fill:"hsl(var(--primary-foreground))"}}>Licking</text>
                <text x="440" y="113" textAnchor="middle"
                  style={{fontSize:"11px",fill:"hsla(40,30%,98%,0.5)"}}>County</text>

                {/* Madison County middle left */}
                <rect x="60" y="160" width="140" height="130" rx="4"
                  fill="hsl(var(--trust-navy))" stroke="hsl(var(--green-accent))" strokeWidth="0.5" strokeOpacity="0.4"/>
                <text x="130" y="221" textAnchor="middle"
                  style={{fontFamily:"serif",fontSize:"14px",fontWeight:600,fill:"hsl(var(--primary-foreground))"}}>Madison</text>
                <text x="130" y="239" textAnchor="middle"
                  style={{fontSize:"11px",fill:"hsla(40,30%,98%,0.5)"}}>County</text>

                {/* Franklin County center - PRIMARY highlighted */}
                <rect x="200" y="160" width="160" height="130" rx="4"
                  fill="hsl(var(--green-accent))" stroke="hsl(var(--green-accent))" strokeWidth="2"/>
                <circle cx="280" cy="195" r="8" fill="hsl(var(--primary-foreground))" opacity="0.9"/>
                <circle cx="280" cy="195" r="4" fill="hsl(var(--green-accent))"/>
                <text x="280" y="228" textAnchor="middle"
                  style={{fontFamily:"serif",fontSize:"15px",fontWeight:700,fill:"hsl(var(--primary-foreground))"}}>Franklin</text>
                <text x="280" y="246" textAnchor="middle"
                  style={{fontSize:"11px",fill:"hsla(40,30%,98%,0.8)"}}>{"County \u00b7 Primary"}</text>

                {/* Fairfield County middle right */}
                <rect x="360" y="160" width="160" height="130" rx="4"
                  fill="hsl(var(--trust-navy))" stroke="hsl(var(--green-accent))" strokeWidth="0.5" strokeOpacity="0.4"/>
                <text x="440" y="221" textAnchor="middle"
                  style={{fontFamily:"serif",fontSize:"14px",fontWeight:600,fill:"hsl(var(--primary-foreground))"}}>Fairfield</text>
                <text x="440" y="239" textAnchor="middle"
                  style={{fontSize:"11px",fill:"hsla(40,30%,98%,0.5)"}}>County</text>

                {/* Pickaway County bottom center */}
                <rect x="200" y="290" width="160" height="110" rx="4"
                  fill="hsl(var(--trust-navy))" stroke="hsl(var(--green-accent))" strokeWidth="0.5" strokeOpacity="0.4"/>
                <text x="280" y="341" textAnchor="middle"
                  style={{fontFamily:"serif",fontSize:"14px",fontWeight:600,fill:"hsl(var(--primary-foreground))"}}>Pickaway</text>
                <text x="280" y="359" textAnchor="middle"
                  style={{fontSize:"11px",fill:"hsla(40,30%,98%,0.5)"}}>County</text>

                {/* Legend */}
                <rect x="540" y="160" width="120" height="70" rx="4"
                  fill="none" stroke="hsl(var(--green-accent))" strokeWidth="0.5" strokeOpacity="0.4"/>
                <text x="600" y="180" textAnchor="middle"
                  style={{fontSize:"11px",fill:"hsla(40,30%,98%,0.5)"}}>Service area</text>
                <rect x="552" y="190" width="14" height="9" rx="2"
                  fill="hsl(var(--green-accent))"/>
                <text x="572" y="199" textAnchor="start"
                  style={{fontSize:"10px",fill:"hsl(var(--primary-foreground))"}}>Primary</text>
                <rect x="552" y="208" width="14" height="9" rx="2"
                  fill="hsl(var(--trust-navy))" stroke="hsl(var(--green-accent))" strokeWidth="0.5" strokeOpacity="0.4"/>
                <text x="572" y="217" textAnchor="start"
                  style={{fontSize:"10px",fill:"hsl(var(--primary-foreground))"}}>Service</text>
              </svg>
            </div>

            {/* Primary Court Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Franklin County */}
              <div className="card-elevated">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  Franklin County Court of Common Pleas
                </h3>
                <p className="text-base text-muted-foreground mb-4">
                  Domestic Relations &amp; Juvenile Division
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  373 South High Street, 4th Floor, Columbus, OH 43215
                </p>
                <p className="text-sm text-muted-foreground mb-5">
                  (614) 525-3628
                </p>
                <div className="flex flex-col gap-2">
                  <a href="https://drj.fccourts.org" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">
                    Court Homepage &rarr;
                  </a>
                  <a href="https://drj.fccourts.org/Court-Services/Forms" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">
                    Forms &amp; Documents &rarr;
                  </a>
                  <a href="https://drj.fccourts.org/files/assets/courtofpleas/v/1/court-services/documents/forms/parenting-time-guideline-model-dr-rule-27-1-juv-rule-22-1-1_1-2015_.pdf" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">
                    Local Parenting Time Schedule &rarr;
                  </a>
                  <a href="https://drj.fccourts.org/Court-Services/E-Filing" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">
                    E-Filing &rarr;
                  </a>
                </div>
              </div>

              {/* Delaware County */}
              <div className="card-elevated">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  Delaware County Court of Common Pleas
                </h3>
                <p className="text-base text-muted-foreground mb-4">
                  Domestic Relations Division
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  117 N. Union St., 400 Level, Delaware, OH 43015
                </p>
                <p className="text-sm text-muted-foreground mb-5">
                  (740) 833-2025
                </p>
                <div className="flex flex-col gap-2">
                  <a href="https://domestic.co.delaware.oh.us" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">
                    Court Homepage &rarr;
                  </a>
                  <a href="https://domestic.co.delaware.oh.us/forms/" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">
                    Forms &amp; Documents &rarr;
                  </a>
                  <a href="https://domestic.co.delaware.oh.us/wp-content/uploads/sites/44/2022/02/Local-Parenting-Time-Schedule.pdf" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">
                    Local Parenting Time Schedule &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Counties */}
            <h2 className="heading-section mb-8">Additional Service Counties</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {smallerCourts.map((court) => (
                <div key={court.county} className="card-bordered">
                  <h3 className="heading-subsection mb-1">
                    {court.county} County
                  </h3>
                  <p className="text-base text-muted-foreground mb-4">
                    Domestic Relations Court
                  </p>
                  <a
                    href={court.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline hover:opacity-80 inline-flex items-center gap-1"
                  >
                    Court Website
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-2xl text-center">
            <h2 className="heading-section mb-4">
              Not Sure Which Court Handles Your Case?
            </h2>
            <p className="text-body mb-8">
              Our attorneys practice throughout all of these counties and can
              advise you on where to file and what to expect from your local
              court.
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

export default CourtInfo;
