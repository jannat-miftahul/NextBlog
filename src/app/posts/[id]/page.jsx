"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    ArrowRight,
    Bookmark,
    Calendar,
    Clock,
    Heart,
    MessageSquare,
    Share2,
    User,
    Eye,
    ThumbsUp,
    Send,
} from "lucide-react";

// Category options
const categories = ["Technology", "Lifestyle", "Travel", "Design", "Development", "Business"];

// Deterministic functions using post ID to avoid hydration mismatch
const getCategoryByIndex = (postId) => categories[postId % categories.length];
const getReadTimeByIndex = (postId) => (postId % 6) + 5;
const getViewsByIndex = (postId) => ((postId * 137) % 4500) + 500;
const getLikesByIndex = (postId) => ((postId * 23) % 180) + 20;
const getDateByIndex = (postId) => {
    // Use static month names to avoid Date object hydration issues
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const month = months[postId % 12];
    const day = (postId % 28) + 1;
    return `${month} ${day}, 2026`;
};

// Loading skeleton
function PostSkeleton() {
    return (
        <main className="min-h-screen">
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-900/10 via-blue-600/5 to-sky-400/10 border-b border-border/50">
                <div className="max-w-screen-lg mx-auto px-4 lg:px-8 py-16 lg:py-24">
                    <div className="space-y-6">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-3/4" />
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-48" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="max-w-screen-lg mx-auto px-4 lg:px-8 py-12">
                <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                    ))}
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </section>
        </main>
    );
}

