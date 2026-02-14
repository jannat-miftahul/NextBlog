"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, BookOpen, Clock, Filter, Grid3X3, LayoutList, Search, TrendingUp } from "lucide-react";

// Category badges for posts
const categories = [
    "All",
    "Technology",
    "Lifestyle",
    "Travel",
    "Design",
    "Development",
    "Business",
];

// Deterministic functions using post ID to avoid hydration mismatch
const getCategoryByIndex = (postId) =>
    categories.slice(1)[postId % (categories.length - 1)];

const getReadTimeByIndex = (postId) =>
    (postId % 8) + 3;

// Loading skeleton component
function PostSkeleton() {
    return (
        <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-muted to-muted/50" />
            <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-2" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-28" />
            </CardFooter>
        </Card>
    );
}

// Blog post card component
function PostCard({ post, index }) {
    const category = getCategoryByIndex(post.id);
    const readTime = getReadTimeByIndex(post.id);

    const gradients = [
        "from-blue-500/10 to-sky-500/10",
        "from-emerald-500/10 to-teal-500/10",
        "from-amber-500/10 to-orange-500/10",
        "from-rose-500/10 to-pink-500/10",
        "from-indigo-500/10 to-violet-500/10",
        "from-cyan-500/10 to-blue-500/10",
    ];

    return (
        <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1">
            {/* Card header gradient */}
            <div
                className={`h-32 bg-gradient-to-br ${gradients[index % gradients.length]} relative overflow-hidden`}
            >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                <div className="absolute bottom-3 left-3">
                    <Badge
                        variant="secondary"
                        className="bg-background/80 backdrop-blur-sm text-xs"
                    >
                        {category}
                    </Badge>
                </div>
                {index < 3 && (
                    <div className="absolute top-3 right-3">
                        <Badge className="bg-gradient-to-r from-blue-700 to-sky-500 text-white border-0 text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                        </Badge>
                    </div>
                )}
            </div>

            <CardHeader className="space-y-2 pb-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{readTime} min read</span>
                </div>
                <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors capitalize">
                    {post.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
                <CardDescription className="line-clamp-2 text-sm text-muted-foreground/80">
                    {post.body}
                </CardDescription>
            </CardContent>

            <Separator className="mx-4" />

            <CardFooter className="pt-3 pb-4">
                <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="group/btn w-full justify-between hover:bg-blue-50 dark:hover:bg-blue-950/20"
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

export default function Blogs() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [viewMode, setViewMode] = useState("grid");

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(
                "https://jsonplaceholder.typicode.com/posts"
            );
            const data = await res.json();
            setPosts(data);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    // Filter posts based on search query
    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen">
            {/* Hero Header */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-900/10 via-blue-600/5 to-sky-400/10 border-b border-border/50">
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl" />

                <div className="relative max-w-screen-xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-blue-800 via-blue-500 to-sky-400 bg-clip-text text-transparent">
                                All Articles
                            </span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                            Explore our complete collection of articles covering technology,
                            design, lifestyle, and more. Find your next great read.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter & Content Section */}
            <section className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className={
                                    selectedCategory === category
                                        ? "bg-gradient-to-r from-blue-700 to-sky-500 text-white border-0"
                                        : "hover:bg-blue-50 dark:hover:bg-blue-950/20"
                                }
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    {/* View Toggle & Filter */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                            className="gap-2"
                        >
                            {viewMode === "grid" ? (
                                <>
                                    <LayoutList className="w-4 h-4" />
                                    List
                                </>
                            ) : (
                                <>
                                    <Grid3X3 className="w-4 h-4" />
                                    Grid
                                </>
                            )}
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="w-4 h-4" />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Results Count */}
                <p className="text-sm text-muted-foreground mb-6">
                    Showing <span className="font-semibold text-foreground">{filteredPosts.length}</span> articles
                </p>

                {/* Posts Grid */}
                <div
                    className={
                        viewMode === "grid"
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            : "flex flex-col gap-4"
                    }
                >
                    {loading
                        ? Array.from({ length: 12 }).map((_, i) => <PostSkeleton key={i} />)
                        : filteredPosts.map((post, index) => (
                            <PostCard key={post.id} post={post} index={index} />
                        ))}
                </div>

                {/* Empty State */}
                {!loading && filteredPosts.length === 0 && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search or filter to find what you&apos;re looking for.
                        </p>
                    </div>
                )}

                {/* Load More */}
                {!loading && filteredPosts.length > 0 && (
                    <div className="text-center mt-12">
                        <Button
                            size="lg"
                            variant="outline"
                            className="group border-blue-500/20 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                        >
                            Load More Articles
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                )}
            </section>
        </main>
    );
}
