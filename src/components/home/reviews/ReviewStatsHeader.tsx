import { Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getReviewStats } from "@/data/reviews";
import { motion } from "framer-motion";

interface ReviewStatsHeaderProps {
  filterRating: number | null;
  onFilterChange: (rating: number | null) => void;
}

const ReviewStatsHeader = ({ filterRating, onFilterChange }: ReviewStatsHeaderProps) => {
  const stats = getReviewStats();

  return (
    <div className="mb-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-primary rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative"
      >
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
          {/* Left: Big rating */}
          <div className="flex flex-col items-center md:items-start md:min-w-[220px]">
            <div className="flex items-center gap-2 mb-3">
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google"
                className="h-7 w-auto brightness-0 invert"
              />
              <span className="text-xl font-medium text-white/70">Reviews</span>
            </div>

            <div className="flex items-end gap-3 mb-2">
              <span className="text-7xl md:text-8xl font-bold text-white leading-none tracking-tight">
                {stats.average}
              </span>
              <div className="flex gap-1 pb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "w-6 h-6",
                      star <= Math.round(stats.average)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-white/20 text-white/20"
                    )}
                  />
                ))}
              </div>
            </div>

            <p className="text-white/60 text-base mb-4">
              Based on <span className="text-white font-semibold">{stats.total}</span> reviews
            </p>

            <a
              href="https://www.google.com/maps/place/Borshchak+Law+Group/@39.9611755,-82.9987942,17z/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Write a review <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch bg-white/10" />
          <div className="md:hidden h-px w-full bg-white/10" />

          {/* Right: Distribution bars */}
          <div className="flex-1 space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.distribution[rating as keyof typeof stats.distribution];
              const percentage = (count / stats.total) * 100;
              const isActive = filterRating === rating;

              return (
                <button
                  key={rating}
                  onClick={() => onFilterChange(isActive ? null : rating)}
                  className={cn(
                    "flex items-center gap-3 w-full group transition-all duration-200",
                    filterRating !== null && !isActive && "opacity-30"
                  )}
                >
                  <div className="flex items-center gap-1 w-10 shrink-0">
                    <span className="text-sm font-semibold text-white">{rating}</span>
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: (5 - rating) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium text-white/70 w-10 text-right tabular-nums">
                    {count}
                  </span>
                </button>
              );
            })}
            {filterRating && (
              <button
                onClick={() => onFilterChange(null)}
                className="text-sm text-white/60 hover:text-white transition-colors mt-1"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewStatsHeader;
