"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Heart, ArrowUp, BookOpen, Users, Rss, PenTool, TrendingUp, Coffee } from "lucide-react";

// Custom social icon components (since lucide deprecated brand icons)
const XIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const GitHubIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

// Custom Blog Logo Component (same as navbar)
const BlogLogo = () => (
    <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
    >
        <rect width="40" height="40" rx="10" className="fill-[url(#footer-logo-gradient)]" />
        <path
            d="M10 12C10 10.8954 10.8954 10 12 10H28C29.1046 10 30 10.8954 30 12V28C30 29.1046 29.1046 30 28 30H12C10.8954 30 10 29.1046 10 28V12Z"
            fill="white"
            fillOpacity="0.2"
        />
        <rect x="14" y="14" width="12" height="2" rx="1" fill="white" fillOpacity="0.9" />
        <rect x="14" y="18" width="10" height="2" rx="1" fill="white" fillOpacity="0.7" />
        <rect x="14" y="22" width="8" height="2" rx="1" fill="white" fillOpacity="0.5" />
        <path d="M26 26L30 22L32 24L28 28L26 28V26Z" fill="white" fillOpacity="0.9" />
        <defs>
            <linearGradient id="footer-logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1E40AF" />
                <stop offset="0.5" stopColor="#0284C7" />
                <stop offset="1" stopColor="#0EA5E9" />
            </linearGradient>
        </defs>
    </svg>
);

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        explore: [
            { label: "All Articles", href: "/blogs", icon: BookOpen },
            { label: "Trending", href: "#", icon: TrendingUp },
            { label: "Categories", href: "#", icon: PenTool },
            { label: "Authors", href: "#", icon: Users },
        ],
        categories: [
            { label: "Technology", href: "#" },
            { label: "Design", href: "#" },
            { label: "Development", href: "#" },
            { label: "Lifestyle", href: "#" },
        ],
        company: [
            { label: "About Us", href: "#" },
            { label: "Contact", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Privacy Policy", href: "#" },
        ],
    };

    const socialLinks = [
        { icon: XIcon, href: "https://twitter.com", label: "X (Twitter)", color: "hover:text-white" },
        { icon: GitHubIcon, href: "https://github.com", label: "GitHub", color: "hover:text-gray-300" },
        { icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-400" },
        { icon: Mail, href: "mailto:hello@nextblog.com", label: "Email", color: "hover:text-rose-400" },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-slate-900 text-white overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMWgzOHYzOEgxVjF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
            </div>

            <div className="relative max-w-screen-xl mx-auto px-4 lg:px-8">
                {/* Newsletter Section */}
                <div className="py-12 lg:py-16">
                    <div className="bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl p-8 lg:p-12 shadow-2xl shadow-blue-500/20 relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />

                        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="text-center lg:text-left">
                                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                                    <PenTool className="w-6 h-6 text-white/80" />
                                    <span className="text-white/80 font-medium">Newsletter</span>
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                    Never Miss a Story
                                </h3>
                                <p className="text-white/80 max-w-md">
                                    Get weekly handpicked articles, writing tips, and community updates
                                    delivered to your inbox.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 w-full sm:w-64 transition-all"
                                />
                                <Button className="bg-white text-blue-700 hover:bg-white/90 shadow-lg font-semibold px-6">
                                    <Rss className="w-4 h-4 mr-2" />
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Main Footer Content */}
                <div className="py-12 lg:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                        {/* Brand Column */}
                        <div className="lg:col-span-2 space-y-6">
                            <Link href="/" className="flex items-center gap-3 group">
                                <BlogLogo />
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-white leading-tight">
                                        NextBlog
                                    </span>
                                    <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase">
                                        Write • Share • Inspire
                                    </span>
                                </div>
                            </Link>
                            <p className="text-white/60 max-w-sm leading-relaxed">
                                A platform for writers, thinkers, and storytellers. Share your unique
                                perspective with readers who care about what you have to say.
                            </p>

                            {/* Stats */}
                            <div className="flex gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">500+</p>
                                        <p className="text-xs text-white/50">Articles</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-sky-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">50K+</p>
                                        <p className="text-xs text-white/50">Readers</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-2">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 ${social.color} transition-all`}
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Explore Column */}
                        <div>
                            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                Explore
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.explore.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                                        >
                                            <link.icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Categories Column */}
                        <div>
                            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-sky-500" />
                                Categories
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.categories.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-white/60 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div>
                            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                                Company
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-white/60 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Bottom Bar */}
                <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-white/50 text-center sm:text-left">
                        © {currentYear} NextBlog. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <p className="text-sm text-white/50 flex items-center gap-1.5">
                            Made with
                            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                            and
                            <Coffee className="w-4 h-4 text-amber-500" />
                        </p>

                        {/* Back to top button */}
                        <button
                            onClick={scrollToTop}
                            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all group"
                            aria-label="Back to top"
                        >
                            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
