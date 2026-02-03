export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  isLocalGuide?: boolean;
  reviewCount?: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Caris Saunders",
    rating: 5,
    date: "2 months ago",
    text: "I am the Father currently in a shared parenting plan that began in 2022. The agreement instructs my baby girl to live 2 weeks per month with her Mother and 2 weeks per month with Me. Three months ago my baby girl expressed her frustration..."
  },
  {
    id: 2,
    name: "Serigne Gueye",
    rating: 5,
    date: "2 months ago",
    text: "Borshchak Law Group did an exceptional job handling my divorce case. They were professional, responsive, and genuinely cared about my situation. Thanks to their expertise, everything was resolved fairly and efficiently. Highly recommend! — S.M.G."
  },
  {
    id: 3,
    name: "Darnley Etienne",
    rating: 5,
    date: "4 months ago",
    text: "From our first meeting, I felt confident in Dmitriy's ability to handle my case. Their knowledge, thinking, and clear communication put me at ease during difficult times."
  },
  {
    id: 4,
    name: "Mama 3 Boys",
    rating: 5,
    date: "1 month ago",
    text: "Dmitriy was wonderful to work with. He and his team worked quickly and efficiently which allowed quick legal resolution. Very pleased with this law firm, my results and would highly recommend."
  },
  {
    id: 5,
    name: "Ms. Lee",
    rating: 1,
    date: "5 months ago",
    text: "This was the most devastating and dysfunctional law firm I've ever had the misfortune of dealing with. I started with Jonathan who was not pleasant, but knowledgeable. We had a plan and day of court I got a text from the firm...",
    isLocalGuide: true,
    reviewCount: "28 reviews"
  },
  {
    id: 6,
    name: "Linda Bowers",
    rating: 5,
    date: "8 months ago",
    text: "My experience with the Borshchak Law Group has been nothing short of life-changing. I first met Dmitriy in July of 2023. I knew I was headed toward a divorce, but after nearly 40 years of marriage, I was absolutely terrified. I didn't..."
  },
  {
    id: 7,
    name: "Robert Milby",
    rating: 5,
    date: "7 months ago",
    text: "Hank was my attorney with Borshchak Law. He did a great job explaining the process as we went along. He kept things simple and let me know realistic expectations. His rates were very reasonable and ended up being on the lower end of the average divorce cost in Ohio. I would absolutely recommend him and this firm.",
    isLocalGuide: true,
    reviewCount: "24 reviews"
  },
  {
    id: 8,
    name: "Dawnielle Price",
    rating: 5,
    date: "4 months ago",
    text: "Keri Reeves was very personable and a pleasure to work with, she was able to take care of my case even with it being a little tricky and having some set backs, her office staff was also very kind and helpful, highly recommend this office and especially Miss. Reeves herself"
  },
  {
    id: 9,
    name: "Ben Twynham",
    rating: 5,
    date: "1 year ago",
    text: "Finding Peace of Mind with Borshchak Law Group. From the moment I first stepped into Borshchak Law Group, I knew I was in good hands...",
    isLocalGuide: true,
    reviewCount: "68 reviews"
  },
  {
    id: 10,
    name: "David Cooper",
    rating: 5,
    date: "1 year ago",
    text: "I am very happy and grateful to have Dmitriy and his team help me through a difficult time. I was referred to his law firm by a good friend and I appreciate all of his insight and professionalism throughout the entire process. He is awesome and I will refer all of my friends and family to him in the future!"
  },
  {
    id: 11,
    name: "Kathy Morgan",
    rating: 1,
    date: "7 months ago",
    text: "I retained this lawyer on the advice of another lawyer who was amazing. Not so much the case. I told them the first thing was I need communication. This is not the group for that. I begged for information regarding court dates etc..."
  },
  {
    id: 12,
    name: "Sean Sweeney",
    rating: 5,
    date: "7 months ago",
    text: "I am in the planning process of filing and needed to speak with someone as to what I could expect to go forward. I am scheduled to have a telephone consultation with Keri next week. After speaking with Leigh about what I should expect..."
  },
  {
    id: 13,
    name: "BB PP",
    rating: 5,
    date: "1 year ago",
    text: "From day one, he was sharp, professional, and absolutely no-nonsense about getting the best possible outcome. He didn't sugarcoat anything but somehow made the legal process feel less daunting. His stern demeanor in the courtroom was..."
  },
  {
    id: 14,
    name: "Hannah McConnell",
    rating: 5,
    date: "1 year ago",
    text: "Nobody wants to need a family lawyer, but if you find yourself needing an attorney, Hank is the guy you want in your corner. There was never a moment that I felt like he wasn't fighting for me. He's thorough, communicative, creative, and..."
  },
  {
    id: 15,
    name: "LackLuster",
    rating: 5,
    date: "10 months ago",
    text: "Hiring Dmitriy Changed Everything. Court costs time and money. We thought if we put in the work—researched the law...",
    isLocalGuide: true,
    reviewCount: "13 reviews"
  },
  {
    id: 16,
    name: "Wanda Hudson",
    rating: 5,
    date: "1 year ago",
    text: "Attorney Hank provided exceptional representation for my son in his custody case. He understands the law and has a strong presence in the courtroom. He is very professional and knowledgeable and was genuinely committed to reaching a..."
  },
  {
    id: 17,
    name: "Ken Basista",
    rating: 5,
    date: "1 year ago",
    text: "From day one Dmitriy has been all-in on my divorce. He has excellent communication skills and a confident demeanor. Dmitriy uses his extensive experience to understand all aspects of the case (people included) and how to best navigate to..."
  },
  {
    id: 18,
    name: "Svetlana Plachkova",
    rating: 5,
    date: "3 years ago",
    text: "Dmitriy Borshchak is a competent and professional lawyer who cares about his clients, and this is very important. When Dmitriy took on my case, I was listened to attentively and explained the process in detail. I can only say good things..."
  },
  {
    id: 19,
    name: "Р А",
    rating: 5,
    date: "3 years ago",
    text: "I received excellent service and assistance from Dmitriy and his team. The office was responsive and caring on all of our needs. Although I did not want to pursue more, Dmitriy was relentless in advising me of all the risks and exposure I..."
  },
  {
    id: 20,
    name: "Brett Rothfuss",
    rating: 5,
    date: "8 months ago",
    text: "I can't say enough about Dmitry and his staff.. I hired a PREVIOUS attorney whom made me feel like their was no progress with my divorce..."
  },
  {
    id: 21,
    name: "Anne Catherwood",
    rating: 5,
    date: "2 years ago",
    text: "Dmitriy is awesome! I entered his office in complete distress and left feeling reassured and confident. He took the time to listen to me, ask detailed and specific questions and give me his professional opinion on the case and expert advice..."
  },
  {
    id: 22,
    name: "Dorin Papuc",
    rating: 5,
    date: "2 years ago",
    text: "I was in a difficult situation when I found Dmitriy. He saved me from a big mess. Dmitriy was professional, kind and always on top of everything. I interacted a lot with Leigh as well. She helped me with all the paperwork and always..."
  },
  {
    id: 23,
    name: "Kate Oakley",
    rating: 5,
    date: "2 years ago",
    text: "Best decision I ever made was reaching out to Dmitriy! He was professional, intentional, empathetic and very prompt with all communication with me. I remember him telling me the very first day when I met him, that I was not to be...",
    isLocalGuide: true,
    reviewCount: "21 reviews"
  },
  {
    id: 24,
    name: "Chris Lucas",
    rating: 5,
    date: "3 years ago",
    text: "5.0 stars. Posted by anonymous. March 14, 2022..."
  },
  {
    id: 25,
    name: "N Wl",
    rating: 5,
    date: "6 years ago",
    text: "Mr. Borshchak was very professional and thorough in handling my legal needs. He was very knowledgeable about the proceedings and kept prompt and courteous communication with me. I was pleased with the outcome and have no regrets with the..."
  },
  {
    id: 26,
    name: "Carol McClain",
    rating: 5,
    date: "4 years ago",
    text: "I cannot say enough about Dmitriy and his team! They had my divorce finalized in under four months, that is unheard of! Dmitriy and his team are very detailed and thorough. They get to know your case and work overtime to get the job done..."
  },
  {
    id: 27,
    name: "Paul Baeppler",
    rating: 5,
    date: "1 year ago",
    text: "We are giving the Law Office of Dmitriy Borshchak Five Stars based on their dedication to their clients, pursuit of the truth, and relentless desire to help them. Dmitriy and his office were always responsive to emails and phone calls...",
    isLocalGuide: true,
    reviewCount: "60 reviews"
  },
  {
    id: 28,
    name: "Kayce Sanchez",
    rating: 5,
    date: "5 years ago",
    text: "After multiple (bad) consultations with various firms, I happened to get in touch with Dmitriy's office and immediately knew they were the ones I wanted to handle my case. Coming in, I knew nothing about the court system or what to expect..."
  },
  {
    id: 29,
    name: "Amy Riggs",
    rating: 5,
    date: "5 years ago",
    text: "This firm was great to work with from start to finish. During the initial consultation with Hank took the time to understand my situation and to get to know a little bit about me personally. Dmitriy was always very responsive and went the..."
  },
  {
    id: 30,
    name: "Paula Wietbrock",
    rating: 5,
    date: "4 years ago",
    text: "Dmitriy was invaluable to me throughout my divorce. He had a strategic plan from the beginning when I first filed for the divorce. He pushed me to hold out and not accept the numerous proposals sent to us from my ex husbands attorney..."
  },
  {
    id: 31,
    name: "Kyle McClafferty",
    rating: 5,
    date: "4 years ago",
    text: "I cannot say enough great things about Dmitriy. He was very responsive, professional and did everything he could to resolve my case. My case was definitely an oddity and he stuck by me and worked every angle possible to get an awesome..."
  },
  {
    id: 32,
    name: "Adeola Adebayo",
    rating: 5,
    date: "2 years ago",
    text: "I highly recommend Dmitriy L. Borshchak family attorney. Hank's expertise, professionalism, and compassionate approach made a challenging legal situation more manageable for my family. They were responsive, thorough, and guided me through the process with care. Grateful for their support during a difficult time."
  },
  {
    id: 33,
    name: "Carter Stephens",
    rating: 5,
    date: "6 years ago",
    text: "Dmitriy is a true professional who will fight on our behalf. He gave me peace of mind during my court appearance. I knew everything was taken care of and all options would be exhausted if necessary. He is very intelligent, well spoken in..."
  },
  {
    id: 34,
    name: "Erin Arroyo",
    rating: 5,
    date: "4 years ago",
    text: "Dmitriy is a phenomenal attorney! No, they are not all created equal. He was timely with responding, genuine, caring but most important Dmitriy was incredibly hard working. I never felt like I couldn't reach out with questions or concerns!"
  },
  {
    id: 35,
    name: "Kimberly Schmidt",
    rating: 5,
    date: "2 years ago",
    text: "Dmitriy made my divorce easy! He always kept me calm and advised me of all my options. Every divorce is different and he executed everything flawlessly based upon my needs and decisions. I would highly recommend him to anyone."
  },
  {
    id: 36,
    name: "Allison Mash",
    rating: 5,
    date: "2 years ago",
    text: "I had the great privilege of having Lucy represent myself and my son. I always felt so safe and supported with Lucy. She was always there if I had questions and really fought for what was right. She's amazing, without a doubt, the best..."
  },
  {
    id: 37,
    name: "Nicole Burden-Stone",
    rating: 5,
    date: "5 years ago",
    text: "He is expensive; however, he is worth it. Dmitriy is very timely with getting back to me. He worked very hard to get me a fantastic deal for my divorce. He cares about his client and is very engaging. He does well when in court in front..."
  },
  {
    id: 38,
    name: "Anthony Turner",
    rating: 5,
    date: "1 year ago",
    text: "I began working with Hank Sonderman in July of 2022. During my initial meeting with him, I could tell he was a person that cared about other people's situation. Our initial conversation didn't only talk about the fees and costs, but also..."
  },
  {
    id: 39,
    name: "Irina Tsurikova",
    rating: 5,
    date: "2 years ago",
    text: "Dmitriy, can't say enough good things about him. I was pleasantly surprised by the friendly atmosphere from the very first visit. Dmitriy made me feel as if he was genuinely concerned of my needs and the quality of care I was seeking. I would highly recommend using Law Office of Dmitriy Borshchak."
  },
  {
    id: 40,
    name: "Andrew Karst",
    rating: 5,
    date: "2 years ago",
    text: "Hank and the team at Dmitriy Borshchak Law Office made a huge impact in helping me through a very challenging situation. Hank Sonderman was extremely patient with all of my questions and constantly gave me sound advice. He never quit..."
  },
  {
    id: 41,
    name: "Kevin Bumgarner",
    rating: 5,
    date: "5 years ago",
    text: "Had as good of an experience as I could possibly have going through a divorce thanks to Dmitriy and his team. Very professional and always quick to respond to any inquiries. The help and guidance provided gave me great confidence through..."
  },
  {
    id: 42,
    name: "Elena Tsurikova",
    rating: 5,
    date: "2 years ago",
    text: "I was having hard time finding a good attorney who could speak Russian until I reached out to Dmitriy. He was able to translate and explain to me which made a smooth sailing process for me. They are very professional and polite with their clients. I'd highly recommend their services for everyone."
  },
  {
    id: 43,
    name: "Alexandria Claar",
    rating: 5,
    date: "1 year ago",
    text: "I had a great experience. I had never been in a situation where I needed a lawyer so I was very nervous going in but he explained everything in a way I understood and put me at ease. Very responsive and timely in communication. 10/10 would recommend and would hire again if needed!",
    isLocalGuide: true,
    reviewCount: "18 reviews"
  },
  {
    id: 44,
    name: "Amber Bonner",
    rating: 5,
    date: "6 years ago",
    text: "From Richland County, I hired a local attorney in regards to a custody matter. After four months and not getting anywhere I decided to fire that attorney and hired Dmitriy Borshchak who is based within the Columbus area. After his first...",
    isLocalGuide: true,
    reviewCount: "12 reviews"
  },
  {
    id: 45,
    name: "R Mowery",
    rating: 5,
    date: "3 years ago",
    text: "I recently went through a divorce and worked with Mr. Sonderman at the Law Offices of Dmitriy Borshchak and I have to say I was very impressed. Divorce is not easy but he helped me navigate through the situation and reached what I felt was..."
  },
  {
    id: 46,
    name: "Elana Bobry",
    rating: 5,
    date: "1 year ago",
    text: "Dmitriy and Leigh are incredibly helpful and kind. Dmitriy and Leigh took the time to speak with me and answered my questions. They helped me understand the information that was discussed, and both are responsive. I highly recommend the Borschak Law Group!"
  },
  {
    id: 47,
    name: "Anthony Forster",
    rating: 5,
    date: "7 years ago",
    text: "Dmitriy and his team went above and beyond when it came to helping me get custody of my daughter. From day one I could tell that they were genuinely concerned for my situation and wanted nothing more than to get justice for me and my..."
  },
  {
    id: 48,
    name: "Sky Stephens",
    rating: 5,
    date: "5 years ago",
    text: "Amazing to work with, always on time for meetings & responds in a timely fashion even though I live states away which is greatly appreciated. Dmitry always explains things in a way I could easily understand & he worked so hard everyday so..."
  },
  {
    id: 49,
    name: "Denver Burkhart",
    rating: 5,
    date: "4 years ago",
    text: "Dmitriy Borshack is an extremely knowledgeable and professional attorney who cares about his clients. Dmitriy and his team were very responsive and flexible to meet my needs. He not only helped me get through a hard time, but also save my...",
    isLocalGuide: true,
    reviewCount: "9 reviews"
  },
  {
    id: 50,
    name: "Farrah August",
    rating: 5,
    date: "3 years ago",
    text: "I chose Dmitriy's office because he assured that he would deliver the results I wanted. Instead of working with Dmitriy himself, I was able to work with his associate Jonathan Pope, and he was just as good and making sure I got the results...",
    isLocalGuide: true,
    reviewCount: "15 reviews"
  },
  {
    id: 51,
    name: "Alison Kennedy",
    rating: 5,
    date: "1 year ago",
    text: "I had a wonderful experience working with Lucy Shane. She helped me through navigating the legal processes around my dissolution, and I'm grateful for her caring, thoughtful, and patient counsel. I would highly recommend her and the entire team in the office."
  },
  {
    id: 52,
    name: "Holly King",
    rating: 5,
    date: "8 years ago",
    text: "I found Dmitriy while utilizing an internet database to help find an attorney. I had negligible counsel prior to finding Dmitriy. From the moment he took my case his advice was sound and he responded promptly to inquiries and concerns..."
  },
  {
    id: 53,
    name: "April Lopez",
    rating: 5,
    date: "3 years ago",
    text: "Attorney Dmitriy Borshchak represented me in a very difficult divorce and complex custody battle. I could not have asked for better representation. Attorney Borshchak was very thorough and had me prepared for everything before hand. He was...",
    isLocalGuide: true,
    reviewCount: "14 reviews"
  },
  {
    id: 54,
    name: "Kaleema Poles",
    rating: 5,
    date: "1 year ago",
    text: "Dmitriy has helped me through a very difficult high conflict case. You can tell he genuinely cares & is tenacious with his approach in litigation. I would highly recommend him & his team for family lawyers."
  },
  {
    id: 55,
    name: "Renee Ting",
    rating: 5,
    date: "4 years ago",
    text: "Dmitriy was a very focused lawyer. He paid attention to details to my situation. He also respected my wishes and he would inform me if he thought what I was asking for would not be ruled in my favor..."
  },
  {
    id: 56,
    name: "Todd B",
    rating: 5,
    date: "6 years ago",
    text: "I hired Dmitriy and his staff after years of ongoing problematic issues following my divorce. From day one Dmitriy fought for my children and I. He answered every question and tried to explain things clearly and thoroughly. Dmitriy..."
  },
  {
    id: 57,
    name: "Tyler Woogie",
    rating: 5,
    date: "3 years ago",
    text: "I had a phenomenal experience here at Dmitriy Law Office! Henry Sonderman aka \"Hank\" was representing me. Working with Hank was a breeze! If I would send a message Hank would be calling me back, sending me emails hounding me down to get me...",
    isLocalGuide: true,
    reviewCount: "21 reviews"
  },
  {
    id: 58,
    name: "Cheryl May",
    rating: 5,
    date: "3 years ago",
    text: "We had a great experience with this law office. They were very quick getting back to us when we had any questions. Jonathan was assigned to our case and did an amazing job! My fiance ended up getting custody of his boys. We are extremely happy with the firm and will 100% recommend them and use them in the future if needed!"
  },
  {
    id: 59,
    name: "Anthony H",
    rating: 5,
    date: "5 years ago",
    text: "As a male going through divorce, you never really feel like there is help on your side. As my divorce came quickly I truly just picked the first office that came up. Terrible way to search, but I got super lucky. I worked with Jonathan...",
    isLocalGuide: true,
    reviewCount: "196 reviews"
  },
  {
    id: 60,
    name: "Rachel Webb",
    rating: 5,
    date: "6 years ago",
    text: "I was out of hope when I met Dmitriy. I just needed representation at that point in order to continue a fight that had lasted longer than a year with no positive results. Dmitriy was the ONLY attorney to personally reached out to me when he..."
  },
  {
    id: 61,
    name: "Kyle Abbott",
    rating: 5,
    date: "7 years ago",
    text: "I was having major issues with my Child Support Case. After calling several lawyers, I decided to hire Dmitriy Borshchak. Mr. Borshchak was several miles out of my area as I lived in Newark, Ohio. But, that did not stop him from taking my...",
    isLocalGuide: true,
    reviewCount: "29 reviews"
  },
  {
    id: 62,
    name: "Hollie Robinett",
    rating: 5,
    date: "7 years ago",
    text: "Dmitriy was amazing. He gave me strength and support through a very difficult season in my life. He was my biggest encourager and was always available when I needed him. He helped me get a good outcome in a very challenging situation. I am..."
  },
  {
    id: 63,
    name: "Earl Lawson Sr",
    rating: 5,
    date: "6 years ago",
    text: "First, let me say thank you to Dmitriy. It was a tough case. Dmitriy got me an alimony agreement that was reasonable and reduced by almost a third from what it was. Dmitriy was my fourth attorney because of poor advice from my first..."
  },
  {
    id: 64,
    name: "Amanda Mayberry",
    rating: 5,
    date: "5 years ago",
    text: "I was with my ex husband for 11.5 years. Divorced for 3 years and my ex tried to get full custody to get out of child support. Dmitriy came in and not only prevented that but I kept school placement for the kids, and child support was..."
  },
  {
    id: 65,
    name: "Carrie K",
    rating: 5,
    date: "8 years ago",
    text: "Dmitriy came in mid stream in a very complicated divorce/custody battle. He was the third attorney, the youngest, and by far the very best. He came into a mess. I was given extremely poor legal advice, another attorney withdrew from my...",
    isLocalGuide: true,
    reviewCount: "47 reviews"
  },
  {
    id: 66,
    name: "Karl Kelimav",
    rating: 1,
    date: "5 months ago",
    text: "Would not recommend, need to pay to see if they can even assist in your situation and their \"executive assistant\" is incapable of forming an email that provides any information.",
    isLocalGuide: true,
    reviewCount: "7 reviews"
  },
  {
    id: 67,
    name: "Tina Pargeon",
    rating: 5,
    date: "5 years ago",
    text: "Dmitriy did an awesome job at helping my son through the process of fighting for shared custody of my grandson. He was always there to answer questions and explain the whole process and had us completely prepared for court. Couldn't have asked for a better outcome for our circumstances."
  },
  {
    id: 68,
    name: "Zorcholhs",
    rating: 2,
    date: "1 year ago",
    text: "Hired through an employer benefit. They were very efficient about taking money and sending invoices but generally slow to respond and did not meet deadlines/missed calls. Had to switch counsel... not a pleasant experience"
  },
  {
    id: 69,
    name: "Gijane OConnor",
    rating: 5,
    date: "6 years ago",
    text: "This Law firm is fantastic. Helped me through a difficult time. They were there with me every step of the way. Alexander was so great, kind, and very understanding. He did an awesome job. I would recommend this firm to anyone that needs someone...",
    isLocalGuide: true,
    reviewCount: "11 reviews"
  },
  {
    id: 70,
    name: "Tiffany Mckinney",
    rating: 5,
    date: "5 years ago",
    text: "Dec of 2019 I decided to make the decision to divorce my husband and I needed a lawyer to handled just the paperwork and the Law office of Dmitriy Borshchak and staff went above and beyond even after other things came up in the divorce..."
  },
  {
    id: 71,
    name: "Careen Eastman",
    rating: 5,
    date: "3 years ago",
    text: "After a 7 year complicated court battle, I was referred to Mr. Borshchak by a well respected acquaintance. Mr. Borshchak became committed to solving my court battle. I am confident that Mr. Borshchak is able to resolve my case. Mr...."
  },
  {
    id: 72,
    name: "Mona M.",
    rating: 5,
    date: "5 years ago",
    text: "I hired Attorney Borshchak for my dissolution. I found him to be very compassionate and hardworking. Attorney Borshchak is very good at communicating, and understanding what your...",
    isLocalGuide: true,
    reviewCount: "29 reviews"
  },
  {
    id: 73,
    name: "Nicole O'Reilly",
    rating: 5,
    date: "3 years ago",
    text: "Henry Sonderman did a fantastic job with my domestic juvenile case involving my daughter. I retained Mr. Sonderman as my attorney at the Law Office of Dmitriy Borshchak. His knowledge and ability to assist not only with court proceedings,..."
  },
  {
    id: 74,
    name: "MoneyCallin Shh",
    rating: 3,
    date: "6 years ago",
    text: "I came to Dmitriy in dire need of some assistance or some direction on how I should proceed with my case. Being that he has such a high rating, I was really eager to see what he had to say about my case, his thoughts and opinions on it..."
  },
  {
    id: 75,
    name: "Ryan Fisher",
    rating: 5,
    date: "3 years ago",
    text: "Highly recommend this law firm! Hanks attention to detail and his care for our case was outstanding. I had little hope going into the process but Hank reassured me that we were on the right path to a resolution. I would like to thank the..."
  },
  {
    id: 76,
    name: "Toni Menefee",
    rating: 5,
    date: "1 year ago",
    text: "The experience with the Law Office Of Dmitriy Borshchak was very enlightening. Hank S. Was very encouraging and informative about the whole process with my case and I appreciate all of the work done to achieve my goal! THANK YOU!"
  },
  {
    id: 77,
    name: "Jacob Parker",
    rating: 5,
    date: "7 years ago",
    text: "Dmitriy was very kind and concerned from day one. I went to him with essentially 3 years of issues that I needed his assistance with and he jumped right on from the get go. Throughout the 7 ish months we worked together he followed all the..."
  },
  {
    id: 78,
    name: "Matt Joherl",
    rating: 5,
    date: "3 years ago",
    text: "I went on a whim doing a Google search for a custody lawyer and found Henry Sonderman who did a fantastic job with my custody case. He was super responsive, professional and helped me understand the court system as this was my first time hiring a lawyer. Thank you Hank!"
  },
  {
    id: 79,
    name: "Efrain Lopez Tudares",
    rating: 5,
    date: "4 years ago",
    text: "100% recommended, attorney Jonathan Pope is a great family lawyer and professional, he took my case and carefully listened and provided a thorough explanation about the process. After the case was submitted attorney Jonathan Pope kept me..."
  },
  {
    id: 80,
    name: "Andre Sullivan",
    rating: 5,
    date: "4 years ago",
    text: "I retained Mr. Borschak after releasing two previous poor-performing attorneys in an extremely venomous child custody case that by that time had been dragging on for over a year. From the start, Mr. Borschak was a bolt of energy and..."
  },
  {
    id: 81,
    name: "Priscilla Mullins",
    rating: 5,
    date: "1 year ago",
    text: "Lucy Shane was amazing during this whole horrible process. She is strong and resolute, yet has a personality of compassion for her clients' needs. Highly recommend!"
  },
  {
    id: 82,
    name: "Patrick Ngene",
    rating: 1,
    date: "4 years ago",
    text: "I had a simple divorce case with one child and my lawyer Jonathan Pope couldn't get that right. Never respond to emails or text. Wrote my divorce decree literally a day before my hearing and he got that wrong. He willingly gave my wife..."
  },
  {
    id: 83,
    name: "Jena Freeman",
    rating: 5,
    date: "6 years ago",
    text: "I would highly recommend! Dmitriy was awesome help, he communicated effectively & definitely got the job done. He was there any time I called or emailed. I would hire their team again if need be!"
  },
  {
    id: 84,
    name: "Justin Jones",
    rating: 5,
    date: "7 years ago",
    text: "This group helped me through one of the hardest times in my adult life. Good price for great representation. Always answered when I called. Always very informative on things I had no clue of. You can tell they have done this before and..."
  },
  {
    id: 85,
    name: "Bryan Burnham",
    rating: 5,
    date: "3 years ago",
    text: "Dmitriy was fantastic to work with. He listened to all of my concerns and addressed issues promptly as they arrived. I would very highly recommend him for your legal needs.",
    isLocalGuide: true,
    reviewCount: "166 reviews"
  },
  {
    id: 86,
    name: "Rony Rahman",
    rating: 5,
    date: "3 years ago",
    text: "I highly recommend Dmitriy Borshchak to anyone going through a divorce. He helps navigate you through the process, gives you the information you need to make important decisions, and keeps it moving. Thanks, Dmitriy...",
    isLocalGuide: true,
    reviewCount: "10 reviews"
  },
  {
    id: 87,
    name: "Tammy Green",
    rating: 5,
    date: "3 years ago",
    text: "I had a great experience at Dmitriy Borshchak with Henry Sonderman as my attorney. He was respectful, knowledgeable, and considerate of my personal situation. I would highly recommend."
  },
  {
    id: 88,
    name: "Jennifer Calland",
    rating: 5,
    date: "2 years ago",
    text: "Jonathan was a wonderful and knowledgeable advocate for me through my custody and child support case. I would highly recommend him and his office of caring staff for any of your family law needs!"
  },
  {
    id: 89,
    name: "Wayne Justice",
    rating: 5,
    date: "5 years ago",
    text: "Had a great experience with Dmitriy. Was very good about responding to all my questions quickly. I highly recommend him and his law firm. Got me taken care of in a timely manner."
  },
  {
    id: 90,
    name: "Karen",
    rating: 5,
    date: "6 years ago",
    text: "This Law firm is fantastic. Helped me thru a difficult time. They were there with me every step of the way. Alexander was so great, kind, and very understanding. He did an awesome job. I would recommend this firm to anyone that needs someone...",
    isLocalGuide: true,
    reviewCount: "2 reviews"
  },
  {
    id: 91,
    name: "Eric Fry",
    rating: 5,
    date: "4 years ago",
    text: "Extremely long case, succeeded in all ways I can ask for, thoroughly executed casework to bring results desired, ex was non compliant but I did come to a desired outcome with Dmitri's help. Grateful thank you."
  },
  {
    id: 92,
    name: "Jordan Evans",
    rating: 5,
    date: "4 years ago",
    text: "All of the staff were very personable and helpful. I am especially grateful for Hank and all of the hard work he put into finding the best outcome for my case. I would absolutely use the office again, if needed."
  },
  {
    id: 93,
    name: "Henri F",
    rating: 5,
    date: "6 years ago",
    text: "All of my dealings with Dmitriy and his staff were very professional and favorable. He was very patient and was always available to listen and answer any concerns I had. Thanks again."
  },
  {
    id: 94,
    name: "Sean Britton",
    rating: 5,
    date: "6 years ago",
    text: "Dmitriy saved my life. I was headed down a very bad path and through his counsel I was able to get back on my feet. I cannot express how much I appreciate his service to my case."
  },
  {
    id: 95,
    name: "Sarah Ackerman",
    rating: 5,
    date: "2 years ago",
    text: "I had such a positive experience and can't thank the office enough for helping me step by step for my divorce. I have already pointed a few friends towards this office for help with legal aid."
  },
  {
    id: 96,
    name: "Mira Dainels",
    rating: 5,
    date: "4 years ago",
    text: "I appreciate Dmitriy Borshchak and Henry Sonderman who worked diligently on my case and landed me the results I was hoping for. They exhibited patience and pursued what was in my best interest as a client and what would make me happy. Thank..."
  },
  {
    id: 97,
    name: "Robin Heater",
    rating: 5,
    date: "2 years ago",
    text: "Hank Sonderman, was great. From the initial phone conversation, I knew I wanted him as my attorney. Hank was very understanding and supportive.",
    isLocalGuide: true,
    reviewCount: "10 reviews"
  },
  {
    id: 98,
    name: "Demi Mccoy",
    rating: 5,
    date: "4 years ago",
    text: "Dmitry and Hank were both amazing and helped me navigate a very hard chapter of my life. Their services were very affordable and I don't know what I would have done without them!..."
  },
  {
    id: 99,
    name: "Stefanie Hatfield",
    rating: 5,
    date: "6 years ago",
    text: "Highly recommend this law firm. They all pitched in and were very helpful in a difficult time! Communication was great and they always responded in a timely manner! Thank God for Olivia for all her patience and understanding through my frustration."
  },
  {
    id: 100,
    name: "Shawn Mensi",
    rating: 5,
    date: "3 years ago",
    text: "Dmitriy did a fantastic job in representing me in my case for my son. He will fight for you to the end! I'd give 10 stars if I could."
  },
  {
    id: 101,
    name: "Ken I",
    rating: 5,
    date: "3 years ago",
    text: "Thanks to Law Office of Dmitriy for all your hard work. 100% recommend their service. The team were great in taking care of my case."
  },
  {
    id: 102,
    name: "Adinl J.",
    rating: 5,
    date: "5 years ago",
    text: "I was very delighted to hire Mr. Borshchak as my attorney. He is very knowledgeable and works very hard to complete the assigned task. He is very professional and understanding..."
  },
  {
    id: 103,
    name: "Prateek Mendiratta",
    rating: 5,
    date: "6 years ago",
    text: "Compassionate, Intelligent, and always there when needed. A truly personal approach and always treats you like you are his only client during a difficult time. Highly recommend."
  },
  {
    id: 104,
    name: "Donald",
    rating: 5,
    date: "6 years ago",
    text: "This young attorney went beyond and above in our case. Very professional and competent. Case got resolved our favor. He followed everything through to the end. Highly recommended."
  },
  {
    id: 105,
    name: "Curt",
    rating: 5,
    date: "4 months ago",
    text: "Family law group handles adoptions child support law divorces etc."
  },
  {
    id: 106,
    name: "Jill Martin",
    rating: 5,
    date: "5 years ago",
    text: "Hank was very patient with all my concerns and questions. Very straight forward. Hank made me feel comfortable with the issues and explained everything thoroughly..."
  },
  {
    id: 107,
    name: "Aleksandr Slobodyanyuk",
    rating: 5,
    date: "4 years ago",
    text: "Dmitriy was extremely knowledgeable about my situation he always took time to listen and respond accordingly he never wasted time and was always on time for appointments, he relieved a lot of stress during my extremely complicated and..."
  },
  {
    id: 108,
    name: "Nicholas Gutheil",
    rating: 5,
    date: "6 years ago",
    text: "Excellent Lawyer, very professional, welcoming and knowledgeable. Took the utmost care of my case and went above and beyond multiple times. Delivered the results I was looking for on my case, highly recommend their services. Thanks again!"
  },
  {
    id: 109,
    name: "Michael Smalling",
    rating: 5,
    date: "7 years ago",
    text: "Mr. Dmitriy, was caring, understanding, and very professional to my case needs. I would recommend him 100 percent, to anyone going through family issues. Thank you",
    isLocalGuide: true,
    reviewCount: "20 reviews"
  },
  {
    id: 110,
    name: "Big D",
    rating: 5,
    date: "5 years ago",
    text: "He was great to work with, had great communication, and really made things easy to understand. Was able to get my family time back, which is a huge deal to me."
  },
  {
    id: 111,
    name: "Gavin Sailor",
    rating: 5,
    date: "2 years ago",
    text: "Very friendly and understanding. Did not feel like we were wasting their time. Gave very good advice and were very thorough throughout the case.",
    isLocalGuide: true,
    reviewCount: "17 reviews"
  },
  {
    id: 112,
    name: "S B",
    rating: 5,
    date: "5 years ago",
    text: "He helped me with my case (we won) and really listened to my concerns as well as made sure all my needs were met! Highly recommend!!"
  },
  {
    id: 113,
    name: "Becky Lynne",
    rating: 5,
    date: "6 years ago",
    text: "It was amazing he is such a great lawyer I would definitely recommend him I will definitely be coming to him with anything else I might have!!"
  },
  {
    id: 114,
    name: "Lisa Staley",
    rating: 5,
    date: "6 years ago",
    text: "Dimitry is amazing very professional gets things done to best that he can I would go back with Dimitry if had does a great job."
  },
  {
    id: 115,
    name: "Carolin Arita",
    rating: 5,
    date: "1 year ago",
    text: "They are very good in family divorce cases, very professional, I recommend them."
  },
  {
    id: 116,
    name: "Adam Clarke",
    rating: 5,
    date: "6 years ago",
    text: "Dimitry was amazing. He is very professional and very open about our options. I highly recommend him."
  },
  {
    id: 117,
    name: "The Mighty",
    rating: 5,
    date: "5 years ago",
    text: "If I could give these guys a sixth star, I would! They're by far the most professional, understanding, and responsive team I've ever worked with!! Thanks guys!"
  },
  {
    id: 118,
    name: "Arati Sharma",
    rating: 5,
    date: "2 years ago",
    text: "Great service! Always responded in a timely manner and were willing to help me in every way possible!"
  }
];

// Calculate stats
export const getReviewStats = () => {
  const total = reviews.length;
  const fiveStars = reviews.filter(r => r.rating === 5).length;
  const fourStars = reviews.filter(r => r.rating === 4).length;
  const threeStars = reviews.filter(r => r.rating === 3).length;
  const twoStars = reviews.filter(r => r.rating === 2).length;
  const oneStars = reviews.filter(r => r.rating === 1).length;
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / total;
  
  return {
    total,
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