// Author card component
function AuthorCard() {
    return (
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-700 to-sky-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        JD
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg">John Doe</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                            Senior Developer & Technical Writer
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Passionate about building great software and sharing knowledge
                            with the developer community.
                        </p>
                        <Button
                            size="sm"
                            className="mt-4 bg-gradient-to-r from-blue-700 to-sky-500 text-white"
                        >
                            Follow
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Related post card
function RelatedPostCard({ id }) {
    return (
        <Card className="group bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all hover:-translate-y-1">
            <div className="h-24 bg-gradient-to-br from-blue-500/10 to-sky-500/10" />
            <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
                    Related Article Title {id}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <CardDescription className="text-xs line-clamp-2">
                    A brief description of this related article that readers might find
                    interesting.
                </CardDescription>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>5 min read</span>
                </div>
            </CardContent>
        </Card>
    );
}

// Comment component
function Comment({ name, text, time }) {
    return (
        <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center text-white font-semibold flex-shrink-0">
                {name[0]}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{name}</span>
                    <span className="text-xs text-muted-foreground">{time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{text}</p>
                <div className="flex items-center gap-4 mt-2">
                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        Like
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        Reply
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    // Generate consistent values based on post ID
    const postId = parseInt(id) || 1;
    const postMeta = {
        category: getCategoryByIndex(postId),
        readTime: getReadTimeByIndex(postId),
        views: getViewsByIndex(postId),
        likes: getLikesByIndex(postId),
        date: getDateByIndex(postId),
    };

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                const res = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${id}`
                );
                const data = await res.json();
                setPost(data);
                setLoading(false);
            };

            fetchPost();
        }
    }, [id]);

    if (loading || !post) {
        return <PostSkeleton />;
    }

    // Generate extended body content
    const extendedBody = `${post.body}\n\n${post.body}\n\nThis is additional content to make the article more comprehensive. The original post body has been extended to demonstrate a full article layout with proper paragraphs and sections.\n\n${post.body}`;

    return (
        <main className="min-h-screen">
            {/* Hero Header */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-900/10 via-blue-600/5 to-sky-400/10 border-b border-border/50">
                {/* Animated orbs */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-20 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl" />

                <div className="relative max-w-screen-lg mx-auto px-4 lg:px-8 py-12 lg:py-20">
                    {/* Back button */}
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="mb-6 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                    >
                        <Link href="/articles">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Articles
                        </Link>
                    </Button>

                    {/* Category & Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <Badge className="bg-gradient-to-r from-blue-700 to-sky-500 text-white border-0">
                            {postMeta.category}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {postMeta.readTime} min read
                            </span>
                            <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {postMeta.views.toLocaleString()} views
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 capitalize">
                        {post.title}
                    </h1>

                    {/* Author & Date */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-700 to-sky-500 flex items-center justify-center text-white font-bold">
                                JD
                            </div>
                            <div>
                                <p className="font-semibold">John Doe</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>{postMeta.date}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setLiked(!liked)}
                                className={liked ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/20" : ""}
                            >
                                <Heart className={`w-4 h-4 mr-1 ${liked ? "fill-current" : ""}`} />
                                {postMeta.likes + (liked ? 1 : 0)}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSaved(!saved)}
                                className={saved ? "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/20" : ""}
                            >
                                <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
                            </Button>
                            <Button variant="outline" size="sm">
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="max-w-screen-lg mx-auto px-4 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-2 prose prose-lg dark:prose-invert max-w-none">
                        {/* Featured image placeholder */}
                        <div className="h-64 md:h-80 rounded-xl bg-gradient-to-br from-blue-500/10 to-sky-500/10 mb-8 flex items-center justify-center">
                            <span className="text-muted-foreground">Featured Image</span>
                        </div>

                        {/* Article body */}
                        <div className="space-y-6 text-muted-foreground leading-relaxed">
                            {extendedBody.split("\n\n").map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t border-border">
                            {["Next.js", "React", "Web Development", "Tutorial"].map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Share & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 p-6 rounded-xl bg-muted/50">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Share this article:</span>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setLiked(!liked)}
                                    className={liked ? "bg-rose-50 border-rose-200 text-rose-600" : ""}
                                >
                                    <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                                    {liked ? "Liked" : "Like"}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSaved(!saved)}
                                    className={saved ? "bg-blue-50 border-blue-200 text-blue-600" : ""}
                                >
                                    <Bookmark className={`w-4 h-4 mr-2 ${saved ? "fill-current" : ""}`} />
                                    {saved ? "Saved" : "Save"}
                                </Button>
                            </div>
                        </div>

                        <Separator className="my-12" />

                        {/* Author Card */}
                        <AuthorCard />

                        <Separator className="my-12" />

                        {/* Comments Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" />
                                Comments (3)
                            </h3>

                            {/* Comment Form */}
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div className="flex-1 relative">
                                    <textarea
                                        placeholder="Write a comment..."
                                        className="w-full min-h-[100px] p-4 rounded-xl border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                                    />
                                    <Button
                                        size="sm"
                                        className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-700 to-sky-500 text-white"
                                    >
                                        <Send className="w-4 h-4 mr-2" />
                                        Post
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            {/* Comments List */}
                            <div className="space-y-6">
                                <Comment
                                    name="Sarah Wilson"
                                    text="Great article! This really helped me understand the concepts better. Looking forward to more content like this."
                                    time="2 hours ago"
                                />
                                <Separator />
                                <Comment
                                    name="Michael Chen"
                                    text="Thanks for sharing this. I've been looking for a clear explanation on this topic."
                                    time="5 hours ago"
                                />
                                <Separator />
                                <Comment
                                    name="Emily Davis"
                                    text="Very well written! The examples are particularly helpful."
                                    time="1 day ago"
                                />
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Sticky container */}
                        <div className="lg:sticky lg:top-8 space-y-6">
                            {/* Table of Contents */}
                            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">Table of Contents</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {["Introduction", "Key Concepts", "Implementation", "Examples", "Conclusion"].map(
                                        (item, index) => (
                                            <button
                                                key={item}
                                                className="block w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 pl-3 border-l-2 border-border hover:border-blue-500"
                                            >
                                                {index + 1}. {item}
                                            </button>
                                        )
                                    )}
                                </CardContent>
                            </Card>

                            {/* Related Posts */}
                            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">Related Articles</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <Link
                                            key={i}
                                            href={`/posts/${Number(id) + i}`}
                                            className="block group"
                                        >
                                            <div className="flex gap-3">
                                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500/10 to-sky-500/10 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                        Related Article Title {i}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        5 min read
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Newsletter CTA */}
                            <Card className="bg-gradient-to-br from-blue-700 to-sky-500 text-white border-0">
                                <CardContent className="pt-6 text-center">
                                    <h3 className="font-semibold text-lg mb-2">
                                        Stay Updated
                                    </h3>
                                    <p className="text-white/80 text-sm mb-4">
                                        Get the latest articles delivered to your inbox.
                                    </p>
                                    <Button
                                        variant="secondary"
                                        className="w-full bg-white text-blue-700 hover:bg-white/90"
                                    >
                                        Subscribe
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>
                </div>

                {/* Post Navigation */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-16 pt-8 border-t border-border">
                    {Number(id) > 1 && (
                        <Button asChild variant="outline" className="flex-1 justify-start">
                            <Link href={`/posts/${Number(id) - 1}`}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                <div className="text-left">
                                    <span className="text-xs text-muted-foreground block">Previous</span>
                                    <span className="text-sm">Previous Article</span>
                                </div>
                            </Link>
                        </Button>
                    )}
                    <Button asChild variant="outline" className="flex-1 justify-end">
                        <Link href={`/posts/${Number(id) + 1}`}>
                            <div className="text-right">
                                <span className="text-xs text-muted-foreground block">Next</span>
                                <span className="text-sm">Next Article</span>
                            </div>
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
