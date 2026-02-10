import { Phone, GraduationCap, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import hankPhoto from "@/assets/hank-sonderman.png";

const HankSonderman = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-4xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src={hankPhoto}
                alt="Hank Sonderman"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg flex-shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  Borshchak Law Group | Columbus, OH
                </p>
                <h1 className="heading-hero mb-6">Hank Sonderman</h1>
                <p className="text-body text-lg leading-relaxed">
                  In family law, attorneys are trusted with the client's most precious and personal interests. This means that an empathetic and sincere connection to each case is essential because it fuels the drive and commitment to work for the client's best outcome.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video */}
        <section className="section-padding-sm bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
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

        {/* About */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <div className="space-y-6 text-body">
              <p>
                Family law is an inherently unpredictable field that requires patience, understanding, and dedication to the client's objectives. Hank is happy to work with individuals who exemplify those characteristics every day.
              </p>
              <p>
                Hank and Dmitriy's friendship goes back to law school, where they were often asked to leave the library at late hours by the Capital Law School custodial staff. Today, they work together as a small, tight-knit firm operating as one collaborative brain trust. They, along with the other firm members, discuss their cases and strategy with the same passion and enthusiasm reserved for debates over sports and television shows.
              </p>
              <p>
                Hank never thought he would be practicing in the field of family law, but it suits him well. He spent years in the service industry, wherein customer satisfaction is both a high priority and the source of gratification for the work. As a family law attorney, almost no one reaches out on their best day. Hank is proud to represent his clients with the goal of producing outcomes wherein their situations have improved from the time they first reach out for help.
              </p>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="section-padding bg-card">
          <div className="container max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-7 h-7 text-primary" />
              <h2 className="heading-section mb-0">Education</h2>
            </div>
            <div className="space-y-6 text-body">
              <p>
                Hank is a graduate of the Ohio State University and Capital University Law School.
              </p>
            </div>
          </div>
        </section>

        {/* Interests */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-7 h-7 text-primary" />
              <h2 className="heading-section mb-0">Interests</h2>
            </div>
            <div className="space-y-6 text-body">
              <p>
                His interests are watching all sports, Jeopardy, and spending time with friends and family in no particular order. You can find him outside of the office at sand volleyball, the golf course, and hosting bar trivia.
              </p>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
};

export default HankSonderman;
