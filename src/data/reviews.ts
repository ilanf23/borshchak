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
export const reviews: Review[] = [
  {
    id: 1,
    name: "Caris Saunders",
    rating: 5,
    date: "2 months ago",
    text: "I am the Father currently in a shared parenting plan that began in 2022… Talking with Mr. Dmitriy helped me realize how Franklin County views this new routine… staying within my Original shared parenting agreement protects me from exposure to paying child support. Mr. Dmitriy is the Real- Deal and meeting with him Once was worth Every Penny."
  },
  {
    id: 2,
    name: "serigne gueye",
    rating: 5,
    date: "2 months ago",
    text: "Borshchak Law Group did an exceptional job handling my divorce case. They were professional, responsive, and genuinely cared about my situation. Thanks to their expertise, everything was resolved fairly and efficiently. Highly recommend!"
  },
  {
    id: 3,
    name: "Mama 3 boys",
    rating: 5,
    date: "1 month ago",
    text: "Dmitriy was wonderful to work with. He and his team worked quickly and efficiently which allowed quick legal resolution. Very pleased with this law firm, my results and would highly recommend."
  },
  {
    id: 4,
    name: "Darnley Etienne",
    rating: 5,
    date: "4 months ago",
    text: "From our first meeting, I felt confident in Dmitriy's ability to handle my case… Ethical, compassionate, and results-driven— Dmitriy set a new standard for what I expect from the legal profession."
  },
  {
    id: 5,
    name: "Ms. Lee",
    rating: 1,
    date: "5 months ago",
    text: "This was the most devastating and dysfunctional law firm I've ever had the misfortune of dealing with… Worse while in court he asked no questions, and barely said anything… I truly would have had better representation from a 1st yr paralegal."
  },
  {
    id: 6,
    name: "Robert Milby",
    rating: 5,
    date: "7 months ago",
    text: "Hank was my attorney… He kept things simple and let me know realistic expectations. His rates were very reasonable… I would absolutely recommend him and this firm."
  },
  {
    id: 7,
    name: "Dawnielle Price",
    rating: 5,
    date: "4 months ago",
    text: "Keri Reeves was very personable and a pleasure to work with… her office staff was also very kind and helpful, highly recommend this office."
  },
  {
    id: 8,
    name: "Ben Twynham",
    rating: 5,
    date: "1 year ago",
    text: "Dmitriy is the absolute best in the city… They treated me like family, not just a client… If you're looking for legal representation that combines top-notch legal skills with genuine human connection, look no further."
  },
  {
    id: 9,
    name: "David Cooper",
    rating: 5,
    date: "1 year ago",
    text: "I am very happy and grateful to have Dmitriy and his team help me through a difficult time… He is awesome and I will refer all of my friends and family."
  },
  {
    id: 10,
    name: "Kathy Morgan",
    rating: 2,
    date: "7 months ago",
    text: "I told them the first thing was I need communication. This is not the group for that… I sat in the courthouse for 30 minutes before the clerk came out to tell me my attorney continued the case."
  },
  {
    id: 11,
    name: "Sean Sweeney",
    rating: 5,
    date: "7 months ago",
    text: "After speaking with Leigh… I feel that I have chosen the right group… The conversation was professional and Leigh took the time to answer my questions."
  },
  {
    id: 12,
    name: "Hannah McConnell",
    rating: 5,
    date: "1 year ago",
    text: "Hank is the guy you want in your corner… He's thorough, communicative, creative, and truly is vested in you and your child as people, not as paychecks."
  },
  {
    id: 13,
    name: "LackLuster",
    rating: 5,
    date: "10 months ago",
    text: "We finally fired them and hired Dmitriy… He PERSONALLY answered every email… HE knew everything about our case… Dmitriy is one of the few and sacred who doesn't stop fighting for you until you get the best outcome possible."
  },
  {
    id: 14,
    name: "Wanda Hudson",
    rating: 5,
    date: "1 year ago",
    text: "Attorney Hank provided exceptional representation for my son… He fought for what was best for my granddaughter. We LOVE Hank Sonderman and HIGHLY recommend him."
  },
  {
    id: 15,
    name: "Ken Basista",
    rating: 5,
    date: "1 year ago",
    text: "From day one Dmitriy has been all-in on my divorce… resulted in a fair outcome that I was very pleased with."
  },
  {
    id: 16,
    name: "Svetlana Plachkova",
    rating: 5,
    date: "3 years ago",
    text: "Dmitriy Borshchak is a competent and professional lawyer who cares about his clients… Dmitriy Borshchak is the best lawyer!"
  },
  {
    id: 17,
    name: "Brett Rothfuss",
    rating: 5,
    date: "8 months ago",
    text: "10+ stars… What a great comfort to have a professional that understands and will counsel you through this process."
  },
  {
    id: 18,
    name: "Kate Oakley",
    rating: 5,
    date: "2 years ago",
    text: "He told me the stress was on his shoulders… I put my life into Dmitriy's hands… He really made me feel protected."
  },
  {
    id: 19,
    name: "Patrick Ngene",
    rating: 1,
    date: "4 years ago",
    text: "Jonathan Pope couldn't get that right… Never respond to emails… I basically paid him to work against me."
  },
  {
    id: 20,
    name: "MoneyCallin Shh",
    rating: 2,
    date: "6 years ago",
    text: "Waited 2.5 hours… promised follow up… never heard anything… It's disappointing."
  },
  {
    id: 21,
    name: "Zorcholhs",
    rating: 2,
    date: "1 year ago",
    text: "Efficient about taking money… slow to respond and missed deadlines."
  }
];

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
