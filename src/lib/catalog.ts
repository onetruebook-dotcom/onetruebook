import type { BookChapter, BookTestimonial } from "@/db/schema";

export type CatalogBook = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  category: string;
  priceCents: number;
  originalPriceCents: number;
  description: string;
  promise: string;
  diagnosis: string;
  pages: number;
  coverImage: string;
  lifestyleImage: string;
  badge: string | null;
  accent: string;
  isBundle: number;
  includesSlugs: string[];
  painPoints: string[];
  outcomes: string[];
  chapters: BookChapter[];
  testimonials: BookTestimonial[];
};

const focusChapters: BookChapter[] = [
  {
    number: 1,
    title: "The Overcrowded Mind",
    readingMinutes: 12,
    body: [
      "You do not have a broken brain. You have a browser with forty-seven tabs open, three of them playing audio, and a vague sense that something important is loading. That is not a moral failure. It is a design failure — and design can be changed.",
      "Most focus advice assumes you are lazy. You are not lazy. You are overstimulated, under-recovered, and trying to do knowledge work in an environment engineered to hijack you. Willpower is the worst tool for this job. Architecture is the right one.",
      "In this chapter you will map your Open Loops: every unfinished task, unread message, and half-made decision currently taxing your working memory. We do not fix them yet. We make them visible. A mind that can see its load can start to put it down.",
      "The Focus Formula begins with a single rule: nothing gets to live in your head rent-free. If it matters, it lives on paper. If it does not, it dies today. That sounds simple. It is. Simple is what actually works when you are tired.",
    ],
  },
  {
    number: 2,
    title: "One Arena",
    readingMinutes: 14,
    body: [
      "Multitasking is not a skill. It is a tax. Every switch costs you minutes of re-entry, and those minutes compound into a life that feels busy and strangely empty.",
      "Your Arena is the one project that, if advanced for ninety focused minutes, would make the rest of the day feel honest. Not the loudest task. The true one. Most people never name it, so they spend their best hours on other people's emergencies.",
      "You will choose an Arena for the next fourteen days. You will protect it with a closed door, a silenced phone, and a written start ritual that takes ninety seconds. The ritual is not cute. It is a switch that tells your nervous system: we are here now.",
      "People who 'can't focus' often focus beautifully on the wrong thing. This chapter is about putting your rarest resource — uninterrupted attention — on the work that would actually change your month.",
    ],
  },
  {
    number: 3,
    title: "The 90-Minute Gate",
    readingMinutes: 11,
    body: [
      "Deep work does not require a monastery. It requires a gate. For fourteen days you will run one 90-minute block before you check a single message. That is the whole protocol. Everything else is decoration.",
      "The first twelve minutes will feel itchy. That itch is withdrawal, not truth. Sit through it. After minute twenty, most readers report a quiet that they had forgotten was available without a vacation.",
      "If you miss a day, you do not restart the streak from shame. You run a 25-minute salvage block and log it. Shame is a focus killer. Repair is a focus skill.",
      "By day ten, the Gate becomes identity: I am someone who does the real work first. Identity is stickier than motivation, which is why this book does not ask you to feel inspired. It asks you to show up for ninety minutes.",
    ],
  },
  {
    number: 4,
    title: "Close the Loops",
    readingMinutes: 13,
    body: [
      "Unfinished things scream. Finished things go quiet. Your anxiety is often just a pile of loops that never got a next action.",
      "You will run a weekly Close-the-Loop hour: every open project gets one of four labels — do, date, delegate, or delete. Delete will hurt. Delete is where your life comes back.",
      "We also install a Shutdown Sentence you say at the end of work: 'The work is held. I can leave it.' Your brain needs a ceremony or it will keep working in the shower, the bed, the argument with someone who did not deserve it.",
      "Focus is not only about starting. It is about being allowed to stop. People who cannot stop cannot truly start the next day. This is the chapter workaholics skip and then wonder why they are foggy.",
    ],
  },
  {
    number: 5,
    title: "The Distraction Diet",
    readingMinutes: 10,
    body: [
      "You cannot out-meditate a phone that is allowed in the room. Environment beats intention. We will remove the slot machines from arm's reach during the Gate, and we will replace the 'just checking' reflex with a parking lot note.",
      "Notifications are not information. They are other people's agendas wearing a red badge. You will batch messages twice a day. The world will not end. Your work might begin.",
      "This is not a digital detox fantasy. You still live in this century. You just stop letting the century live in your pocket during the only hours that matter.",
    ],
  },
  {
    number: 6,
    title: "Keep the Quiet",
    readingMinutes: 12,
    body: [
      "After fourteen days you will have proof, not hope. Proof is what changes identity. You will write a Focus Charter: your Arena, your Gate time, your shutdown sentence, and the three things you will never again do before deep work.",
      "Relapse is part of the design. Travel, kids, deadlines — life will kick the Gate. The skill is rebuilding it the next morning without a speech about what a failure you are.",
      "The quiet you found is not a mood. It is a place. This book exists so you know how to walk back to it when the noise gets loud again. That is the formula: one arena, one gate, closed loops, a room without slot machines, and a way home.",
    ],
  },
];

