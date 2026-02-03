import { useState, useMemo } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviews, getReviewStats } from "@/data/reviews";
import { cn } from "@/lib/utils";

const GoogleReviews = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const reviewsPerPage = 3;
  
  const stats = useMemo(() => getReviewStats(), []);
  
  const filteredReviews = useMemo(() => {
    if (filterRating === null) return reviews;
    return reviews.filter(r => r.rating === filterRating);
  }, [filterRating]);
  
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const currentReviews = filteredReviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-4 h-4",
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            )}
          />
        ))}
      </div>
    );
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        {/* Header with Stats */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
              alt="Google" 
              className="h-8 w-auto"
            />
            <span className="text-2xl font-medium text-muted-foreground">Reviews</span>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-5xl font-bold text-foreground">{stats.average}</span>
            <div className="text-left">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "w-6 h-6",
                      star <= Math.round(stats.average)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    )}
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Based on {stats.total} reviews
              </p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="max-w-md mx-auto space-y-2 mb-8">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.distribution[rating as keyof typeof stats.distribution];
              const percentage = (count / stats.total) * 100;
              const isActive = filterRating === rating;
              
              return (
                <button
                  key={rating}
                  onClick={() => {
                    setFilterRating(isActive ? null : rating);
                    setCurrentPage(0);
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full group transition-opacity",
                    filterRating !== null && !isActive && "opacity-40"
                  )}
                >
                  <span className="text-sm w-12 text-left text-muted-foreground group-hover:text-foreground">
                    {rating} star{rating !== 1 && "s"}
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm w-10 text-right text-muted-foreground">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {filterRating && (
            <button
              onClick={() => {
                setFilterRating(null);
                setCurrentPage(0);
              }}
              className="text-sm text-primary hover:underline mb-4"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Reviews Carousel with Side Arrows */}
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={prevPage}
            className="absolute left-0 z-10 -ml-4 lg:-ml-6 p-3 rounded-full bg-background shadow-lg border border-border hover:bg-secondary text-foreground transition-colors"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Reviews Grid */}
          <div className="flex-1 mx-8 lg:mx-12">
            <div className="grid md:grid-cols-3 gap-6">
              {currentReviews.map((review, index) => (
                <div
                  key={review.id}
                  className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{review.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      {review.isLocalGuide && (
                        <span className="text-xs text-muted-foreground">
                          Local Guide · {review.reviewCount}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary/10" />
                    <p className="text-muted-foreground text-sm leading-relaxed pl-4 line-clamp-4">
                      {review.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextPage}
            className="absolute right-0 z-10 -mr-4 lg:-mr-6 p-3 rounded-full bg-background shadow-lg border border-border hover:bg-secondary text-foreground transition-colors"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Page indicator */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          {currentPage + 1} of {totalPages} · {filteredReviews.length} reviews
        </p>
      </div>
    </section>
  );
};

export default GoogleReviews;
