"use client";

import React, { useState, useEffect } from "react";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Menu, X, Home, BookOpen, User, LogIn, LogOut, ChevronDown, PenTool } from "lucide-react";

// Custom Blog Logo Component
const BlogLogo = () => (
    <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
    >
        {/* Background */}
        <rect width="40" height="40" rx="10" className="fill-[url(#logo-gradient)]" />

        {/* Book/Page shape */}
        <path
            d="M10 12C10 10.8954 10.8954 10 12 10H28C29.1046 10 30 10.8954 30 12V28C30 29.1046 29.1046 30 28 30H12C10.8954 30 10 29.1046 10 28V12Z"
            fill="white"
            fillOpacity="0.2"
        />

        {/* Page lines */}
        <rect x="14" y="14" width="12" height="2" rx="1" fill="white" fillOpacity="0.9" />
        <rect x="14" y="18" width="10" height="2" rx="1" fill="white" fillOpacity="0.7" />
        <rect x="14" y="22" width="8" height="2" rx="1" fill="white" fillOpacity="0.5" />

        {/* Pen/Quill accent */}
        <path
            d="M26 26L30 22L32 24L28 28L26 28V26Z"
            fill="white"
            fillOpacity="0.9"
        />

        {/* Gradient definition */}
        <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1E40AF" />
                <stop offset="0.5" stopColor="#0284C7" />
                <stop offset="1" stopColor="#0EA5E9" />
            </linearGradient>
        </defs>
    </svg>
);

const Navbar = () => {
    const { isAuthenticated, user } = useKindeAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Home", icon: Home },
        { href: "/articles", label: "Articles", icon: BookOpen },
    ];

    // Check if link is active
    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname?.startsWith(href);
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm"
                : "bg-transparent"
                }`}
        >
            <nav className="max-w-screen-xl mx-auto px-4 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="transition-transform duration-300 group-hover:scale-105">
                            <BlogLogo />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400 bg-clip-text text-transparent leading-tight">
                                NextBlog
                            </span>
                            <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase hidden sm:block">
                                Write • Share • Inspire
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center gap-1">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-muted-foreground hover:text-foreground"
                                        } hover:bg-muted/50`}
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.label}
                                    {active && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                                    )}
                                </Link>
                            );
                        })}

                        {isAuthenticated ? (
                            <Link
                                href="/profile"
                                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/profile")
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-muted-foreground hover:text-foreground"
                                    } hover:bg-muted/50`}
                            >
                                <User className="w-4 h-4" />
                                Profile
                                {isActive("/profile") && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                                )}
                            </Link>
                        ) : (
                            <LoginLink
                                postLoginRedirectURL="/profile"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            >
                                <User className="w-4 h-4" />
                                Profile
                            </LoginLink>
                        )}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="gap-2 border-border/50 hover:bg-muted/50"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-700 to-sky-500 flex items-center justify-center shadow-inner overflow-hidden">
                                            {user?.picture ? (
                                                <img
                                                    src={user.picture}
                                                    alt={user.given_name || "User"}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <User className="w-4 h-4 text-white" />
                                            )}
                                        </div>
                                        My Account
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer">
                                            <User className="w-4 h-4 mr-2" />
                                            View Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <PenTool className="w-4 h-4 mr-2" />
                                        Write Article
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <LogoutLink className="cursor-pointer w-full text-red-600 hover:text-red-600">
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign Out
                                        </LogoutLink>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <LoginLink postLoginRedirectURL="/">
                                    <Button
                                        variant="ghost"
                                        className="text-muted-foreground hover:text-foreground gap-2"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        Sign In
                                    </Button>
                                </LoginLink>
                                <RegisterLink postLoginRedirectURL="/">
                                    <Button className="bg-gradient-to-r from-blue-700 to-sky-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all duration-200 gap-2">
                                        <PenTool className="w-4 h-4" />
                                        Start Writing
                                    </Button>
                                </RegisterLink>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className="w-5 h-4 flex flex-col justify-between">
                            <span
                                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                                    }`}
                            />
                            <span
                                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                                    }`}
                            />
                            <span
                                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                                    }`}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
                        ? "max-h-[500px] opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-4"
                        } overflow-hidden`}
                >
                    <div className="flex flex-col gap-1 pt-4 pb-6 border-t border-border/50">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active
                                            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20"
                                            : "text-muted-foreground hover:text-foreground"
                                        } hover:bg-muted/50`}
                                >
                                    {active && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 dark:bg-blue-400 rounded-r-full" />
                                    )}
                                    <link.icon className="w-5 h-5" />
                                    {link.label}
                                </Link>
                            );
                        })}

                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive("/profile")
                                            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20"
                                            : "text-muted-foreground hover:text-foreground"
                                        } hover:bg-muted/50`}
                                >
                                    {isActive("/profile") && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 dark:bg-blue-400 rounded-r-full" />
                                    )}
                                    <User className="w-5 h-5" />
                                    My Profile
                                </Link>
                                <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-left">
                                    <PenTool className="w-5 h-5" />
                                    Write Article
                                </button>
                                <div className="border-t border-border/50 my-2" />
                                <LogoutLink
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </LogoutLink>
                            </>
                        ) : (
                            <>
                                <LoginLink
                                    postLoginRedirectURL="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                    Profile
                                </LoginLink>
                                <div className="border-t border-border/50 my-2" />
                                <div className="grid grid-cols-2 gap-3 px-4 pt-2">
                                    <LoginLink postLoginRedirectURL="/">
                                        <Button variant="outline" className="w-full gap-2">
                                            <LogIn className="w-4 h-4" />
                                            Sign In
                                        </Button>
                                    </LoginLink>
                                    <RegisterLink postLoginRedirectURL="/">
                                        <Button className="w-full bg-gradient-to-r from-blue-700 to-sky-500 text-white gap-2">
                                            <PenTool className="w-4 h-4" />
                                            Sign Up
                                        </Button>
                                    </RegisterLink>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