const moneyChapters: BookChapter[] = [
  {
    number: 1,
    title: "The Feeling Is the Leak",
    readingMinutes: 12,
    body: [
      "Most money books start with spreadsheets. This one starts with your body. The tightness, the avoidance, the 'I'll look on Friday' — that is the leak. Numbers cannot help a nervous system that treats looking as danger.",
      "You will do a 20-minute Money Date: open the accounts, write the number, and stay. No fixing yet. Exposure is the first system. People who skip this chapter keep buying courses they do not implement.",
      "Shame is expensive. It makes you hide subscriptions, delay taxes, and say 'I'm just bad with money' as if that were a personality instead of a missing education. You are not bad. You are untrained. Training is available.",
      "By the end of this chapter you will have one honest number: your True Monthly Burn. Not the story. The number. Honesty is not punishment. It is the first calm you have felt about money in years.",
    ],
  },
  {
    number: 2,
    title: "Four Accounts, One Calm",
    readingMinutes: 14,
    body: [
      "Complexity is how money stays scary. You need four accounts, named like a human: Spend, Safety, Soon, Later. That's it. Every dollar that arrives is split on payday before you can negotiate with yourself.",
      "Safety is not optional. It is the account that lets you sleep. We start with $500, then one month of burn, then three. You will not wait until you 'earn more.' More income into a leaky system is a more expensive leak.",
      "Soon holds the expenses that pretend to be surprises: tires, dentists, flights, January. Later is boring on purpose — index funds, not stock tips from a group chat.",
      "When money has a room to go to, it stops haunting the hallway. This chapter is furniture for your financial house.",
    ],
  },
  {
    number: 3,
    title: "The 90-Day Cushion",
    readingMinutes: 11,
    body: [
      "A cushion is not a number for Instagram. It is the feeling of being able to lose a client, a shift, or a tire without calling someone you resent.",
      "You will pick a Cushion Sprint: one automatic transfer that is small enough to survive a bad week and large enough to matter in ninety days. Automatic beats heroic.",
      "We also name your Money Story — the sentence you inherited. 'People like us don't invest.' 'If I get ahead, something bad happens.' Stories run the accounts until you write a better one and back it with a transfer.",
    ],
  },
  {
    number: 4,
    title: "Spend Like You Mean It",
    readingMinutes: 10,
    body: [
      "Restriction is a binge waiting to happen. Clarity spending is different: you decide in advance what joy is worth, and you spend on it without a court case in your head.",
      "You will run a two-week Spend Audit, not to become a monk, but to see which purchases were actually anesthesia. Anesthesia is allowed. You just should know you are buying it.",
      "Guilt-free spending from the Spend account is the point. When the account is empty, you stop. The rule is kinder than shame and stricter than vibes.",
    ],
  },
  {
    number: 5,
    title: "Income Is a Skill",
    readingMinutes: 13,
    body: [
      "Cutting lattes will not change your life if your earning is stuck. This chapter is a practical raise-and-offer script, a freelance ladder, and a 30-day experiment to test one extra income lane without quitting your job in a blaze of quotes.",
      "You will write your Value Receipt: what you actually do that other people pay for, said without shrinking. Most under-earners are not unskilled. They are unpublished.",
      "Money Unlocked is not hustle porn. It is the minimum viable courage to ask, price, and collect.",
    ],
  },
  {
    number: 6,
    title: "Stay Unlocked",
    readingMinutes: 9,
    body: [
      "Once a month: a 40-minute Money Date. Check the four accounts. Move the leftovers. Celebrate the cushion in writing. If you skip two months, you do not 'start over.' You open the apps the same day you notice.",
      "Wealth is mostly unread messages from your future self saying thank you for being boring on payday. Be boring. Be free.",
    ],
  },
];

