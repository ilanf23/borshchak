import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const resources = [
  {
    category: "Divorce Basics",
    articles: [
      { title: "Understanding Divorce in Ohio: A Complete Guide", href: "#" },
      { title: "Contested vs. Uncontested Divorce: Which Path Is Right?", href: "#" },
      { title: "What to Expect at Your First Divorce Hearing", href: "#" }
    ]
  },
  {
    category: "Child Custody",
    articles: [
      { title: "Ohio's Best Interest Standard Explained", href: "#" },
      { title: "Creating an Effective Parenting Plan", href: "#" },
      { title: "How to Handle Custody Disagreements", href: "#" }
    ]
  },
  {
    category: "Financial Matters",
    articles: [
      { title: "How Ohio Divides Marital Property", href: "#" },
      { title: "Protecting Your Business During Divorce", href: "#" },
      { title: "Understanding Spousal Support in Ohio", href: "#" }
    ]
  },
  {
    category: "Practical Guides",
    articles: [
      { title: "Preparing for Your Free Consultation", href: "#" },
      { title: "Documents You'll Need for Your Divorce", href: "#" },
      { title: "Managing Finances During Separation", href: "#" }
    ]
  }
];

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-4xl">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Resources
            </p>
            <h1 className="heading-hero mb-6">
              Helpful Information for Your Situation
            </h1>
            <p className="text-body text-lg">
              Understanding the legal process helps you make better decisions. Browse our guides and articles on divorce, custody, and family law in Ohio.
            </p>
          </div>
        </section>

        {/* Resource Grid */}
        <section className="section-padding">
          <div className="container max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              {resources.map((category, index) => (
                <div key={index} className="card-elevated">
                  <h2 className="heading-subsection mb-4">{category.category}</h2>
                  <ul className="space-y-3">
                    {category.articles.map((article, idx) => (
                      <li key={idx}>
                        <a 
                          href={article.href} 
                          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
                        >
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
                          <span className="text-sm">{article.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-muted/50">
          <div className="container max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">
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

export default Resources;
