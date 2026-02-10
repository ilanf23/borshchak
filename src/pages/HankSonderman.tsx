import { Award, GraduationCap, Briefcase, Heart, BookOpen, Scale, Users, MapPin, CheckCircle2, Handshake, Trophy } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import hankPhoto from "@/assets/hank-sonderman-hero.png";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const HankSonderman = () => {
  const videoAnim = useScrollAnimation();
  const tabsAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-navy min-h-[500px] md:min-h-[600px]">
          <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
            <div className="flex-1 flex items-center section-padding">
              <div className="max-w-xl ml-auto mr-8">
                <p
                  className="text-sm font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in"
                  style={{ color: "hsla(40, 30%, 98%, 0.7)", animationDelay: "100ms" }}
                >
                  Borshchak Law Group | Columbus, OH
                </p>
                <h1
                  className="heading-hero mb-6 opacity-0 animate-fade-in"
                  style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
                >
                  Hank Sonderman
                </h1>
                <p
                  className="text-body text-lg leading-relaxed opacity-0 animate-fade-in"
                  style={{ animationDelay: "400ms" }}
                >
                  In family law, attorneys are trusted with the client's most precious and personal interests. This means that an empathetic and sincere connection to each case is essential because it fuels the drive and commitment to work for the client's best outcome.
                </p>
              </div>
            </div>
            <div className="md:w-[45%] relative">
              <img
                src={hankPhoto}
                alt="Hank Sonderman"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </section>

        {/* Video */}
        <section className="section-padding-sm bg-navy">
          <div className="container">
            <div
              ref={videoAnim.ref}
              className={`max-w-4xl mx-auto ${videoAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
            >
              <h2
                className="heading-section text-center mb-8"
                style={{ color: "hsl(var(--primary-foreground))" }}
              >
                Meet Hank
              </h2>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.youtube.com/embed/M1DSZLFOHZM"
                  title="Hank Sonderman - Borshchak Law Group"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section
          className="section-padding bg-card"
          style={{ borderTop: "3px solid hsl(var(--green-accent))" }}
        >
          <div
            ref={tabsAnim.ref}
            className={`container max-w-4xl ${tabsAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <h2 className="heading-section text-center mb-10">Professional Background</h2>
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full h-auto flex-wrap gap-2 bg-transparent p-0 mb-8">
                <TabsTrigger value="about" className="flex items-center gap-2 px-5 py-3 text-base font-medium border border-border rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">
                  <Briefcase className="w-5 h-5" />
                  About
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2 px-5 py-3 text-base font-medium border border-border rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="interests" className="flex items-center gap-2 px-5 py-3 text-base font-medium border border-border rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">
                  <Heart className="w-5 h-5" />
                  Interests
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="animate-fade-in">
                <div className="space-y-6">
                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <Handshake className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-lg mb-1">Dedicated Family Law Attorney</h4>
                      <p className="text-body text-base">Family law is an inherently unpredictable field that requires patience, understanding, and dedication to the client's objectives. Hank is happy to work with individuals who exemplify those characteristics every day.</p>
                    </div>
                  </div>

                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-lg mb-1">A Collaborative Partnership</h4>
                      <p className="text-body text-base">Hank and Dmitriy's friendship goes back to law school, where they were often asked to leave the library at late hours by the Capital Law School custodial staff. Today, they work together as a small, tight-knit firm operating as one collaborative brain trust.</p>
                    </div>
                  </div>

                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}>
                      <CheckCircle2 className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-lg mb-1">Client-Focused Outcomes</h4>
                      <p className="text-body text-base">Hank spent years in the service industry, where customer satisfaction is both a high priority and the source of gratification. As a family law attorney, he is proud to represent clients with the goal of producing outcomes wherein their situations have improved.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="education" className="animate-fade-in">
                <div className="space-y-6">
                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-lg mb-1">The Ohio State University</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3.5 h-3.5" /> Columbus, OH
                      </div>
                      <p className="text-body text-base">Undergraduate degree from one of Ohio's premier institutions.</p>
                    </div>
                  </div>

                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <Scale className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-lg mb-1">Capital University Law School</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3.5 h-3.5" /> Columbus, OH
                      </div>
                      <p className="text-body text-base">Earned his Juris Doctor degree, where he forged a lasting partnership with Dmitriy Borshchak that would become the foundation of Borshchak Law Group.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="interests" className="animate-fade-in">
                <div className="space-y-6">
                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-lg mb-1">Sports & Trivia Enthusiast</h4>
                      <p className="text-body text-base mb-3">His interests include watching all sports, Jeopardy, and spending time with friends and family in no particular order.</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="trust-badge text-xs"><CheckCircle2 className="w-3.5 h-3.5" /> Sand Volleyball</span>
                        <span className="trust-badge text-xs"><CheckCircle2 className="w-3.5 h-3.5" /> Golf</span>
                        <span className="trust-badge text-xs"><CheckCircle2 className="w-3.5 h-3.5" /> Bar Trivia Host</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default HankSonderman;