const habitChapters: BookChapter[] = [
  {
    number: 1,
    title: "Motivation Is a Liar",
    readingMinutes: 11,
    body: [
      "You have not failed at habits. You have succeeded at habits that were designed to fail: too big, too vague, too dependent on a mood that does not survive Wednesday.",
      "Motivation is a weather system. Architecture is a building. This book is about buildings. We will pick one Keystone Habit — the smallest daily action that makes you the kind of person who does the rest.",
      "If you have a graveyard of journals, 5AM attempts, and unused gym badges, good. That means you want something. Wanting is not the missing piece. Design is.",
    ],
  },
  {
    number: 2,
    title: "Identity First, Outcomes Second",
    readingMinutes: 12,
    body: [
      "People who write 'lose 20 pounds' fail. People who become 'someone who does not miss walks' change. Identity is the habit wearing a better coat.",
      "You will write a one-line identity: I am a person who ______. The blank must be observable in 10 minutes or less. 'I am a writer' is useless until it becomes 'I am a person who opens the document before coffee.'",
      "Every Keystone Habit in this book is a vote for that identity. Votes compound. Missed days are not bankruptcy. They are missed votes. Cast one tomorrow.",
    ],
  },
  {
    number: 3,
    title: "Make It Too Small to Fail",
    readingMinutes: 10,
    body: [
      "Your starter version should feel almost insulting. Two minutes. One push-up. One sentence. If you are too tired to do the starter, you are too tired, and the system still worked because it told you the truth.",
      "We attach the starter to an existing anchor: after I pour coffee, I write one sentence. Anchors beat alarms. Alarms are easy to hate. Coffee already happens.",
      "Scaling happens only after seven honest days. Not before. Ego wants to scale on day two. Ego is why your last attempt died.",
    ],
  },
  {
    number: 4,
    title: "Friction and Fuel",
    readingMinutes: 11,
    body: [
      "Make the good thing easy and the old thing annoying. Put the book on the pillow. Put the cigarettes in a box in the garage. Put the running shoes by the door like a guest who will not leave until you deal with them.",
      "Fuel is not hype. Fuel is a visible streak, a friend who texts 'did you?', and a weekly review that lasts nine minutes. If your habit needs a TED Talk to survive, it is not a habit yet.",
    ],
  },
  {
    number: 5,
    title: "The Relapse Protocol",
    readingMinutes: 12,
    body: [
      "You will miss. The difference between people who build lives and people who collect restarts is what they do on the miss. Protocol: no essay, no identity attack, next-day starter version, log it in one line.",
      "Never miss twice is a slogan. Repair once is a skill. This chapter gives you the script you will read when your brain says 'might as well wait until Monday.'",
    ],
  },
  {
    number: 6,
    title: "Let It Spread",
    readingMinutes: 10,
    body: [
      "A true keystone starts knocking on other doors. Sleep improves. Spending calms. You answer the email. Do not add five habits. Protect the one until it is boring, then — and only then — add a second starter.",
      "Boring is the goal. Excitement is for launches. Your life is not a launch. It is a building you get to keep.",
    ],
  },
];

