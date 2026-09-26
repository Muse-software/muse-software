export type CareerRole = {
  slug?: string;
  title: string;
  department: "Engineering" | "Design" | "Strategy" | "Operations" | "Marketing";
  blurb: string;
  location?: string;
  employmentType?: string;
  compensation?: string;
  responsibilities?: string[];
  requirements?: string[];
  niceToHaves?: string[];
};
