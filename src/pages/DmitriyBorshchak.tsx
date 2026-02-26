import { Phone, Award, GraduationCap, Briefcase, Mic, BookOpen, Scale, Users, TrendingUp, FileText, Building2, Gavel, MapPin, Star, CheckCircle2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dmitriyPhoto from "@/assets/dmitriy-borshchak.png";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const DmitriyBorshchak = () => {
  const badgesAnim = useScrollAnimation();
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
                  className="text-base font-medium uppercase tracking-wider mb-4 opacity-0 animate-fade-in"
                  style={{ color: "hsla(40, 30%, 98%, 0.7)", animationDelay: "100ms" }}
                >
                  Borshchak Law Group | Columbus, OH
                </p>
                <h1
                  className="heading-hero mb-6 opacity-0 animate-fade-in"
                  style={{ color: "hsl(var(--primary-foreground))", animationDelay: "250ms" }}
                >
                  Dmitriy Borshchak
                </h1>
                <p
                  className="text-body text-xl leading-relaxed opacity-0 animate-fade-in"
                  style={{ animationDelay: "400ms" }}
                >
                  Dmitriy Borshchak is a dedicated family lawyer in Columbus and founding attorney of Borshchak Law Group. After first pursuing a brief career in medicine, Dmitriy found his true passion in the legal field, assisting clients and helping them navigate tough situations.
                </p>
              </div>
            </div>
            <div className="md:w-[45%] relative">
              <img
                src={dmitriyPhoto}
                alt="Dmitriy Borshchak"
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0 pointer-events-none hidden md:block"
                style={{
                  background: "linear-gradient(to right, hsl(var(--trust-navy)) 0%, transparent 30%)",
                }}
              />
            </div>
          </div>
        </section>

        {/* Recognition Badge */}
        <section className="section-padding-sm bg-card border-y border-border">
          <div
            ref={badgesAnim.ref}
            className={`container max-w-4xl ${badgesAnim.isVisible ? "scroll-visible" : "scroll-hidden"}`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a
                href="https://profiles.superlawyers.com/ohio/columbus/lawyer/dmitriy-borshchak/a9cce30e-86fb-4b84-850f-f4210c6f95ea.html?npcmp=slb:badge:sl_badge:a9cce30e-86fb-4b84-850f-f4210c6f95ea:year&utm_source=a9cce30e-86fb-4b84-850f-f4210c6f95ea&utm_campaign=v2-slbadge-gray&utm_content=profile&utm_medium=dlbcounsel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:opacity-80 transition-all duration-200 hover:scale-105"
              >
                <Award className="w-10 h-10 text-primary" />
                <div className="text-center">
                  <div className="font-serif text-2xl font-semibold text-primary">Super Lawyers Rising Star</div>
                  <div className="text-base text-muted-foreground">Selected in 2023</div>
                </div>
              </a>
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
                Meet Dmitriy
              </h2>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.youtube.com/embed/lN_avUAmYnk"
                  title="Dmitriy Borshchak - Borshchak Law Group"
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
            <Tabs defaultValue="education" className="w-full">
              <TabsList className="w-full h-auto flex-wrap gap-2 bg-transparent p-0 mb-8">
                <TabsTrigger value="education" className="flex items-center gap-2 px-5 py-3 text-lg font-medium border border-border rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="speaking" className="flex items-center gap-2 px-5 py-3 text-lg font-medium border border-border rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">
                  <Mic className="w-5 h-5" />
                  Speaking Engagements
                </TabsTrigger>
                <TabsTrigger value="career" className="flex items-center gap-2 px-5 py-3 text-lg font-medium border border-border rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">
                  <Briefcase className="w-5 h-5" />
                  Legal Career
                </TabsTrigger>
              </TabsList>

              <TabsContent value="education" className="animate-fade-in">
                <div className="space-y-6">
                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-xl mb-1">Ohio University</h4>
                      <p className="text-base font-medium text-muted-foreground mb-2">B.A. Political Science</p>
                      <p className="text-body text-lg">Joined the student senate and began investigating how he could personally help the local community and students.</p>
                    </div>
                  </div>

                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <Scale className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-xl mb-1">Capital University Law School</h4>
                      <p className="text-base font-medium text-muted-foreground mb-3">Columbus, Ohio</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="trust-badge text-sm"><Star className="w-3.5 h-3.5" /> Dean's List</span>
                        <span className="trust-badge text-sm"><Award className="w-3.5 h-3.5" /> CALI Award</span>
                        <span className="trust-badge text-sm"><Gavel className="w-3.5 h-3.5" /> Mock Trial Team</span>
                      </div>
                      <p className="text-body text-lg">Member of the American Association for Justice Mock Trial Team. Received the CALI Award for Business and Financial Concepts for Lawyers.</p>
                    </div>
                  </div>

                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}>
                      <Users className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-xl mb-1">Pro Bono Work</h4>
                      <p className="text-base font-medium text-muted-foreground mb-2">Capital University Litigation Clinic</p>
                      <p className="text-body text-lg">Represented individuals who could not afford an attorney at no charge during law school.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="speaking" className="animate-fade-in">
                <div className="space-y-6">
                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <Mic className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-xl mb-1">Uncovering Hidden Assets During Litigation</h4>
                      <p className="text-base font-medium text-muted-foreground mb-3">Featured Seminar</p>
                      <p className="text-body text-lg mb-4">Dmitriy led a comprehensive seminar covering asset division strategies, including evaluating and finding hidden assets, classifying marital vs. non-marital assets, and valuation techniques.</p>
                      <div className="space-y-2">
                        <h5 className="text-base font-semibold text-primary">Topics Covered</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 text-body text-base">
                            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "hsl(var(--green-accent))" }} />
                            Evaluating hidden assets
                          </div>
                          <div className="flex items-center gap-2 text-body text-base">
                            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "hsl(var(--green-accent))" }} />
                            Marital vs. non-marital assets
                          </div>
                          <div className="flex items-center gap-2 text-body text-base">
                            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "hsl(var(--green-accent))" }} />
                            Federal Form 1040 analysis
                          </div>
                          <div className="flex items-center gap-2 text-body text-base">
                            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "hsl(var(--green-accent))" }} />
                            Asset valuation & division
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="career" className="animate-fade-in">
                <div className="space-y-6">
                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <Gavel className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-xl mb-1">Franklin County Prosecutor's Office</h4>
                      <div className="flex items-center gap-2 text-base text-muted-foreground mb-2">
                        <MapPin className="w-3.5 h-3.5" /> Columbus, OH
                      </div>
                      <p className="text-body text-lg">Focused on felonies while simultaneously working as a supervised assistant prosecutor at Hilliard's Mayor's Court.</p>
                    </div>
                  </div>

                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-xl mb-1">Milegroup Consulting</h4>
                      <div className="flex items-center gap-2 text-base text-muted-foreground mb-2">
                        <MapPin className="w-3.5 h-3.5" /> Mayfield Village, OH
                      </div>
                      <p className="text-body text-lg">Gained concrete experience dealing with financial risk, knowledge he uses today to help clients foresee and pinpoint issues they may face.</p>
                    </div>
                  </div>

                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--secondary))" }}>
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-xl mb-1">Kats Law</h4>
                      <div className="flex items-center gap-2 text-base text-muted-foreground mb-2">
                        <MapPin className="w-3.5 h-3.5" /> Shaker Heights, OH
                      </div>
                      <p className="text-body text-lg">Handled personal injury claims including correspondence with insurance companies, meeting with clients, and compiling demand packets.</p>
                    </div>
                  </div>

                  <div className="card-bordered flex gap-5 items-start hover:shadow-md transition-shadow duration-200">
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsla(152, 45%, 38%, 0.1)" }}>
                      <Building2 className="w-6 h-6" style={{ color: "hsl(var(--green-accent))" }} />
                    </div>
                    <div>
                      <h4 className="heading-subsection text-xl mb-1">Weis & O'Connor, LLC</h4>
                      <div className="flex items-center gap-2 text-base text-muted-foreground mb-2">
                        <MapPin className="w-3.5 h-3.5" /> Columbus, OH · 2016
                      </div>
                      <p className="text-body text-lg mb-3">Started as Law Clerk, promoted to Associate. Gained extensive experience in family law: preparing pleadings, responding to motions, and advising clients.</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="trust-badge text-sm"><CheckCircle2 className="w-3.5 h-3.5" /> Pleadings & Motions</span>
                        <span className="trust-badge text-sm"><CheckCircle2 className="w-3.5 h-3.5" /> Client Advisory</span>
                        <span className="trust-badge text-sm"><CheckCircle2 className="w-3.5 h-3.5" /> Risk Management</span>
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

export default DmitriyBorshchak;