const confidenceChapters: BookChapter[] = [
  {
    number: 1,
    title: "The Narrator Is Not You",
    readingMinutes: 12,
    body: [
      "There is a voice that talks to you as if it were the law. It is not the law. It is a well-practiced habit, often installed by a classroom, a parent, or a room where you learned that shrinking kept you safe.",
      "Quiet confidence is not loud. It is the ability to hear the narrator and still send the email. This book will not ask you to love yourself in a mirror. It will ask you to run small, undeniable experiments that make the narrator unemployed.",
      "You will name your narrator. Give it a boring name. Boring names have less power. Then you will write the three sentences it uses most. Those sentences are the curriculum.",
    ],
  },
  {
    number: 2,
    title: "Evidence Over Mood",
    readingMinutes: 11,
    body: [
      "Anxiety wants a feeling. Confidence wants a file. You will keep an Evidence Log: three lines a day of things you did while afraid. The brain believes paper more than pep talks.",
      "Imposter feelings are often a sign you are in a room you used to think was too big. That is data, not a verdict. Stay in the room long enough to collect evidence.",
    ],
  },
  {
    number: 3,
    title: "The 2-Inch Brave",
    readingMinutes: 13,
    body: [
      "We do not start with speeches. We start with 2-inch moves: ask the question in the meeting, walk into the party without a full script, publish the paragraph, request the price. Two inches, daily, for 21 days.",
      "Your nervous system learns from completion, not from visualization. Completion is the teacher. Visualization is the brochure.",
      "Each 2-inch move gets a debrief: What did I predict. What happened. What is still true. Predictions are usually worse than reality. That gap is where confidence lives.",
    ],
  },
  {
    number: 4,
    title: "Stop Auditioning",
    readingMinutes: 10,
    body: [
      "Over-explaining, over-apologizing, over-preparing — these are auditions for a committee that is not meeting. You will practice ending sentences. You will practice asking without a preface. You will practice leaving some air in the room.",
      "People with quiet confidence are not fearless. They are less available for their own prosecution.",
    ],
  },
  {
    number: 5,
    title: "Receive Good Things",
    readingMinutes: 9,
    body: [
      "Compliments, rest, money, love — if you cannot receive, you will sabotage. This chapter is a set of receiving reps: say thank you without a discount. Take the weekend. Let the invoice stand.",
      "Self-worth is often just the permission to stop arguing with a gift.",
    ],
  },
  {
    number: 6,
    title: "Keep Your Seat",
    readingMinutes: 11,
    body: [
      "Confidence is not a destination. It is a seat you keep taking. You will write a Keep-Your-Seat plan for the next hard room: the interview, the date, the family dinner, the launch.",
      "When the narrator returns, and it will, you will have a file of evidence, a 2-inch practice, and a body that has survived being seen. That is enough to begin again without shrinking all the way back.",
    ],
  },
];

const sleepChapters: BookChapter[] = [
  {
    number: 1,
    title: "You Are Not a Machine",
    readingMinutes: 11,
    body: [
      "If you are reading this at 1:14AM, you already know. Exhaustion has been dressed up as ambition, parenthood, or 'just this season.' Seasons that last four years are not seasons. They are a nervous system in debt.",
      "Sleep is not a luxury round of self-care. It is the operating system. Without it, every other ebook on this shelf is a rumor.",
      "This protocol does not require a perfect bedroom catalog or a $400 wearable. It requires ten nights of doing less, earlier, on purpose.",
    ],
  },
  {
    number: 2,
    title: "The 10-Night Arc",
    readingMinutes: 13,
    body: [
      "Nights 1–3: protect a wind-down hour like a meeting with someone you cannot reschedule. Nights 4–6: fix light, caffeine, and alcohol — the unholy trinity of almost-sleep. Nights 7–10: stabilize wake time, even on weekends, until your body believes you.",
      "You will keep a tiny log: time in bed, estimated sleep, mood at 11AM. We do not obsess. We notice. Noticing is how you stop gaslighting yourself with 'I'm fine.'",
    ],
  },
  {
    number: 3,
    title: "The Racing Mind",
    readingMinutes: 12,
    body: [
      "The mind that won't shut up at midnight is often a mind that was never given a shutdown. You will dump every loop onto paper 45 minutes before bed. Then you will write a first action for tomorrow's top three. The brain can stand down when it trusts there is a plan.",
      "If you wake at 3AM, you will not start your life. You will use the 3AM script: boring breath, boring sentence, no phone. The phone is a sunrise you cannot afford.",
    ],
  },
  {
    number: 4,
    title: "Chemistry Without Shame",
    readingMinutes: 10,
    body: [
      "Caffeine after 2PM is a loan shark. Alcohol is not a sleep aid; it is a sedative that steals the second half of the night. This is not a lecture. It is a 10-night experiment. You can have your wine back on night 11 if you still want it after sleeping like a person.",
      "Morning light in your eyes within 30 minutes of waking is free medicine. Use it.",
    ],
  },
  {
    number: 5,
    title: "The Bedroom Is a Cave",
    readingMinutes: 8,
    body: [
      "Dark, cool, boring, phone-free. If you work in bed, your bed becomes an office with pillows. We retrain the association. The cave is for sleep and love. Everything else gets another room, even if that room is a kitchen table.",
    ],
  },
  {
    number: 6,
    title: "Protect the Reset",
    readingMinutes: 10,
    body: [
      "After ten nights you will know what actually moved the needle. Keep those two or three levers for 90 days. Do not keep seventeen rules. Seventeen rules is how people return to podcasts at 1AM.",
      "Energy is the real productivity system. Guard it like it pays your rent. It does.",
    ],
  },
];

