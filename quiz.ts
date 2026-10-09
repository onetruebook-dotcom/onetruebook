export type Category =
  | "focus"
  | "money"
  | "habits"
  | "confidence"
  | "sleep"
  | "career";

export type QuizOption = {
  id: string;
  label: string;
  hint?: string;
  scores: Partial<Record<Category, number>>;
};

export type QuizQuestion = {
  id: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
};

export const categoryMeta: Record<
  Category,
  {
    label: string;
    bookSlug: string;
    headline: string;
    diagnosis: string;
    hook: string;
  }
> = {
  focus: {
    label: "Scattered attention",
    bookSlug: "the-focus-formula",
    headline: "Your mind isn't broken. It's overcrowded.",
    diagnosis:
      "You don't have a discipline problem. You have too many open loops competing for a tired brain. Until we close the loops, no planner, app, or 5AM club will stick.",
    hook: "The Focus Formula gives you a 14-day system to reclaim 3 deep-work hours a day — without becoming a robot.",
  },
  money: {
    label: "Money anxiety",
    bookSlug: "money-unlocked",
    headline: "You're not bad with money. You were never given a system.",
    diagnosis:
      "The tightness in your chest when a notification hits isn't a character flaw. It's what happens when money is emotional, invisible, and always one surprise away from panic.",
    hook: "Money Unlocked installs a 4-account system that makes your next 90 days calmer than the last 9 years.",
  },
  habits: {
    label: "False starts",
    bookSlug: "the-habit-architect",
    headline: "You don't have a motivation problem. You have a design problem.",
    diagnosis:
      "You start strong because hope is cheap. You quit because the habit was built on willpower, not architecture. Motivation is a spark. Design is the furnace.",
    hook: "The Habit Architect shows you how to build one identity-level habit that quietly pulls the rest of your life into line.",
  },
  confidence: {
    label: "Self-doubt",
    bookSlug: "quiet-confidence",
    headline: "The voice in your head is not the truth. It's a habit.",
    diagnosis:
      "You don't lack talent. You over-negotiate with a narrator who profits from you staying small. Every delayed email, every swallowed opinion, is a tax you keep paying.",
    hook: "Quiet Confidence retrains that narrator in 21 days — without fake bravado or toxic positivity.",
  },
  sleep: {
    label: "Energy collapse",
    bookSlug: "the-sleep-reset",
    headline: "Your ambition is leaking through your nights.",
    diagnosis:
      "You're trying to build a life on a battery that never hits 100%. Coffee is not a personality. Exhaustion is not a badge. Your brain is begging for a reset, not another productivity hack.",
    hook: "The Sleep Reset is a 10-night protocol that restores deep sleep without gadgets, shame, or 9PM lights-out fantasies.",
  },
  career: {
    label: "Career stall",
    bookSlug: "career-leap",
    headline: "You're not ungrateful. You're underused.",
    diagnosis:
      "The Sunday dread isn't laziness. It's your nervous system noticing the gap between who you are and the role you're performing. Staying is costing more than leaving — you just haven't run the numbers.",
    hook: "Career Leap is the 6-week playbook for a raise, a pivot, or an exit — without burning your life down on a Wednesday.",
  },
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "drain",
    title: "What's draining you most right now?",
    subtitle: "Pick the one that made your stomach tighten. Be honest — nobody sees this but you.",
    options: [
      {
        id: "focus",
        label: "I start ten things and finish none.",
        hint: "Tabs, ideas, half-done work",
        scores: { focus: 4, habits: 1 },
      },
      {
        id: "money",
        label: "Money stress never really leaves.",
        hint: "Bills, guilt, mental math",
        scores: { money: 4, confidence: 1 },
      },
      {
        id: "habits",
        label: "I restart my life every Monday.",
        hint: "Gym, routines, promises",
        scores: { habits: 4, focus: 1 },
      },
      {
        id: "confidence",
        label: "I second-guess everything I do.",
        hint: "Imposter feelings, overthinking",
        scores: { confidence: 4, career: 1 },
      },
      {
        id: "sleep",
        label: "I'm exhausted, even when I rest.",
        hint: "Fog, irritability, 2AM mind",
        scores: { sleep: 4, focus: 1 },
      },
      {
        id: "career",
        label: "My work feels like a slow leak.",
        hint: "Stuck, invisible, underpaid",
        scores: { career: 4, confidence: 1 },
      },
    ],
  },
  {
    id: "ninety",
    title: "If one thing changed in 90 days, which would rewrite your life?",
    subtitle: "Not what sounds impressive. What would actually make you exhale.",
    options: [
      {
        id: "focus",
        label: "I could concentrate for hours without drowning.",
        scores: { focus: 4 },
      },
      {
        id: "money",
        label: "I'd have a real cushion and a plan.",
        scores: { money: 4 },
      },
      {
        id: "habits",
        label: "The thing I keep quitting would finally stick.",
        scores: { habits: 4 },
      },
      {
        id: "confidence",
        label: "I'd speak, apply, and ask without shrinking.",
        scores: { confidence: 4 },
      },
      {
        id: "sleep",
        label: "I'd wake up actually restored.",
        scores: { sleep: 4 },
      },
      {
        id: "career",
        label: "I'd be on a path that uses me properly.",
        scores: { career: 4 },
      },
    ],
  },
  {
    id: "afternoon",
    title: "Your typical 3PM looks like…",
    subtitle: "This is where the truth hides.",
    options: [
      {
        id: "a",
        label: "A graveyard of tabs and unfinished tasks.",
        scores: { focus: 3, habits: 1 },
      },
      {
        id: "b",
        label: "Refreshing my bank app between meetings.",
        scores: { money: 3 },
      },
      {
        id: "c",
        label: "I already abandoned today's 'new routine'.",
        scores: { habits: 3 },
      },
      {
        id: "d",
        label: "Replaying something I said this morning.",
        scores: { confidence: 3 },
      },
      {
        id: "e",
        label: "I need caffeine just to feel human.",
        scores: { sleep: 3, focus: 1 },
      },
      {
        id: "f",
        label: "Watching the clock, wondering if this is it.",
        scores: { career: 3 },
      },
    ],
  },
  {
    id: "moneyfeel",
    title: "When money comes up, you mostly feel…",
    subtitle: "No judgment. Money is emotional for almost everyone who wasn't taught it.",
    options: [
      {
        id: "a",
        label: "Tight. I avoid looking too closely.",
        scores: { money: 4 },
      },
      {
        id: "b",
        label: "Fine, but I know I could be further.",
        scores: { money: 2, career: 2 },
      },
      {
        id: "c",
        label: "I earn enough — I just leak it.",
        scores: { money: 3, habits: 2 },
      },
      {
        id: "d",
        label: "It's not my biggest fire right now.",
        scores: { focus: 1, sleep: 1 },
      },
    ],
  },
  {
    id: "goals",
    title: "When you set a goal, what usually happens?",
    subtitle: "The pattern matters more than the goal.",
    options: [
      {
        id: "a",
        label: "I overplan, then freeze.",
        scores: { confidence: 3, focus: 2 },
      },
      {
        id: "b",
        label: "I sprint for 5 days, then vanish.",
        scores: { habits: 4 },
      },
      {
        id: "c",
        label: "I start, get distracted, start something else.",
        scores: { focus: 4 },
      },
      {
        id: "d",
        label: "I follow through — I'm just aiming at the wrong thing.",
        scores: { career: 3, money: 1 },
      },
      {
        id: "e",
        label: "I'm too tired to want anything extra.",
        scores: { sleep: 4 },
      },
    ],
  },
  {
    id: "room",
    title: "In a room of capable people, you quietly think…",
    subtitle: "The sentence you would never say out loud.",
    options: [
      {
        id: "a",
        label: "I hope they don't find me out.",
        scores: { confidence: 4 },
      },
      {
        id: "b",
        label: "I could do more if I could just focus.",
        scores: { focus: 3 },
      },
      {
        id: "c",
        label: "They seem to have their lives together.",
        scores: { habits: 2, money: 2 },
      },
      {
        id: "d",
        label: "I'm in the wrong room.",
        scores: { career: 4 },
      },
      {
        id: "e",
        label: "I just want to go home and sleep.",
        scores: { sleep: 3 },
      },
    ],
  },
  {
    id: "morning",
    title: "How do you feel 20 minutes after waking up?",
    subtitle: "Not the Instagram version. The real one.",
    options: [
      {
        id: "a",
        label: "Already behind. Phone first, regret second.",
        scores: { focus: 2, sleep: 2, habits: 1 },
      },
      {
        id: "b",
        label: "Heavy. Like I didn't sleep at all.",
        scores: { sleep: 4 },
      },
      {
        id: "c",
        label: "Anxious about money or work before my feet hit the floor.",
        scores: { money: 2, career: 2 },
      },
      {
        id: "d",
        label: "Okay — until I remember what I still haven't started.",
        scores: { habits: 3, confidence: 1 },
      },
      {
        id: "e",
        label: "Fine, but braced for a day that doesn't use me well.",
        scores: { career: 3 },
      },
    ],
  },
  {
    id: "fear",
    title: "What's the scariest version of 'nothing changes'?",
    subtitle: "This is the question that makes people buy the right book instead of another course they'll ignore.",
    options: [
      {
        id: "a",
        label: "Another year of busy days and empty progress.",
        scores: { focus: 3, habits: 2 },
      },
      {
        id: "b",
        label: "Still one emergency away from panic.",
        scores: { money: 4 },
      },
      {
        id: "c",
        label: "Watching people less talented pass me.",
        scores: { confidence: 3, career: 2 },
      },
      {
        id: "d",
        label: "Becoming the tired person I swore I wouldn't be.",
        scores: { sleep: 3, habits: 2 },
      },
      {
        id: "e",
        label: "Waking up at 50 in the same job with the same excuse.",
        scores: { career: 4 },
      },
    ],
  },
];

export const emptyScores = (): Record<Category, number> => ({
  focus: 0,
  money: 0,
  habits: 0,
  confidence: 0,
  sleep: 0,
  career: 0,
});

export function scoreQuiz(answers: Record<string, string>) {
  const scores = emptyScores();

  for (const question of quizQuestions) {
    const selected = question.options.find((option) => option.id === answers[question.id]);
    if (!selected) continue;
    for (const [category, value] of Object.entries(selected.scores) as [Category, number][]) {
      scores[category] += value;
    }
  }

  const ranked = (Object.entries(scores) as [Category, number][]).sort((a, b) => b[1] - a[1]);
  const primary = ranked[0][0];
  const secondary = ranked[1][0];

  return {
    scores,
    primary,
    secondary,
    recommendedBookSlug: categoryMeta[primary].bookSlug,
    secondaryBookSlug: categoryMeta[secondary].bookSlug,
  };
}

export function isCategory(value: string): value is Category {
  return value in categoryMeta;
}
