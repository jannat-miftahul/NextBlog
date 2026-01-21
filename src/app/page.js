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
                        <Link href="/blogs">
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
