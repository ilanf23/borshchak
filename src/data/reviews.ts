export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  isLocalGuide?: boolean;
  reviewCount?: string;
}

// Reviews will be added here
export const reviews: Review[] = [];

// Calculate stats
export const getReviewStats = () => {
  const total = reviews.length || 1; // Prevent division by zero
  const fiveStars = reviews.filter(r => r.rating === 5).length;
  const fourStars = reviews.filter(r => r.rating === 4).length;
  const threeStars = reviews.filter(r => r.rating === 3).length;
  const twoStars = reviews.filter(r => r.rating === 2).length;
  const oneStars = reviews.filter(r => r.rating === 1).length;
  const average = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / total 
    : 0;
  
  return {
    total: reviews.length,
    average: Math.round(average * 10) / 10,
    distribution: {
      5: fiveStars,
      4: fourStars,
      3: threeStars,
      2: twoStars,
      1: oneStars
    }
  };
};
