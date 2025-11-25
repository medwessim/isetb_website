"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    id: "about",
    title: "About Us",
    text: "",
    detailedText: (
      <>
        IEEE ISET Bizerte Student Branch stands as a beacon of innovation and excellence in the heart of Tunisia's technological education landscape. As an integral part of the world's largest technical professional organization, we bring together passionate students dedicated to advancing technology for humanity's benefit. Our branch serves as a dynamic platform where theoretical knowledge meets practical application, fostering an environment where future engineers and technologists can thrive, collaborate, and transform their innovative ideas into tangible solutions that address real-world challenges.
      </>
    ),
    image: "../../images/2.jpg",
    invert: false,
  },
  {
    id: "events",
    title: "Our Events & Activities",
    text: "",
    detailedText: (
      <>
        Our event portfolio is carefully crafted to provide comprehensive learning experiences that complement academic education while developing essential professional skills. We create immersive environments where students can explore emerging technologies, develop practical skills, and build valuable connections with industry professionals and like-minded peers.
      </>
    ),
    image: "../../images/4.jpg",
    invert: true,
  },
  {
    id: "achievements",
    title: "Our Achievements",
    text: "",
    detailedText: (
      <>
        Our journey is marked by significant milestones that reflect our commitment to excellence and our members' dedication to pushing technological boundaries. These accomplishments stand as testament to the quality of education, innovation, and leadership development at IEEE ISET Bizerte.
      </>
    ),
    image: "../../images/8.jpg",
    invert: false,
  },
  {
    id: "join",
    title: "Get Involved",
    text: "",
    detailedText: (
      <>
        We welcome students from all engineering disciplines who share our passion for technology and innovation. As a member, you'll gain access to exclusive <b>technical training sessions</b>, <b>leadership development programs</b>, <b>mentorship opportunities</b> with industry professionals, and <b>networking events</b> with potential employers. You can participate in <b>research projects</b>, represent our branch at international conferences, and contribute to <b>community outreach programs</b> that use technology to solve local challenges. Our alumni network includes successful engineers, entrepreneurs, and researchers working at leading global technology companies.
        <br /><br />

      </>
    ),
    image: "../../images/1.jpg",
    invert: true,
  },
];

function AlternatingSection({
  id,
  title,
  text,
  detailedText,
  invert,
  image
}: {
  id: string;
  title: string;
  text: React.ReactNode;
  detailedText: React.ReactNode;
  image?: string;
  invert: boolean;
}) {
  return (
    <section
      id={id}
      className={`max-w-7xl mx-auto py-10 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-16 ${invert ? "md:flex-row-reverse" : ""} px-4 sm:px-6 md:px-8`}
    >
      <motion.div
        initial={{ opacity: 0, x: invert ? 100 : -100, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex-1 flex justify-center"
      >
        <div className="rounded-3xl w-64 h-64 sm:w-80 sm:h-80 md:w-120 md:h-96 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain sm:object-cover lg:object-cover rounded-2xl transition-all duration-500 hover:scale-105 shadow-2xl"
              loading="lazy"
              draggable={false}
              style={{ userSelect: "none", pointerEvents: "none" }}
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: invert ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex-1 flex flex-col items-start md:items-start px-0 sm:px-2"
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-ieeeblue  [text-shadow:0_0_2px_white,0_0_4px_white,0_0_6px_white]"
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <motion.div
          className="text-ieeenavy/90 text-base sm:text-lg md:text-lg leading-relaxed space-y-4 sm:space-y-6"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {text && (
            <p className="text-base sm:text-lg font-medium text-ieeenavy">{text}</p>
          )}
          <div className="border-l-4 border-white pl-3 sm:pl-4">
            <div className="leading-relaxed text-white">{detailedText}</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function AboutUsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* Hero Section */}
      <section className="pt-24 md:pt-36 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 text-white leading-tight"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
          >
            About IEEE ISET Bizerte
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed text-white px-2 sm:px-0"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
          >
            Empowering the next generation of engineers and innovators through technology,
            leadership, and community impact
          </motion.p>
        </div>
      </section>

      {/* Alternating Sections */}
      {sections.map((section) => (
        <AlternatingSection key={section.id} {...section} />
      ))}

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto py-6 md:py-10 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-ieeeblue to-ieeecyan rounded-3xl p-6 sm:p-8 text-white"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-ieeeblue  [text-shadow:0_0_2px_white,0_0_4px_white,0_0_6px_white]">Our Mission</h3>
            <p className="text-base sm:text-lg leading-relaxed">
              To foster a collaborative environment where students can develop technical excellence,
              leadership skills, and professional networks while advancing technology for humanity's benefit.
              We strive to bridge academic learning with real-world applications through innovative projects,
              knowledge sharing, and community engagement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-ieeenavy to-gray-800 rounded-3xl p-6 sm:p-8 text-white"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-ieeeblue  [text-shadow:0_0_2px_white,0_0_4px_white,0_0_6px_white]">Our Vision</h3>
            <p className="text-base sm:text-lg leading-relaxed">
              To be the leading student branch in Tunisia, recognized for producing technologically
              competent, socially responsible engineers and innovators who drive positive change
              in their communities and contribute significantly to the global technology landscape.
            </p>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        .bg-ieeeblue { background-color: #00629B; }
        .bg-ieeecyan { background-color: #00C2F2; }
        .bg-ieeenavy { background-color: #1A2636; }
        .bg-ieeegold { background-color: #B8860B; }
        .text-ieeeblue { color: #00629B; }
        .text-ieeecyan { color: #00C2F2; }
        .text-ieeenavy { color: #1A2636; }
        .text-ieeegold { color: #B8860B; }
      `}</style>
    </div>
  );
}
