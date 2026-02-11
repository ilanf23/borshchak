import { Phone, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import blogCustodyStateLines from "@/assets/blog-custody-state-lines.jpg";
import blogQuestionsBeforeDivorce from "@/assets/blog-questions-before-divorce.jpg";
import blogJudgesFairSettlements from "@/assets/blog-judges-fair-settlements.jpg";
import blogMovingOutRisks from "@/assets/blog-moving-out-risks.jpg";
import blogFilingOutOfState from "@/assets/blog-filing-out-of-state.jpg";
import blogCollegeExpenses from "@/assets/blog-college-expenses.jpg";
import blogInheritanceDivorce from "@/assets/blog-inheritance-divorce.jpg";
import blogAlimonyDisputes from "@/assets/blog-alimony-disputes.jpg";
import blogFastTrackDissolution from "@/assets/blog-fast-track-dissolution.jpg";
import blogEvidenceEssentials from "@/assets/blog-evidence-essentials.jpg";

const blogPosts = [
  {
    title: "Enforcing Ohio Child Custody Orders Across State Lines: UCCJEA Explained",
    excerpt: "Navigating the complexities of child custody can be daunting for any parent—especially when life's circumstances take you across state lines.",
    date: "February 10, 2026",
    slug: "custody-state-lines",
    category: "Child Custody",
    image: blogCustodyStateLines,
  },
  {
    title: "Essential Questions to Ask Before Filing for Divorce in Ohio",
    excerpt: "Divorce is never an easy decision, and for small business owners, developers, and general readers in Ohio, the process can feel especially overwhelming.",
    date: "February 10, 2026",
    slug: "questions-before-divorce",
    category: "Divorce",
    image: blogQuestionsBeforeDivorce,
  },
  {
    title: "Unveiling Ohio Judges' Approach: Key Factors in Fair Divorce Settlements",
    excerpt: "Navigating a divorce can be one of the most challenging journeys in life, especially when it comes to achieving a fair settlement.",
    date: "February 10, 2026",
    slug: "judges-fair-settlements",
    category: "Divorce",
    image: blogJudgesFairSettlements,
  },
  {
    title: "What Are the Legal Risks of Moving Out During an Ohio Divorce?",
    excerpt: "Divorce is never easy, and the choices you make early in the process can have lasting legal consequences.",
    date: "February 10, 2026",
    slug: "moving-out-risks",
    category: "Divorce",
    image: blogMovingOutRisks,
  },
  {
    title: "Can You File for Divorce in Ohio While Living Out of State? Residency Rules Explained",
    excerpt: "Facing divorce is never easy, and the process can become even more complex if you no longer live in the state where you were married.",
    date: "February 10, 2026",
    slug: "filing-out-of-state",
    category: "Divorce",
    image: blogFilingOutOfState,
  },
  {
    title: "How Divorce Impacts College Expenses for Children in Ohio: Legal Obligations and Agreements",
    excerpt: "Navigating the financial landscape of divorce is never easy, especially when children's futures are at stake.",
    date: "February 10, 2026",
    slug: "college-expenses",
    category: "Financial Matters",
    image: blogCollegeExpenses,
  },
  {
    title: "What Happens to Inheritance Money in an Ohio Divorce? Separate Property or Marital Asset?",
    excerpt: "If you're going through a divorce in Ohio, understanding how inheritance is treated can protect your financial interests.",
    date: "February 10, 2026",
    slug: "inheritance-divorce",
    category: "Financial Matters",
    image: blogInheritanceDivorce,
  },
  {
    title: "Ohio Courts and Alimony Disputes: Modification, Enforcement, and Key Legal Standards",
    excerpt: "Alimony, also known as spousal support, is often one of the most contentious aspects of a divorce.",
    date: "February 10, 2026",
    slug: "alimony-disputes",
    category: "Spousal Support",
    image: blogAlimonyDisputes,
  },
  {
    title: "Fast-Tracking Divorce in Ohio: Dissolution's 30-90 Day Path Under Key Conditions",
    excerpt: "Navigating the end of a marriage can be daunting, especially when you want to resolve things quickly and amicably.",
    date: "February 9, 2026",
    slug: "fast-track-dissolution",
    category: "Dissolution",
    image: blogFastTrackDissolution,
  },
  {
    title: "Key Evidence Essentials for Winning Your Ohio Divorce Case",
    excerpt: "Divorce is never easy, especially when the stakes are high. Understanding the key evidence you need can make all the difference.",
    date: "February 9, 2026",
    slug: "evidence-essentials",
    category: "Divorce",
    image: blogEvidenceEssentials,
  },
];

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-4xl">
            <p className="text-base font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Blog
            </p>
            <h1 className="heading-hero mb-6">
              Ohio Family Law Insights
            </h1>
            <p className="text-body text-xl">
              Stay informed with our latest articles on divorce, custody, and family law in Ohio. Knowledge is your best ally during difficult times.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="section-padding">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <Link
                  key={index}
                  to={`/blog/${post.slug}`}
                  className="card-elevated group hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden rounded-lg"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-primary font-medium text-sm mt-4">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-muted/50">
          <div className="container max-w-3xl text-center">
            <p className="text-base text-muted-foreground">
              The information on this page is for educational purposes only and does not constitute legal advice. 
              Every case is different. For guidance specific to your situation, schedule a consultation.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-2xl text-center">
            <h2 className="heading-section mb-4">Have Specific Questions?</h2>
            <p className="text-body mb-8">
              Schedule a free consultation to get answers tailored to your situation.
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

export default Resources;
