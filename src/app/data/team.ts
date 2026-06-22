// ─────────────────────────────────────────────────────────────────────────────
// EXECUTIVE BOARD DATA
// To update the team: edit the arrays below.
// Images go in /public/images/ — use the filename as the path.
// ─────────────────────────────────────────────────────────────────────────────

export interface ExecutiveMember {
  id: number;
  name: string;
  role: string;
  image: string;
  facebook: string;
  linkedin: string;
  email: string;
}

export interface Supervisor {
  name: string;
  title: string;        // e.g. "Branch Counselor"
  institution: string;  // e.g. "ISET Bizerte"
  image: string;
  email: string;
  linkedin: string;
}

// ── Update supervisor info here ───────────────────────────────────────────────
export const SUPERVISOR: Supervisor = {
  name: 'Mrs. Imene Jemmali',
  title: 'Branch Counselor',
  institution: 'ISET Bizerte',
  image: '',           
  email: 'mailto:amalbenjamaa@ieee.org',
  linkedin: '#',
};

export const EXECUTIVE_MEMBERS: ExecutiveMember[] = [
  {
    id: 1,
    role: 'Chair',
    name: 'Amal Ben Jamaa',
    image: '/images/amal2.png',
    facebook: 'https://www.facebook.com/amalbenjamaa',
    linkedin: 'https://www.linkedin.com/in/amal-ben-jamaa-3222b3330/',
    email: 'mailto:amalbenjamaa@ieee.org',
  },
  {
    id: 2,
    name: 'Mohamed bejaoui',
    role: 'Vice Chair',
    image: '/images/mohamed.png',
    facebook: 'https://www.facebook.com/mohamed.bejaoui.76710',
    linkedin: 'https://www.linkedin.com/in/mohamed-bejaoui-884110338/',
    email: 'mailto:mohamedbejaoui@ieee.org',
  },
  {
    id: 3,
    name: 'ibrahim elmaazi',
    role: 'Treasurer',
    image: '/images/ibrahim.png',
    facebook: 'https://www.facebook.com/ibrahim.elmaazi.3',
    linkedin: '#',
    email: 'mailto:amalbenjamaa@ieee.org',
  },
  {
    id: 4,
    name: 'Med Amin Becha',
    role: 'Webmaster',
    image: '/images/becha.png',
    facebook: 'https://www.facebook.com/mamounx9yt',
    linkedin: '#',
    email: 'mailto:amalbenjamaa@ieee.org',
  },
  {
    id: 5,
    name: 'Rane bejaoui',
    role: 'Secretary',
    image: '/images/rane.png',
    facebook: 'https://www.facebook.com/ranouna.ranouna.94',
    linkedin: '#',
    email: 'mailto:amalbenjamaa@ieee.org',
  },

];