const careerChapters: BookChapter[] = [
  {
    number: 1,
    title: "Sunday Dread Is Data",
    readingMinutes: 12,
    body: [
      "That feeling on Sunday at 5PM is not ingratitude. It is information. You can be thankful for a paycheck and still be in the wrong room. Both things can be true. Adults who succeed hold both.",
      "This book will not tell you to follow your passion off a cliff. It will help you run a 6-week Leap: clarify the gap, raise your value where you are, or build a bridge to the next place without a theatrical resignation.",
      "You will write a Dread Inventory: what exactly you hate, what you can change in place, and what will not change no matter how many lunches you have with your manager.",
    ],
  },
  {
    number: 2,
    title: "The Value Map",
    readingMinutes: 13,
    body: [
      "You are probably under-describing your work. We will map wins, skills, and proof into a one-page Value Map you can use for a raise, a LinkedIn rewrite, or a recruiter call that does not make you cringe.",
      "Most career stalls are visibility stalls. You did the work. You did not translate it. Translation is a skill, and this chapter is the workshop.",
    ],
  },
  {
    number: 3,
    title: "The Raise Conversation",
    readingMinutes: 11,
    body: [
      "A script, a number, a date. You will ask with evidence, not with need. Need sounds like a plea. Evidence sounds like a partner. Even if they say no, you will have practiced being someone who names their worth out loud.",
      "If the answer is no without a path, that is also data. Data is what you take into week four.",
    ],
  },
  {
    number: 4,
    title: "The Quiet Bridge",
    readingMinutes: 14,
    body: [
      "A leap is safer with a bridge: conversations, a portfolio, a small freelance, a certification that actually matters, two informational interviews a week. You will not announce a rebrand on social media. You will collect proof in private.",
      "Bridges feel slow. Cliffs feel cinematic. You want a bridge.",
    ],
  },
  {
    number: 5,
    title: "Leave Without Lighting a Match",
    readingMinutes: 10,
    body: [
      "If you go, you go clean: notice, knowledge transfer, no manifesto. Your reputation is an asset you take with you. Burn it and you will rebuild longer than the speech felt good.",
      "If you stay, you stay on purpose, with a new scope or a new end date. Staying by accident is how years disappear.",
    ],
  },
  {
    number: 6,
    title: "Work That Uses You",
    readingMinutes: 9,
    body: [
      "The point is not a fancy title. The point is a Tuesday that does not require you to abandon yourself. Keep the Value Map current. Keep asking. Keep the bridge in repair even when you like your job. Options are a form of peace.",
    ],
  },
];

