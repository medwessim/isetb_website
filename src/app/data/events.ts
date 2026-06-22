// ─────────────────────────────────────────────────────────────────────────────
// EVENTS DATA
// To add/edit events: update the arrays below.
// Leave date/time as "" to display "To be announced".
// Images go in /public/images/ — use the filename as the path.
// category must be "technical" or "non-technical"
// ─────────────────────────────────────────────────────────────────────────────

export interface EventItem {
  id: number;
  name: string;
  description: string;
  image: string;
  category: 'technical' | 'non-technical';
  date: string;   // "YYYY-MM-DD" or "" for TBA
  time: string;   // "2:00 PM - 5:00 PM" or "" for TBA
  location: string;
  venue: string;
}

export const TECHNICAL_EVENTS: EventItem[] = [
  {
    id: 1,
    name: 'CODE IT UP 7.0',
    description: 'A hands-on coding event to challenge your skills, build projects, and compete with peers.',
    image: '/images/18.png',
    category: 'technical',
    date: '',
    time: '',
    location: 'ISET Bizerte',
    venue: '',
  },
  {
    id: 2,
    name: 'Bizerte TCODI 3.0',
    description: 'A tech and coding competition where students solve real-world problems, showcase innovation, and collaborate on cutting-edge projects.',
    image: '/images/7.png',
    category: 'technical',
    date: '',
    time: '',
    location: 'ISET Bizerte',
    venue: '',
  },
  
];

export const NON_TECHNICAL_EVENTS: EventItem[] = [
  {
    id: 5,
    name: 'General Assembly',
    description: 'The official gathering of IEEE ISET Bizerte members to discuss achievements, plan future activities, and make key decisions for the branch.',
    image: '/images/13.jpg',
    category: 'non-technical',
    date: '',
    time: '',
    location: 'ISET Bizerte',
    venue: '',
  },
];

export const ALL_EVENTS: EventItem[] = [...TECHNICAL_EVENTS, ...NON_TECHNICAL_EVENTS];
