"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, BookOpen, Clock, Sparkles, TrendingUp, Users } from "lucide-react";

// Category badges for posts
const categories = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Design",
    "Development",
    "Business",
];

// Deterministic functions using post ID to avoid hydration mismatch
const getCategoryByIndex = (postId) =>
    categories[postId % categories.length];

const getReadTimeByIndex = (postId) =>
    (postId % 8) + 3; // Returns 3-10 minutes

// Loading skeleton component
function PostSkeleton() {
    return (
        <Card className="overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-muted to-muted/50" />
            <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-2/3 mt-2" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-28" />
            </CardFooter>
        </Card>
    );
}

// Hero section component
function HeroSection() {
    return (
        <section className="relative overflow-hidden min-h-[90vh] flex items-center">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMWgzOHYzOEgxVjF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />

            {/* Animated gradient orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-3xl animate-pulse delay-700" />
            <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Floating decorative elements */}
            <div className="absolute top-32 right-[15%] hidden lg:block animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-64 h-40 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 transform rotate-6 shadow-2xl">
                    <div className="flex gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 bg-white/20 rounded w-3/4" />
                        <div className="h-2 bg-white/15 rounded w-full" />
                        <div className="h-2 bg-white/10 rounded w-5/6" />
                        <div className="h-2 bg-white/10 rounded w-2/3" />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-32 left-[10%] hidden lg:block animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="w-48 h-32 bg-gradient-to-br from-blue-600/20 to-sky-500/20 backdrop-blur-sm rounded-xl border border-white/10 p-4 transform -rotate-6 shadow-2xl">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-sky-400" />
                        <div className="h-2 bg-white/30 rounded w-16" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="h-1.5 bg-white/15 rounded w-full" />
                        <div className="h-1.5 bg-white/10 rounded w-4/5" />
                    </div>
                </div>
            </div>

            {/* Floating icons */}
            <div className="absolute top-[20%] left-[20%] hidden lg:flex w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-xl items-center justify-center border border-white/10 animate-float">
                <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <div className="absolute bottom-[30%] right-[20%] hidden lg:flex w-10 h-10 bg-sky-500/20 backdrop-blur-sm rounded-lg items-center justify-center border border-white/10 animate-float" style={{ animationDelay: '1s' }}>
                <TrendingUp className="w-5 h-5 text-sky-400" />
            </div>

            <div className="relative max-w-screen-xl mx-auto px-4 lg:px-8 py-20 lg:py-32">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    {/* Main heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                        Write, Share &{" "}
                        <span className="relative">
                            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                                Inspire
                            </span>
                            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                                <path d="M2 10C50 4 150 4 198 10" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                                        <stop stopColor="#60A5FA" />
                                        <stop offset="0.5" stopColor="#38BDF8" />
                                        <stop offset="1" stopColor="#22D3EE" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="max-w-xl mx-auto text-lg md:text-xl text-blue-100/70 leading-relaxed">
                        Join thousands of writers sharing their stories. Create beautiful blog posts,
                        build your audience, and connect with readers who care.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <Button size="lg" className="group bg-white text-slate-900 hover:bg-blue-100 shadow-lg shadow-white/10 text-base px-8" asChild>
                            <Link href="/articles">
                                <BookOpen className="w-5 h-5 mr-2" />
                                Explore Articles
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 backdrop-blur-sm text-base px-8">
                            <Users className="w-5 h-5 mr-2" />
                            Start Writing
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 lg:gap-16 pt-12">
                        {[
                            { label: "Published Articles", value: "500+", icon: BookOpen },
                            { label: "Active Readers", value: "50K+", icon: Users },
                            { label: "Topics Covered", value: "25+", icon: TrendingUp },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center group">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <stat.icon className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                                    <p className="text-3xl lg:text-4xl font-bold text-white">
                                        {stat.value}
                                    </p>
                                </div>
                                <p className="text-sm text-blue-200/60">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Trusted by section */}
                    <div className="pt-12 border-t border-white/10 mt-12">
                        <p className="text-sm text-blue-200/50 mb-6">Trusted by writers from</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
                            {["Google", "Microsoft", "Amazon", "Meta", "Netflix"].map((company) => (
                                <span key={company} className="text-white/70 font-semibold text-lg">
                                    {company}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-background" />
                </svg>
            </div>
        </section>
    );
}

// Blog post card component
function PostCard({ post, index }) {
    const category = getCategoryByIndex(post.id);
    const readTime = getReadTimeByIndex(post.id);

    // Gradient variations for cards
    const gradients = [
        "from-violet-500/10 to-purple-500/10",
        "from-blue-500/10 to-cyan-500/10",
        "from-rose-500/10 to-pink-500/10",
        "from-amber-500/10 to-orange-500/10",
        "from-emerald-500/10 to-teal-500/10",
        "from-indigo-500/10 to-violet-500/10",
    ];

    return (
        <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2">
            {/* Card header gradient */}
            <div
                className={`h-40 bg-gradient-to-br ${gradients[index % gradients.length]} relative overflow-hidden`}
            >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                <div className="absolute bottom-4 left-4">
                    <Badge
                        variant="secondary"
                        className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    >
                        {category}
                    </Badge>
                </div>
                {index < 3 && (
                    <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-blue-700 to-sky-500 text-white border-0">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                        </Badge>
                    </div>
                )}
            </div>

            <CardHeader className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{readTime} min read</span>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors capitalize">
                    {post.title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <CardDescription className="line-clamp-3 text-muted-foreground/80">
                    {post.body}
                </CardDescription>
            </CardContent>

            <Separator className="mx-6" />

            <CardFooter className="pt-4">
                <Button
                    asChild
                    variant="ghost"
                    className="group/btn w-full justify-between hover:bg-primary/5"
                >
                    <Link href={`/posts/${post.id}`}>
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(
                "https://jsonplaceholder.typicode.com/posts"
            );
            const data = await res.json();
            setPosts(data.slice(0, 9)); // Limit to 9 posts for 3x3 grid
            setLoading(false);
        };

        fetchPosts();
    }, []);

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <HeroSection />

            {/* Featured Posts Section */}
            <section className="max-w-screen-xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
                {/* Section header */}
                <div className="text-center space-y-4 mb-12">
                    <Badge variant="outline" className="px-4 py-1.5">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Featured Articles
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Latest from the Blog
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground">
                        Explore our curated collection of articles covering technology,
                        design, lifestyle, and more.
                    </p>
                </div>

                {/* Posts grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {loading
                        ? Array.from({ length: 9 }).map((_, i) => (
                            <PostSkeleton key={i} />
                        ))
                        : posts.map((post, index) => (
                            <PostCard key={post.id} post={post} index={index} />
                        ))}
                </div>

                {/* Load more button */}
                <div className="text-center mt-12">
                    <Button
                        size="lg"
                        variant="outline"
                        className="group border-primary/20 hover:bg-primary/5"
                        asChild
                    >
                        <Link href="/articles">
                            View All Articles
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-900/5 via-blue-500/5 to-sky-400/5 border-y border-border/50">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />

                <div className="relative max-w-screen-xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <Badge variant="outline" className="px-4 py-1.5">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Stay Updated
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Subscribe to Our Newsletter
                        </h2>
                        <p className="text-muted-foreground">
                            Get the latest articles delivered straight to your inbox. No spam,
                            just quality content.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                            />
                            <Button className="bg-gradient-to-r from-blue-700 to-sky-500 hover:from-blue-800 hover:to-sky-600 text-white shadow-lg shadow-blue-500/25">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
