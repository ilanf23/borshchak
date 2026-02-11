import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { BlogPostData, BlogSection } from "@/data/blogPosts";

interface BlogPostProps {
  post: BlogPostData;
}

const renderSection = (section: BlogSection, index: number) => {
  switch (section.type) {
    case "paragraph":
      return <p key={index} className="text-body mb-6">{section.content}</p>;
    case "heading":
      return <h2 key={index} className="heading-subsection mt-12 mb-4">{section.content}</h2>;
    case "subheading":
      return <h3 key={index} className="text-xl md:text-2xl font-medium mt-8 mb-3" style={{ color: "hsl(var(--text-primary))" }}>{section.content}</h3>;
    case "list":
      return (
        <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
          {section.items.map((item, i) => (
            <li key={i} className="text-body-sm">{item}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div key={index} className="overflow-x-auto mb-8 mt-4">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-secondary">
                {section.headers.map((h, i) => (
                  <th key={i} className="text-left p-3 font-semibold border border-border" style={{ color: "hsl(var(--trust-navy))" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 1 ? "bg-secondary/50" : ""}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-3 border border-border text-body-sm">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "faq":
      return (
        <div key={index} className="space-y-6 mb-8">
          {section.items.map((item, i) => (
            <div key={i} className="card-bordered">
              <h3 className="text-lg font-semibold mb-2" style={{ color: "hsl(var(--trust-navy))" }}>{item.question}</h3>
              <p className="text-body-sm">{item.answer}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="aspect-[21/9] md:aspect-[3/1] overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-wider bg-primary/90 text-primary-foreground px-3 py-1 rounded-full">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mt-3 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {post.title}
              </h1>
              <div className="flex items-center gap-2 text-white/80 text-sm mt-3">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="container max-w-3xl pt-8">
          <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: "hsl(var(--trust-navy))" }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Article body */}
        <article className="container max-w-3xl py-8 md:py-12">
          {post.sections.map((section, index) => renderSection(section, index))}
        </article>

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

export default BlogPost;
