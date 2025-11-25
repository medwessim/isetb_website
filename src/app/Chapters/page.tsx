"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Cs from "../assets/cs.png";
import Cis from "../assets/cis.png";
import Ias from "../assets/ias_ies.png";
import Wie from "../assets/wie.png";
import Ras from "../assets/ras.png";

const chapters = [
    {
        id: "cs",
        title: "Computer Society (CS)",
        text: (
            <>
                The <b>IEEE Computer Society</b> is the premier source for information, inspiration, and collaboration in computer science and engineering. We focus on advancing the theory, practice, and application of computer and information processing science and technology. Our activities include coding workshops, algorithm competitions, AI/ML sessions, and career development programs for aspiring computer scientists.
            </>
        ),
        image: Cs.src,
        invert: false,
        socials: {
            website: "https://cs-isetbizerte.ieee.tn/",
            facebook: "https://www.facebook.com/IEEE.CS.Chapter.ISET.Bizerte.Student.Branch",
            instagram: "https://www.instagram.com/ieee.cs.isetbz/",
            linkedin: "https://www.linkedin.com/company/ieee-computer-society-chapter-iset-bizerte-student-branch/?viewAsMember=true"
        }
    },
    {
        id: "cis",
        title: "Computational Intelligence Society (CIS)",
        text: (
            <>
                The <b>IEEE Computational Intelligence Society</b> is dedicated to the theory, design, application, and development of computational intelligence paradigms. We explore neural networks, fuzzy systems, evolutionary computation, and machine learning through hands-on workshops, research talks, and innovative projects that push the boundaries of intelligent systems.
            </>
        ),
        image: Cis.src,
        invert: true,
        socials: {
            website: "https://cis-isetbizerte.ieee.tn/",
            facebook: "https://www.facebook.com/profile.php?id=61567684887441",
            instagram: "#",
            linkedin: "#"
        }
    },
    {
        id: "iasies",
        title: "Industry Applications Society (IAS) & Industrial Electronics Society (IES)",
        text: (
            <>
                The <b>IAS & IES Joint Chapter</b> brings together two powerful IEEE communities dedicated to innovation in industrial technologies. <br />
                The <b>Industry Applications Society (IAS)</b> focuses on the development and practical application of electrical systems, apparatus, devices, and controls across industrial and commercial environments. <br />
            The <b>Industrial Electronics Society (IES)</b> advances the theory and application of electronics, intelligent systems, automation, and robotics within modern industries.
            </>
        ),
        image: Ias.src,
        invert: false,
        socials: {
            website: "https://ias.ieee.org",
            facebook: "https://www.facebook.com/IAS.ISETBz",
            instagram: "https://www.instagram.com/ieee.ias.isetbz/",
            linkedin: "https://linkedin.com/company/ieee-industry-applications-society"
        }
    },
    {
        id: "wie",
        title: "Women in Engineering (WIE)",
        text: (
            <>
                <b>IEEE Women in Engineering</b> is dedicated to promoting women engineers and scientists and inspiring girls around the world to follow their academic interests in a career in engineering. We organize mentorship programs, leadership workshops, networking events, and outreach activities to foster diversity and inclusion in STEM fields.
            </>
        ),
        image: Wie.src,
        invert: true,
        socials: {
            website: "#",
            facebook: "https://www.facebook.com/profile.php?id=61564201408107",
            instagram: "https://www.instagram.com/ieee_wie_isetbizerte/",
            linkedin: "#"
        }
    },
    {
        id: "ras",
        title: "Robotics & Automation Society (RAS)",
        text: (
            <>
                The <b>IEEE Robotics & Automation Society</b> is focused on advancing innovation, education, and fundamental and applied research in robotics and automation. We conduct robotics competitions, hands-on workshops, and research projects that explore autonomous systems, mechatronics, and intelligent automation technologies.
            </>
        ),
        image: Ras.src,
        invert: false,
        socials: {
            website: "#",
            facebook: "https://www.facebook.com/raschapterieeeisetbz",
            instagram: "https://www.instagram.com/ieee.ras.isetbizerte/",
            linkedin: "#"
        }
    },
];

