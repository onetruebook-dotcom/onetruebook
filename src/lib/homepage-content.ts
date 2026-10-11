export type HomepageStat = {
  id: string;
  value: number;
  start?: number;
  decimals?: number;
  animationDecimals?: number;
  suffix: string;
  label: string;
  illustrative?: boolean;
};

export const homepageStats: HomepageStat[] = [
  {
    id: "readers",
    value: 14200,
    start: 1,
    suffix: "+",
    label: "readers diagnosed",
    illustrative: true,
  },
  {
    id: "questions",
    value: 8,
    suffix: " questions",
    label: "to the right book",
  },
  {
    id: "rating",
    value: 4.9,
    decimals: 1,
    suffix: "/5",
    label: "average reader rating",
    illustrative: true,
  },
  {
    id: "practice",
    value: 1,
    animationDecimals: 1,
    suffix: " week",
    label: "to start putting it into practice",
  },
];

export type ReaderStory = {
  id: string;
  name: string;
  role: string;
  quote: string;
  bookTitle: string;
  bookSlug: string;
};

// Fictional examples for the carousel, not verified customer endorsements.
// A visible notice labels the whole carousel while the original cards stay simple.
// Quotes are kept to a similar medium length so every card fills evenly.
export const additionalReaderStories: ReaderStory[] = [
  {
    id: "sample-daniel",
    name: "Daniel K.",
    role: "Product designer",
    quote:
      "I have tried every productivity app out there. This was the first thing that actually got me to close them and protect one quiet block a day.",
    bookTitle: "The Focus Formula",
    bookSlug: "the-focus-formula",
  },
  {
    id: "sample-elena",
    name: "Elena M.",
    role: "Nurse",
    quote:
      "I used to avoid my banking app completely. Four simple accounts turned money into a calm routine instead of a feeling I kept running from.",
    bookTitle: "Money Unlocked",
    bookSlug: "money-unlocked",
  },
  {
    id: "sample-marcus",
    name: "Marcus W.",
    role: "Teacher",
    quote:
      "I kept restarting big goals and quitting by Monday. Starting with a version too small to fail is the reason this one finally stuck.",
    bookTitle: "The Habit Architect",
    bookSlug: "the-habit-architect",
  },
  {
    id: "sample-avery",
    name: "Avery B.",
    role: "Designer",
    quote:
      "I wanted a practical place to start, not another complicated app. Choosing one task before opening my inbox gave my mornings a clear direction.",
    bookTitle: "The Focus Formula",
    bookSlug: "the-focus-formula",
  },
  {
    id: "sample-jamie",
    name: "Jamie C.",
    role: "Freelancer",
    quote:
      "The four-account idea helped me organize what I was already earning. Having a separate place for surprise expenses made money feel far less stressful.",
    bookTitle: "Money Unlocked",
    bookSlug: "money-unlocked",
  },
  {
    id: "sample-morgan",
    name: "Morgan R.",
    role: "Teacher",
    quote:
      "I kept designing routines for a version of me with endless free time. Starting with two minutes was a much better fit for the day I actually have.",
    bookTitle: "The Habit Architect",
    bookSlug: "the-habit-architect",
  },
  {
    id: "sample-riley",
    name: "Riley P.",
    role: "Project coordinator",
    quote:
      "The small-step approach felt more believable than telling myself to be fearless. Writing down one question before a meeting made the advice easy to use.",
    bookTitle: "Quiet Confidence",
    bookSlug: "quiet-confidence",
  },
  {
    id: "sample-jordan",
    name: "Jordan W.",
    role: "Graduate student",
    quote:
      "I liked the focus on noticing my evening habits instead of buying more gadgets. A simple wind-down note became a calm starting point for better sleep.",
    bookTitle: "The Sleep Reset",
    bookSlug: "the-sleep-reset",
  },
  {
    id: "sample-casey",
    name: "Casey L.",
    role: "Operations specialist",
    quote:
      "I was not ready to quit my job, and I liked that this did not ask me to. The value map helped me put my work into words before a talk with my manager.",
    bookTitle: "Career Leap",
    bookSlug: "career-leap",
  },
];
