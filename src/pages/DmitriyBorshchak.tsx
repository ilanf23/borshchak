import { Phone, Award, GraduationCap, Briefcase, Mic } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dmitriyPhoto from "@/assets/dmitriy-borshchak.png";
import localLawyerBadge from "@/assets/dmitriy-local-lawyer-badge.png";

const DmitriyBorshchak = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-secondary/50 min-h-[500px] md:min-h-[600px]">
          <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
            <div className="flex-1 flex items-center section-padding">
              <div className="max-w-xl ml-auto mr-8">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  Borshchak Law Group | Columbus, OH
                </p>
                <h1 className="heading-hero mb-6">Dmitriy Borshchak</h1>
                <p className="text-body text-lg leading-relaxed">
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
            </div>
          </div>
        </section>

        {/* Recognition Badge */}
        <section className="section-padding-sm bg-card border-y border-border">
          <div className="container max-w-4xl">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a
                href="https://profiles.superlawyers.com/ohio/columbus/lawyer/dmitriy-borshchak/a9cce30e-86fb-4b84-850f-f4210c6f95ea.html?npcmp=slb:badge:sl_badge:a9cce30e-86fb-4b84-850f-f4210c6f95ea:year&utm_source=a9cce30e-86fb-4b84-850f-f4210c6f95ea&utm_campaign=v2-slbadge-gray&utm_content=profile&utm_medium=dlbcounsel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:opacity-80 transition-opacity"
              >
                <Award className="w-10 h-10 text-primary" />
                <div className="text-center">
                  <div className="font-serif text-xl font-semibold text-primary">Super Lawyers Rising Star</div>
                  <div className="text-sm text-muted-foreground">Selected in 2023</div>
                </div>
              </a>
              <a
                href="https://mylocallawyer.org/lawyers/dmitriy-borshchak/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img src={localLawyerBadge} alt="My Local Lawyer - Top 10 2023" className="h-16 w-auto" />
              </a>
            </div>
          </div>
        </section>

        {/* Video */}
        <section className="section-padding-sm bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
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

        {/* Education, Speaking, Legal Career Accordion */}
        <section className="section-padding bg-card">
          <div className="container max-w-4xl">
            <Tabs defaultValue="education" className="w-full">
              <TabsList className="w-full h-auto flex-wrap gap-2 bg-transparent p-0 mb-8">
                <TabsTrigger value="education" className="flex items-center gap-2 px-5 py-3 text-base font-medium border border-border rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="speaking" className="flex items-center gap-2 px-5 py-3 text-base font-medium border border-border rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">
                  <Mic className="w-5 h-5" />
                  Speaking Engagements
                </TabsTrigger>
                <TabsTrigger value="career" className="flex items-center gap-2 px-5 py-3 text-base font-medium border border-border rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">
                  <Briefcase className="w-5 h-5" />
                  Legal Career
                </TabsTrigger>
              </TabsList>

              <TabsContent value="education">
                <div className="space-y-6 text-body">
                  <p>Dmitriy obtained his undergraduate degree in Political Science from Ohio University. There, he joined the student senate and began investigating how he could personally help the local community and students.</p>
                  <p>He went on to attend law school at Capital University Law School in Columbus, Ohio. During his time there, Dmitriy was a member of the American Association for Justice Mock Trial Team, was on the Dean's List, and received the CALI Award for Business and Financial Concepts for Lawyers.</p>
                  <p>During his time in law school, he also worked pro bono, representing individuals in the Capital University Law School Litigation Clinic who could not afford an attorney at no charge.</p>
                </div>
              </TabsContent>

              <TabsContent value="speaking">
                <div className="space-y-6 text-body">
                  <p>Recently, Dmitriy was invited to lead a seminar on uncovering hidden or concealed assets during litigation. During the seminar, Dmitriy covered a range of topics related to asset division, including evaluating and finding hidden assets, classifying marital vs. non-marital assets, valuing assets, and how to divide assets.</p>
                  <p>Much of his discussion centered on using tax forms, specifically Federal Form 1040, to uncover hidden assets. Dmitriy went through the form line by line, showcasing how each itemized line represents various forms of income and explaining the significance of each line in relation to other listed income and assets.</p>
                </div>
              </TabsContent>

              <TabsContent value="career">
                <div className="space-y-6 text-body">
                  <p>Dmitriy began his law career at the Franklin County Prosecutor's Office while still in law school. There, he focused his practice on felonies while simultaneously working as a supervised assistant prosecutor at Hilliard's Mayor's Court.</p>
                  <p>He also gained invaluable experience working at the consulting firm of Milegroup Consulting in Mayfield Village, Ohio. There, Dmitriy gained concrete experience dealing with financial risk—knowledge he uses today to help his clients foresee and pinpoint issues that his clients may face.</p>
                  <p>Dmitriy's legal experience also encompasses time spent working as a Law Clerk at Kats Law in Shaker Heights, Ohio, where he primarily handled matters relating to personal injury claims, including correspondence with insurance companies, meeting with clients, and compiling demand packets.</p>
                  <p>In 2016, Dmitriy joined Weis & O'Connor, LLC in Columbus, Ohio, first as a Law Clerk and later as an Associate of the firm. During his time there, Dmitriy gained extensive experience preparing and drafting pleadings on behalf of clients, responding to opposing counsels' motions, advising clients on various family law issues, and more.</p>
                  <p>He learned how to help clients understand the inherent risks involved in their case, as well as how to manage those risks. Today, Dmitriy uses this insight to help clients avoid and/or diminish the risk to liability, as well as financial risks associated with their situation.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-2xl text-center">
            <h2 className="heading-section mb-4">
              Looking for a Columbus Family Lawyer?
            </h2>
            <p className="text-body mb-8">
              Call 380-324-0878 to get a free initial consultation with one of our team members.
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

export default DmitriyBorshchak;
