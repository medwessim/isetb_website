"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';



const IEEEContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
    };

    const socialLinks = [
        {
            name: 'Facebook',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                    <path d="M7 10.2222V13.7778H9.66667V20H13.2222V13.7778H15.8889L16.7778 10.2222H13.2222V8.44444C13.2222 8.2087 13.3159 7.9826 13.4826 7.81591C13.6493 7.64921 13.8754 7.55556 14.1111 7.55556H16.7778V4H14.1111C12.9324 4 11.8019 4.46825 10.9684 5.30175C10.1349 6.13524 9.66667 7.2657 9.66667 8.44444V10.2222H7Z" />
                </svg>
            ),
            url: 'https://www.facebook.com/profile.php?id=61550723499159',
            handle: '@ieeeisetbizerte'
        },
        {
            name: 'LinkedIn',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                    <path d="M15.2 8.80005C16.4731 8.80005 17.694 9.30576 18.5941 10.2059C19.4943 11.1061 20 12.327 20 13.6V19.2H16.8V13.6C16.8 13.1757 16.6315 12.7687 16.3314 12.4687C16.0313 12.1686 15.6244 12 15.2 12C14.7757 12 14.3687 12.1686 14.0687 12.4687C13.7686 12.7687 13.6 13.1757 13.6 13.6V19.2H10.4V13.6C10.4 12.327 10.9057 11.1061 11.8059 10.2059C12.7061 9.30576 13.927 8.80005 15.2 8.80005Z" />
                    <path d="M7.2 9.6001H4V19.2001H7.2V9.6001Z" />
                    <path d="M5.6 7.2C6.48366 7.2 7.2 6.48366 7.2 5.6C7.2 4.71634 6.48366 4 5.6 4C4.71634 4 4 4.71634 4 5.6C4 6.48366 4.71634 7.2 5.6 7.2Z" />
                </svg>
            ),
            url: 'https://www.linkedin.com/company/ieee-iset-bizerte-student-branch',
            handle: '@ieee-iset-bizerte'
        },
        {
            name: 'Instagram',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                    <path d="M11.9294 7.72275C9.65868 7.72275 7.82715 9.55428 7.82715 11.825C7.82715 14.0956 9.65868 15.9271 11.9294 15.9271C14.2 15.9271 16.0316 14.0956 16.0316 11.825C16.0316 9.55428 14.2 7.72275 11.9294 7.72275ZM11.9294 14.4919C10.462 14.4919 9.26239 13.2959 9.26239 11.825C9.26239 10.354 10.4584 9.15799 11.9294 9.15799C13.4003 9.15799 14.5963 10.354 14.5963 11.825C14.5963 13.2959 13.3967 14.4919 11.9294 14.4919ZM17.1562 7.55495C17.1562 8.08692 16.7277 8.51178 16.1994 8.51178C15.6674 8.51178 15.2425 8.08335 15.2425 7.55495C15.2425 7.02656 15.671 6.59813 16.1994 6.59813C16.7277 6.59813 17.1562 7.02656 17.1562 7.55495ZM19.8731 8.52606C19.8124 7.24434 19.5197 6.10901 18.5807 5.17361C17.6453 4.23821 16.51 3.94545 15.2282 3.88118C13.9073 3.80621 9.94787 3.80621 8.62689 3.88118C7.34874 3.94188 6.21341 4.23464 5.27444 5.17004C4.33547 6.10544 4.04628 7.24077 3.98201 8.52249C3.90704 9.84347 3.90704 13.8029 3.98201 15.1238C4.04271 16.4056 4.33547 17.5409 5.27444 18.4763C6.21341 19.4117 7.34517 19.7045 8.62689 19.7687C9.94787 19.8437 13.9073 19.8437 15.2282 19.7687C16.51 19.708 17.6453 19.4153 18.5807 18.4763C19.5161 17.5409 19.8089 16.4056 19.8731 15.1238C19.9481 13.8029 19.9481 9.84704 19.8731 8.52606ZM18.1665 16.5412C17.8881 17.241 17.349 17.7801 16.6456 18.0621C15.5924 18.4799 13.0932 18.3835 11.9294 18.3835C10.7655 18.3835 8.26272 18.4763 7.21307 18.0621C6.51331 17.7837 5.9742 17.2446 5.69215 16.5412C5.27444 15.488 5.37083 12.9888 5.37083 11.825C5.37083 10.6611 5.27801 8.15832 5.69215 7.10867C5.97063 6.40891 6.50974 5.8698 7.21307 5.58775C8.26629 5.17004 10.7655 5.26643 11.9294 5.26643C13.0932 5.26643 15.596 5.17361 16.6456 5.58775C17.3454 5.86623 17.8845 6.40534 18.1665 7.10867C18.5843 8.16189 18.4879 10.6611 18.4879 11.825C18.4879 12.9888 18.5843 15.4916 18.1665 16.5412Z" />
                </svg>
            ),
            url: 'https://www.instagram.com/ieee_iset_bizerte_sb/',
            handle: '@ieee_iset_bizerte'
        },
        {
            name: 'Email',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
            ),
            url: 'mailto:isetb@ieee.tn',
            handle: 'isetb@ieee.tn'
        }
    ];

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Visit Us',
            description: 'ISET Bizerte, Mezel Abed Rahman 7021, Bizerte, Tunisia'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: 'Call Us',
            description: '+216 72 590 566'
        },
        {
            icon: (
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
            ),
            title: 'Email',
            description: 'isetb@ieee.tn'
        },

    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen relative">
            {/* Votre GradientBackground sera ici */}

          
            <div className="relative z-10">
               <div className="container px-6 py-12 mx-auto md:px-8 lg:px-12 xl:px-24 lg:py-16">

                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                    </motion.div>

                    <motion.div
                        className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Left Content */}
                        <motion.div
                            className="space-y-8 text-white"
                            variants={itemVariants}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h1 className="text-4xl lg:text-5xl  leading-tight">
                                    Join The
                                    <span className="block font-semibold ">
                                        Innovation Revolution
                                    </span>
                                </h1>

                                <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                                    Welcome to IEEE ISET Bizerte Student Branch - where technology meets innovation.

                                </p>
                            </motion.div>

                            {/* Contact Info Cards */}
                            <motion.div
                                className="space-y-4"
                                variants={itemVariants}
                            >
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={info.title}
                                        className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
                                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                    >
                                        <div className="text-blue-400">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white/80">{info.title}</h3>
                                            <p className="text-white text-sm">{info.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Social Links */}
                            <motion.div
                                className="pt-6 border-t border-gray-700/50"
                                variants={itemVariants}
                            >
                                <h3 className="text-sm font-semibold text-black uppercase tracking-wider mb-4">
                                    Connect With Us
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 + index * 0.1 }}
                                        >
                                            <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                                                {social.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{social.name}</p>

                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            className="relative"
                            variants={itemVariants}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 lg:p-10 border border-white/20 shadow-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-blue-600/10 rounded-2xl" />

                                <div className="relative z-10">
                                    <motion.h2
                                        className="text-2xl lg:text-3xl font-semibold text-white mb-2"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        Get In Touch
                                    </motion.h2>

                                    <motion.p
                                        className="text-gray-300 mb-8"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        Interested in joining IEEE or collaborating on projects? We'd love to hear from you!
                                    </motion.p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.8 }}
                                        >
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your full name"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                required
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.9 }}
                                        >
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="your.email@gmail.com"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                required
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.0 }}
                                        >
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows="5"
                                                placeholder="Tell us about your interest in IEEE or your project idea..."
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                                required
                                            />
                                        </motion.div>

                                        <motion.button
                                            type="submit"
                                            whileHover={{
                                                scale: 1.02,
                                                boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.5)"
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-4 px-6 bg-gradient-to-r from-red-500 to-blue-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.1 }}
                                        >
                                            Send Message
                                        </motion.button>
                                    </form>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Location Map Section */}
                    <motion.div
                        className="mt-20"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-4">Find Us at ISET Bizerte</h2>
                            <p className="text-gray-300 max-w-2xl mx-auto">
                                Visit our student branch located at the Institute of Science and Technology of Bizerte
                            </p>
                        </div>

                        <motion.div
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid lg:grid-cols-3 gap-6 items-center">
                                <div className="lg:col-span-1 space-y-4 text-white">
                                    <h3 className="text-xl font-semibold mb-4">ISET Bizerte Campus</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            <span className="text-sm">Mezel Abed Rahman 7021, Bizerte, Tunisia</span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            <span className="text-sm">Main Campus Building, Student Activities Floor</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="bg-gray-800 rounded-xl overflow-hidden h-64 lg:h-80 relative">
                                        {/* Google Maps Embed */}
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.093026220882!2d9.8857319!3d37.2349582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDE0JzA1LjgiTiA5wrA1My'wOC42IkU!5e0!3m2!1sen!2stn!4v1700000000000"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="ISET Bizerte Location"
                                            className="absolute inset-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
       
        </div>
    );
};

export default IEEEContactPage;