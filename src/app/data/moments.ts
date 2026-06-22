// ─────────────────────────────────────────────────────────────────────────────
// SPECIAL MOMENTS DATA
//
// HOW TO ADD A PHOTO:
//   1. Drop the image into /public/images/
//   2. Add a new entry to MOMENTS below with:
//        id     — any unique number
//        title  — event name shown on the card
//        imageUrl — "/images/your-file.jpg"
//   3. Save. Done — the carousel updates automatically.
// ─────────────────────────────────────────────────────────────────────────────

export interface Moment {
  id: number;
  title: string;
  imageUrl: string;
}

export const MOMENTS: Moment[] = [
  { id: 1,  title: "WIE ACT 4.0",        imageUrl: "/images/9.jpg"  },
  { id: 2,  title: "IEEE DAY 2025",       imageUrl: "/images/8.jpg"  },
  { id: 3,  title: "CODE IT UP 5.0",      imageUrl: "/images/3.png"  },
  { id: 4,  title: "CSTAM 2.0",           imageUrl: "/images/15.jpg" },
  { id: 5,  title: "IEEE TEJMAANA 2.0",   imageUrl: "/images/6.png"  },
  { id: 6,  title: "IEEE DAY 2024",       imageUrl: "/images/2.jpg"  },
  { id: 7,  title: "CODE IT UP 5.0",      imageUrl: "/images/1.jpg"  },
  { id: 8,  title: "TSYP 12",             imageUrl: "/images/10.jpg" },
  { id: 9,  title: "Bizerte TCODI",       imageUrl: "/images/11.png" },
  { id: 10, title: "CSTAM 2.0",           imageUrl: "/images/14.jpg" },
  { id: 11, title: "Panel",               imageUrl: "/images/5.jpg"  },
  { id: 12, title: "CODE IT UP 6.0",      imageUrl: "/images/18.png"  },
  { id: 13, title: "OC CODE IT UP 6.0",   imageUrl: "/images/17.png"  },
];