// Social Media Button Component
function SocialButtons({ socials }: { socials: any }) {
    return (
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6 justify-center md:justify-start">
    <motion.a
        href={socials.website}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-ieeeblue text-white p-2 sm:p-3 rounded-full hover:bg-blue-700 transition-colors"
        title="Website"
    >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"/>
        </svg>
    </motion.a>
    <motion.a
        href={socials.facebook}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 text-white p-2 sm:p-3 rounded-full hover:bg-blue-700 transition-colors"
        title="Facebook"
    >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
        </svg>
    </motion.a>
    <motion.a
        href={socials.instagram}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-pink-600 text-white p-2 sm:p-3 rounded-full hover:bg-pink-700 transition-colors"
        title="Instagram"
    >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 110 12.324 6.162 6.162 0 010-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 110 2.881 1.44 1.44 0 010-2.881z"/>
        </svg>
    </motion.a>
    <motion.a
        href={socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-800 text-white p-2 sm:p-3 rounded-full hover:bg-blue-900 transition-colors"
        title="LinkedIn"
    >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
    </motion.a>
</div>
    );
}

// Alternating Section component
function AlternatingSection({
    id,
    title,
    text,
    invert,
    image,
    socials
}: {
    id: string;
    title: string;
    text: React.ReactNode;
    image?: string;
    invert: boolean;
    socials: any;
}) {
    return (
        <section
            id={id}
            className={`w-full max-w-7xl mx-auto py-8 sm:py-12 lg:py-16 flex flex-col ${invert ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8`}
        >
            {/* Image Section */}
            <motion.div
                initial={{ opacity: 0, x: invert ? 100 : -100, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full lg:flex-1 flex justify-center"
            >
                <div className="rounded-2xl sm:rounded-3xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl overflow-hidden">
                    <div className="w-full aspect-square flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-contain rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-105"
                            loading="lazy"
                            draggable={false}
                            style={{ 
                                userSelect: "none", 
                                pointerEvents: "none",
                                maxWidth: "100%",
                                maxHeight: "100%"
                            }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
                initial={{ opacity: 0, x: invert ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left px-2 sm:px-4"
            >
                <motion.h2 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-ieeeblue  [text-shadow:0_0_2px_white,0_0_4px_white,0_0_6px_white] w-full"
                    whileInView={{ y: 0, opacity: 1 }}
                    initial={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {title}
                </motion.h2>
                <motion.div 
                    className="text-ieeenavy/80 text-base sm:text-lg leading-relaxed sm:leading-loose space-y-3 sm:space-y-4 w-full"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="text-white/90">
                        {text}
                    </div>
                    <SocialButtons socials={socials} />
                </motion.div>
            </motion.div>
        </section>
    );
}

export default function ChaptersPage() {
    return (
        <div className="relative min-h-screen overflow-x-hidden">
            {/* Hero Section for Chapters Page */}
            <section className="pt-24 sm:pt-28 lg:pt-36 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 bg-clip-text text-white"
                    >
                        Our Chapters & Affinity Groups
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                        className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed sm:leading-loose text-white/90 px-2"
                    >
                        Discover the diverse technical communities within IEEE ISET Bizerte
                    </motion.p>
                </div>
            </section>

            {/* Chapters Sections */}
            <div className="space-y-8 sm:space-y-6 lg:space-y-8 py-8 sm:py-6 lg:py-8">
                {chapters.map((chapter, idx) => (
                    <AlternatingSection key={chapter.id} {...chapter} />
                ))}
            </div>

            {/* Join Call to Action */}
            {/* <section className="w-full  mx-auto py-2 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-gradient-to-r from-ieeeblue to-ieeecyan rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                        Join Our Chapters
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                        Ready to dive deeper into your technical interests? Join one of our chapters and connect with like-minded students, industry professionals, and researchers in your field of passion.
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link 
                            href="/join"
                            className="inline-block bg-white text-ieeeblue px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors duration-300"
                        >
                            Get Involved Today
                        </Link>
                    </motion.div>
                </motion.div>
            </section> */}

            {/* Custom Styles */}
            <style jsx global>{`
                .bg-ieeeblue { background-color: #00629B; }
                .bg-ieeecyan { background-color: #00C2F2; }
                .bg-ieeenavy { background-color: #1A2636; }
                .bg-ieeegold { background-color: #B8860B; }
                .text-ieeeblue { color: #00629B; }
                .text-ieeecyan { color: #00C2F2; }
                .text-ieeenavy { color: #1A2636; }
                .text-ieeegold { color: #B8860B; }
                
                /* Responsive text sizes */
                @media (max-width: 640px) {
                    .text-responsive { font-size: 0.875rem; }
                }
                
                /* Enhanced Card Styles */
                .flip-card {
                    background-color: transparent;
                    perspective: 1200px;
                    width: 100%;
                    max-width: 20rem;
                    height: 20rem;
                }
                @media (min-width: 768px) {
                    .flip-card {
                        width: 24rem;
                        height: 22rem;
                    }
                }
                @media (min-width: 1024px) {
                    .flip-card {
                        width: 28rem;
                        height: 24rem;
                    }
                }
            `}</style>
        </div>
    );
}