import { useState, useRef, useMemo } from "react";
import { Phone, ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allBlogPosts } from "@/data/blogPosts";

const POSTS_PER_PAGE = 10;
const CATEGORIES = ["All", ...Array.from(new Set(allBlogPosts.map((p) => p.category)))];

const Resources = () => {
  const [page, setPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredPosts = useMemo(
    () => activeCategory === "All" ? allBlogPosts : allBlogPosts.filter((p) => p.category === activeCategory),
    [activeCategory]
  );
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(page * POSTS_PER_PAGE, (page + 1) * POSTS_PER_PAGE);

  const goToPage = (newPage: number) => {
    setPage(newPage);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

        {/* Court Resources & Local Information */}
        <section className="section-padding bg-card">
          <div className="container max-w-5xl">
            <h2 className="heading-section mb-6">Court Resources &amp; Local Information</h2>
            <p className="text-body mb-6">
              The following resources are provided for informational purposes. Borshchak Law Group serves families across Central Ohio, including Franklin, Delaware, Pickaway, Licking, Union, Madison, and Fairfield counties. Links below connect directly to official county court resources.
            </p>

            <h3 className="heading-subsection mb-6">County Domestic Relations Courts</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Franklin County */}
              <div className="card-bordered">
                <h4 className="text-lg font-semibold text-foreground mb-3">Franklin County Domestic Relations Court</h4>
                <p className="text-sm text-muted-foreground mb-1">373 South High Street, 4th Floor, Columbus, OH 43215</p>
                <p className="text-sm text-muted-foreground mb-4">(614) 525-3628</p>
                <div className="flex flex-col gap-2">
                  <a href="https://drj.fccourts.org" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">Court Homepage →</a>
                  <a href="https://drj.fccourrt-Services/Forms" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">Forms &amp; Documents →</a>
                  <a href="https://drj.fccourts.org/files/assets/courtofpleas/v/1/court-services/documents/forms/parenting-time-guideline-model-dr-rule-27-1-juv-rule-22-1-1_1-2015_.pdf" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">Local Parenting Time Schedule →</a>
                </div>
              </div>

              {/* Delaware County */}
              <div className="card-bordered">
                <h4 className="text-lg font-semibold text-foreground mb-3">Delaware County Domestic Relations Court</h4>
                <p className="text-sm text-muted-foreground mb-1">117 N. Union St., 400 Level, Delaware, OH 43015</p>
                <p className="text-sm text-muted-foreground mb-4">(740) 833-2025</p>
                <div className="flex flex-col gap-2">
                  <a href="https://domestic.co.delaware.oh.us" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">Court Homepage →</a>
                  <a href="https://domestic.co.delaware.oh.us/forms/" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">Forms &amp; Documents →</a>
                  <a href="https://domestic.co.delaware.oh.us/wp-content/uploads/sites/44/2022/02/Local-Parenting-Time-Schedule.pdf" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">Local Parenting Time Schedule →</a>
                </div>
              </div>
            </div>

            <h3 className="heading-subsection mt-10 mb-6">Areas We Serve</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Franklin County", "Delaware County", "Pickaway County", "Licking County", "Union County", "Madison County", "Fairfield County"].map((county) => (
                <div key={county} className="card-elevated text-center py-4 px-6 text-base font-medium">
                  {county}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="section-padding" ref={gridRef}>
          <div className="container max-w-5xl">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setPage(0); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {paginatedPosts.map((post, index) => (
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

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="text-sm text-muted-foreground">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages - 1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
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
            <a href="tel:+16143346851" className="btn-cta">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now: 614-334-6851
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
