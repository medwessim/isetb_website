// ─────────────────────────────────────────────────────────────────────────────
// LEGACY — MESSAGES FROM PAST EXECUTIVE COMMITTEES
//
// HOW TO UPDATE (for future teams):
//   1. Add a new entry to the LEGACY_MESSAGES array below.
//   2. Fill in: name, role (e.g. "Chair 2023–2024"), term, message, and optionally
//      a short quote and an image path (put the photo in /public/images/).
//   3. Save the file. The website updates automatically.
//   No developer help needed — just edit this file!
// ─────────────────────────────────────────────────────────────────────────────

export interface LegacyMessage {
  id: number;
  name: string;
  role: string;       // e.g. "Chair" or "Vice Chair"
  term: string;       // e.g. "2022 – 2023"
  image?: string;     // optional — path to photo in /public/images/
  message: string;    // full message (2-4 sentences)
  quote: string;      // short pull-quote shown prominently (1 sentence)
}

// ── Add or remove entries freely ─────────────────────────────────────────────
export const LEGACY_MESSAGES: LegacyMessage[] = [
  {
    id: 1,
    name: 'Mohamed Wassim Saidani',
    role: 'Chair',
    term: '2024',
    image: '/images/wessim.png', 
    quote: 'The sea does not apologize for its waves — neither should you for your ambitions.',
    message:
      'To the team that comes after us: you inherit something real. Every event we organised, every late night debugging session, every workshop we ran — it all lives on in the members you will lead. Trust the process, trust each other, and never stop asking why. IEEE ISET Bizerte is more than a student branch; it is a culture of excellence. Carry it forward with pride.',
  },
  {
    id: 2,
    name: 'Tesnim Solly',
    role: 'Chair',
    term: '2025',
    image: '/images/tesnim.png',
    quote: 'Leadership is not a title. It is the willingness to show up when things are hard.',
    message:
      'When I joined this branch as a freshman I had no idea it would shape my entire career. The skills I built here — public speaking, project management, working under pressure — opened doors I did not know existed. To the next generation: invest in your members the way this branch invested in me. One conversation, one workshop, one event at a time.',
  },
  {
    id: 3,
    name: 'Nourallah Temimi',
    role: 'Chair',
    term: '2023',
    quote: 'Every great branch starts with a team that believed before anyone else did.',
    message:
      'My term taught me that the best leaders are learners first. We made mistakes — some events flopped, some plans fell apart — but each failure taught us something the textbooks never could. What I am most proud of is not the events we ran but the people we grew. You are sitting in the chairs we once sat in. Make them proud.',
  },
];
