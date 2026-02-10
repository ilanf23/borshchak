import { Award, GraduationCap, Briefcase, Heart, BookOpen, Scale, Users, MapPin, CheckCircle2, Handshake, School } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import keriPhoto from "@/assets/keri-reeves.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const KeriReeves = () => {
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
                  Keri Reeves
                </h1>
                <p
                  className="text-body text-lg leading-relaxed opacity-0 animate-fade-in"
                  style={{ animationDelay: "400ms" }}
                >
                  Keri brings a unique blend of compassion from her teaching career and a fierce drive for protecting families into the field of family law. Her journey from educator to attorney was inspired by watching her students navigate difficult family situations — and wanting to do more.
                </p>
              </div>
            </div>
            <div className="md:w-[45%] relative">
              <img
                src={keriPhoto}
                alt="Keri Reeves"
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
                Meet Keri
              </h2>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.youtube.com/embed/NZ5tMXCZ5k4"
                  title="Keri Reeves - Borshchak Law Group"
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
            <Tabs defaultValue="journey" className="w-full">
              <TabsList className="w-full h-auto flex-wrap gap-2 bg-transparent p-0 mb-8">
                <TabsTrigger value="journey" className="flex items-center gap-2 px-5 py-3 text-base font-medium border border-border rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">
                  <Heart className="w-5 h-5" />
                  Her Journey
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2 px-5 py-3 text-base font-medium border border-border rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="career" className="flex items-center gap-2 px-5 py-3 text-base font-medium border border-border rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">
                  <Briefcase className="w-5 h-5" />
                  Legal Career
                </TabsTrigger>
              </TabsList>

              <TabsContent value="journey" className="animate-fade-in">
                <div className="space-y-6">
                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <School className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-lg mb-1">From Teacher to Advocate</h4>
                      <p className="text-sm font-medium text-muted-foreground mb-2">DeRidder High School, Louisiana</p>
                      <p className="text-body text-base">Keri began her career as a high school English teacher. Her favorite part of the job was her students — and those very students are the reason she became a lawyer.</p>
                    </div>
                  </div>

                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}>
                      <Handshake className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-lg mb-1">Inspired by Her Students</h4>
                      <p className="text-body text-base">Each day she watched her students walk through a plethora of family issues, including abuse and neglect, adoption, and divorce. As a teacher, she could only be a listening ear — but as an attorney she could effect change.</p>
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
                      <h4 className="heading-subsection text-lg mb-1">McNeese State University</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3.5 h-3.5" /> Louisiana
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">B.A. English, Concentration in Secondary Education</p>
                      <p className="text-body text-base">Obtained her undergraduate degree with a focus on education, laying the foundation for a career built on helping others.</p>
                    </div>
                  </div>

                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <Scale className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-lg mb-1">Capital University Law School</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-3.5 h-3.5" /> Columbus, OH
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="trust-badge text-xs"><Award className="w-3.5 h-3.5" /> Dean's List</span>
                        <span className="trust-badge text-xs"><Award className="w-3.5 h-3.5" /> Order of the Barristers</span>
                        <span className="trust-badge text-xs"><CheckCircle2 className="w-3.5 h-3.5" /> Pro Bono Legal Honors</span>
                      </div>
                      <p className="text-body text-base">Served on the Executive Board of the Moot Court Team, Student Bar Association Committees, and graduated with Pro Bono Legal Honors.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="career" className="animate-fade-in">
                <div className="space-y-6">
                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-lg mb-1">Maguire Schneider Hassay</h4>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Law Clerk</p>
                      <p className="text-body text-base mb-3">Primarily assisted in matters relating to personal injury, while also gaining exposure to family law cases that reaffirmed her passion for helping families in their most difficult situations.</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="trust-badge text-xs"><CheckCircle2 className="w-3.5 h-3.5" /> Personal Injury</span>
                        <span className="trust-badge text-xs"><CheckCircle2 className="w-3.5 h-3.5" /> Family Law</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}>
                      <Users className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-lg mb-1">Borshchak Law Group</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3.5 h-3.5" /> Columbus, OH
                      </div>
                      <p className="text-body text-base">Keri joined Borshchak Law Group after graduating from law school, bringing her compassion honed through teaching experience and her drive for protecting families into the field of family law.</p>
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

export default KeriReeves;
