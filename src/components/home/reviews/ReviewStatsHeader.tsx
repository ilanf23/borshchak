import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getReviewStats } from "@/data/reviews";

interface ReviewStatsHeaderProps {
  filterRating: number | null;
  onFilterChange: (rating: number | null) => void;
}

const ReviewStatsHeader = ({ filterRating, onFilterChange }: ReviewStatsHeaderProps) => {
  const stats = getReviewStats();

  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center gap-3 mb-4">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google"
          className="h-8 w-auto"
        />
        <span className="text-3xl font-medium text-muted-foreground">Reviews</span>
      </div>

      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="text-6xl font-bold text-foreground">{stats.average}</span>
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
          <p className="text-muted-foreground text-base mt-1">
            Based on {stats.total} reviews
          </p>
        </div>
      </div>

      {/* Rating Distribution - Always visible */}
      <div className="max-w-md mx-auto space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = stats.distribution[rating as keyof typeof stats.distribution];
          const percentage = (count / stats.total) * 100;
          const isActive = filterRating === rating;

          return (
            <button
              key={rating}
              onClick={() => {
                onFilterChange(isActive ? null : rating);
              }}
              className={cn(
                "flex items-center gap-3 w-full group transition-opacity",
                filterRating !== null && !isActive && "opacity-40"
              )}
            >
              <span className="text-base w-12 text-left text-muted-foreground group-hover:text-foreground">
                {rating} star{rating !== 1 && "s"}
              </span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-base w-10 text-right text-muted-foreground">
                {count}
              </span>
            </button>
          );
        })}
      </div>
      {filterRating && (
        <button
          onClick={() => onFilterChange(null)}
          className="text-base text-primary hover:underline mt-4"
        >
          Clear filter
        </button>
      )}
    </div>
  );
};

export default ReviewStatsHeader;
