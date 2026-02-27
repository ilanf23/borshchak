import { Star, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Review } from "@/data/reviews";
import { motion } from "framer-motion";

interface ReviewCardProps {
  review: Review;
  index: number;
}

const ReviewCard = ({ review, index }: ReviewCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-xl p-7 md:p-9 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden border border-black/[0.06]"
    >
      {/* Google G watermark */}
      <svg
        className="absolute bottom-3 right-4 w-14 h-14 opacity-[0.07] select-none pointer-events-none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.1 24.1 0 0 0 0 21.56l7.98-6.19z"/>
        <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>

      <div className="flex items-start gap-4 mb-4">
        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
          {review.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-lg text-foreground">{review.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "w-4 h-4",
                    star <= review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{review.date}</span>
          </div>
        </div>
      </div>

      <p className="text-foreground/80 text-base leading-relaxed mb-4">
        {review.text}
      </p>

      {/* Verified badge */}
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground/70">
        <BadgeCheck className="w-4 h-4 text-accent" />
        <span>Google Review</span>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
