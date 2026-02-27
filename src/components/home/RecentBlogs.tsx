import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { allBlogPosts } from "@/data/blogPosts";

const parseDate = (dateStr: string) => new Date(dateStr);

const recentPosts = [...allBlogPosts]
  .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
  .slice(0, 3);

const featured = recentPosts[0];
const secondary = recentPosts.slice(1, 3);

const RecentBlogs = () => {
  const sectionAnim = useScrollAnimation(0.1, "up");

  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div ref={sectionAnim.ref} className={sectionAnim.className}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-green font-medium tracking-wide uppercase text-sm mb-2">
                From Our Blog
              </p>
              <h2 className="heading-section">Insights & Legal Resources</h2>
            </div>
            <Link
              to="/resources"
              className="group inline-flex items-center gap-2 text-lg font-medium text-primary hover:text-green transition-colors shrink-0"
            >
              View all articles
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Blog Grid */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-children ${sectionAnim.isVisible ? "stagger-visible" : ""}`}
          >
            {/* Featured Post - Large Card */}
            <Link
              to={`/blog/${featured.slug}`}
              className="group relative rounded-lg overflow-hidden flex flex-col min-h-[420px] lg:min-h-[520px] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="relative z-10 mt-auto p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green text-white">
                    <Tag className="w-3 h-3" />
                    {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/80">
                    <Calendar className="w-3.5 h-3.5" />
                    {featured.date}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-medium text-white leading-snug mb-3 group-hover:text-green transition-colors duration-200">
                  {featured.title}
                </h3>
                <p className="text-white/75 text-base md:text-lg leading-relaxed line-clamp-2">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-green font-medium mt-4 text-base">
                  Read article
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* Secondary Posts - Stacked */}
            <div className="flex flex-col gap-6">
              {secondary.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col sm:flex-row rounded-lg overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 min-h-[200px] lg:flex-1"
                >
                  {/* Image */}
                  <div className="relative sm:w-[220px] lg:w-[240px] shrink-0 h-[200px] sm:h-auto overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-5 md:p-6 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-primary">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-card-foreground leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors mt-auto">
                      Read article
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