export const catalog: CatalogBook[] = [
  {
    slug: "the-focus-formula",
    title: "The Focus Formula",
    subtitle: "Reclaim three deep hours a day without becoming a machine.",
    author: "Maya Ellison",
    category: "focus",
    priceCents: 2700,
    originalPriceCents: 4700,
    description:
      "A 14-day attention system for overloaded minds. Close the loops, protect one Arena, and install a 90-minute Gate that makes your real work happen before the world gets a vote.",
    promise: "In 14 days you will finish the work that has been 'almost done' for months.",
    diagnosis:
      "Your mind isn't broken. It's overcrowded. This is the system that gives it one job at a time.",
    pages: 164,
    coverImage: "/covers/focus.jpg",
    lifestyleImage:
      "https://images.pexels.com/photos/6177605/pexels-photo-6177605.jpeg?auto=compress&cs=tinysrgb&w=1600",
    badge: "Most chosen after the quiz",
    accent: "#1c3a5f",
    isBundle: 0,
    includesSlugs: [],
    painPoints: [
      "You sit down to work and stand up two hours later with nothing true finished.",
      "Your phone is in the room, and so is everyone's agenda.",
      "You feel busy all day and strangely behind at night.",
    ],
    outcomes: [
      "One 90-minute deep-work Gate, daily, that actually happens.",
      "A shutdown ritual so work stops living in your bed.",
      "A written Focus Charter you can restart in ten minutes after chaos.",
    ],
    chapters: focusChapters,
    testimonials: [
      {
        name: "Daniel K.",
        role: "Product designer, Austin",
        quote:
          "I have bought every productivity app. This is the first thing that made me close them. Ninety minutes. That's the whole religion.",
      },
      {
        name: "Priya S.",
        role: "Founder",
        quote:
          "The open-loop inventory made me cry, which I know is dramatic. Then I shipped a launch I had been 'almost ready' for since October.",
      },
    ],
  },
  {
    slug: "money-unlocked",
    title: "Money Unlocked",
    subtitle: "A 4-account system for people who are done feeling behind.",
    author: "Jordan Hale",
    category: "money",
    priceCents: 2900,
    originalPriceCents: 4900,
    description:
      "Stop performing poverty or pretending you're fine. Split every paycheck into Spend, Safety, Soon, and Later — then run a 90-day cushion sprint that makes your shoulders drop.",
    promise: "Ninety days from now, money will be a system — not a mood.",
    diagnosis:
      "You're not bad with money. You were never given a system. Here it is, without shame.",
    pages: 178,
    coverImage: "/covers/money.jpg",
    lifestyleImage:
      "https://images.pexels.com/photos/6328860/pexels-photo-6328860.jpeg?auto=compress&cs=tinysrgb&w=1600",
    badge: "Highest rated",
    accent: "#1e4d3a",
    isBundle: 0,
    includesSlugs: [],
    painPoints: [
      "You avoid your banking app the way some people avoid the dentist.",
      "Every 'surprise' expense is a surprise you could have seen.",
      "You earn more than you used to and somehow feel less safe.",
    ],
    outcomes: [
      "Four named accounts and an automatic payday split.",
      "A growing Safety cushion you can see.",
      "A script to raise your income without a personality transplant.",
    ],
    chapters: moneyChapters,
    testimonials: [
      {
        name: "Elena M.",
        role: "Nurse, Chicago",
        quote:
          "I had a spreadsheet I was afraid of. Now I have four accounts and $2,400 in Safety. I sleep like a person with a plan.",
      },
      {
        name: "Chris T.",
        role: "Freelance editor",
        quote:
          "The Money Date concept is annoying and also the reason I finally looked. Looking was the whole unlock.",
      },
    ],
  },
  {
    slug: "the-habit-architect",
    title: "The Habit Architect",
    subtitle: "Build one identity-level habit that quietly rearranges your life.",
    author: "Priya Raman",
    category: "habits",
    priceCents: 2400,
    originalPriceCents: 3900,
    description:
      "Motivation is weather. Design is shelter. Pick a keystone, make it too small to fail, attach it to something you already do, and install a relapse protocol that ends the Monday-restart curse.",
    promise: "One habit. Seven honest days. Then it starts spreading on its own.",
    diagnosis:
      "You don't have a motivation problem. You have a design problem. Let's build.",
    pages: 152,
    coverImage: "/covers/habits.jpg",
    lifestyleImage:
      "https://images.pexels.com/photos/8055496/pexels-photo-8055496.jpeg?auto=compress&cs=tinysrgb&w=1600",
    badge: null,
    accent: "#8a4b32",
    isBundle: 0,
    includesSlugs: [],
    painPoints: [
      "You are a professional starter and an amateur continuer.",
      "Your goals are too big for a tired Tuesday.",
      "One missed day becomes a missed month.",
    ],
    outcomes: [
      "A keystone habit with a 2-minute starter version.",
      "Anchors, friction, and fuel that do not require hype.",
      "A relapse protocol so Monday loses its power.",
    ],
    chapters: habitChapters,
    testimonials: [
      {
        name: "Marcus W.",
        role: "Teacher",
        quote:
          "I wrote one sentence a day for 40 days. I now have a draft. I have been 'about to write a book' since 2019.",
      },
      {
        name: "Sofia L.",
        role: "New parent",
        quote:
          "Too small to fail saved me. Two minutes of stretching. That's it. I'm a person who stretches now, which still sounds fake to say.",
      },
    ],
  },
  {
    slug: "quiet-confidence",
    title: "Quiet Confidence",
    subtitle: "Retrain the narrator. Take your seat. No fake bravado required.",
    author: "Lena Ortiz",
    category: "confidence",
    priceCents: 2400,
    originalPriceCents: 3900,
    description:
      "A 21-day practice of 2-inch brave moves, evidence logs, and ending the audition. For people who are capable in private and small in public.",
    promise: "In 21 days you will have proof you can be seen and survive it.",
    diagnosis:
      "The voice in your head is not the truth. It's a habit. Habits can be redesigned.",
    pages: 148,
    coverImage: "/covers/confidence.jpg",
    lifestyleImage:
      "https://images.pexels.com/photos/6633771/pexels-photo-6633771.jpeg?auto=compress&cs=tinysrgb&w=1600",
    badge: null,
    accent: "#7a4450",
    isBundle: 0,
    includesSlugs: [],
    painPoints: [
      "You replay conversations like they were criminal trials.",
      "You over-prepare, then still feel like a fraud.",
      "You delay sending the thing that would actually move your life.",
    ],
    outcomes: [
      "A named narrator and an evidence file that argues back.",
      "Daily 2-inch brave moves with a debrief.",
      "A Keep-Your-Seat plan for the next hard room.",
    ],
    chapters: confidenceChapters,
    testimonials: [
      {
        name: "Amira H.",
        role: "Analyst",
        quote:
          "I asked for a project I wanted. I did not die. I got it. The book is worth that one sentence.",
      },
      {
        name: "Tom R.",
        role: "Photographer",
        quote:
          "Quiet is the right word. No shouting at a mirror. Just small proof, every day, until I believed myself a little.",
      },
    ],
  },
  {
    slug: "the-sleep-reset",
    title: "The Sleep Reset",
    subtitle: "A 10-night protocol for people who are tired of being tired.",
    author: "Dr. Noah Berger",
    category: "sleep",
    priceCents: 2200,
    originalPriceCents: 3600,
    description:
      "Protect a wind-down, fix the unholy trinity of caffeine, light, and alcohol, and give your racing mind a shutdown it trusts. No gadgets. No shame. Ten nights.",
    promise: "Ten nights to remember what a real morning feels like.",
    diagnosis:
      "Your ambition is leaking through your nights. Plug the leak before you buy another planner.",
    pages: 136,
    coverImage: "/covers/sleep.jpg",
    lifestyleImage:
      "https://images.pexels.com/photos/8406467/pexels-photo-8406467.jpeg?auto=compress&cs=tinysrgb&w=1600",
    badge: "Fastest to finish",
    accent: "#243056",
    isBundle: 0,
    includesSlugs: [],
    painPoints: [
      "You wake up more tired than you went to bed.",
      "Your mind opens a meeting at 2AM.",
      "Coffee is doing personality work it was not hired for.",
    ],
    outcomes: [
      "A 10-night protocol you can run starting tonight.",
      "A 3AM script that does not involve your phone.",
      "Two or three levers worth keeping for 90 days.",
    ],
    chapters: sleepChapters,
    testimonials: [
      {
        name: "Hannah P.",
        role: "Attorney",
        quote:
          "I thought I was a night person. I was a caffeine person. Night 7 I slept through. I cried in the kitchen. In a good way.",
      },
      {
        name: "Luis G.",
        role: "Paramedic",
        quote:
          "Shift work is chaos. The shutdown dump still helped. I am not perfect. I am better, which is all I wanted.",
      },
    ],
  },
  {
    slug: "career-leap",
    title: "Career Leap",
    subtitle: "A 6-week playbook for a raise, a pivot, or a clean exit.",
    author: "Adrian Cole",
    category: "career",
    priceCents: 2700,
    originalPriceCents: 4400,
    description:
      "Sunday dread is data. Map your value, have the raise conversation, build a quiet bridge, and leave without lighting a match — or stay on purpose.",
    promise: "Six weeks to a decision you can respect in five years.",
    diagnosis:
      "You're not ungrateful. You're underused. Let's put you in a room that can take you.",
    pages: 170,
    coverImage: "/covers/career.jpg",
    lifestyleImage:
      "https://images.pexels.com/photos/4559607/pexels-photo-4559607.jpeg?auto=compress&cs=tinysrgb&w=1600",
    badge: null,
    accent: "#3d3a32",
    isBundle: 0,
    includesSlugs: [],
    painPoints: [
      "You are good at the job and allergic to the life around it.",
      "You cannot tell if you need a raise, a pivot, or a way out.",
      "You have updated your resume in your head 400 times.",
    ],
    outcomes: [
      "A one-page Value Map you can use this week.",
      "A raise script and a number you can say out loud.",
      "A private bridge plan so you never leap blind.",
    ],
    chapters: careerChapters,
    testimonials: [
      {
        name: "Nadia F.",
        role: "Marketing lead",
        quote:
          "I asked. They said yes. Eighteen percent. I had been waiting to 'feel ready' for two years.",
      },
      {
        name: "Owen J.",
        role: "Engineer",
        quote:
          "The quiet bridge kept me from rage-quitting. I left four months later with an offer and my self-respect.",
      },
    ],
  },
  {
    slug: "the-clarity-collection",
    title: "The One True Collection",
    subtitle: "All six systems. One library. The complete reset.",
    author: "One True Book",
    category: "bundle",
    priceCents: 6700,
    originalPriceCents: 15300,
    description:
      "Focus, money, habits, confidence, sleep, and career — the six bottlenecks the quiz diagnoses, in one instant library. Built for people who know it is never only one thing.",
    promise: "Own every protocol. Return to the right one whenever life shifts.",
    diagnosis:
      "Most lives are not one problem. They are a stack. The collection is how you stop buying the wrong single fix.",
    pages: 948,
    coverImage: "/covers/focus.jpg",
    lifestyleImage: "/images/hero.jpg",
    badge: "Best value — save $86",
    accent: "#b0894f",
    isBundle: 1,
    includesSlugs: [
      "the-focus-formula",
      "money-unlocked",
      "the-habit-architect",
      "quiet-confidence",
      "the-sleep-reset",
      "career-leap",
    ],
    painPoints: [
      "You keep buying one tool when your life needs a small set.",
      "You will outgrow today's bottleneck — and meet another.",
    ],
    outcomes: [
      "Instant access to all six ebooks.",
      "A personal library you can reopen after any setback.",
      "The lowest price we offer for the full system.",
    ],
    chapters: [
      {
        number: 1,
        title: "How to Use the Library",
        readingMinutes: 6,
        body: [
          "Do not read all six this week. That is how collections become wallpaper. Start with the book the quiz named. Finish it. Run the protocol. Then, and only then, open the second bottleneck.",
          "Keep this collection like a medicine cabinet: labeled, trusted, not swallowed all at once.",
        ],
      },
    ],
    testimonials: [
      {
        name: "The Rivera household",
        role: "Two readers, one library",
        quote:
          "We split them. I did Sleep and Focus. He did Money. We are less sharp with each other. That is not nothing.",
      },
    ],
  },
];

export const singleBooks = catalog.filter((book) => book.isBundle === 0);
export const bundleBook = catalog.find((book) => book.isBundle === 1)!;

export function getCatalogBook(slug: string) {
  return catalog.find((book) => book.slug === slug);
}
