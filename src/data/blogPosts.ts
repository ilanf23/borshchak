import custodyStateLines from "./blog/custody-state-lines";
import questionsBeforeDivorce from "./blog/questions-before-divorce";
import judgesFairSettlements from "./blog/judges-fair-settlements";
import movingOutRisks from "./blog/moving-out-risks";
import filingOutOfState from "./blog/filing-out-of-state";
import collegeExpenses from "./blog/college-expenses";
import inheritanceDivorce from "./blog/inheritance-divorce";
import alimonyDisputes from "./blog/alimony-disputes";
import fastTrackDissolution from "./blog/fast-track-dissolution";
import evidenceEssentials from "./blog/evidence-essentials";
import type { BlogPostData } from "./blog/custody-state-lines";

export type { BlogPostData };
export type { BlogSection } from "./blog/custody-state-lines";

export const allBlogPosts: BlogPostData[] = [
  custodyStateLines,
  questionsBeforeDivorce,
  judgesFairSettlements,
  movingOutRisks,
  filingOutOfState,
  collegeExpenses,
  inheritanceDivorce,
  alimonyDisputes,
  fastTrackDissolution,
  evidenceEssentials,
];

export function getBlogPostBySlug(slug: string): BlogPostData | undefined {
  return allBlogPosts.find((post) => post.slug === slug);
}
