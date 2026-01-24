"use client";

import { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
    User, Mail, Calendar, Settings, Bell, BookOpen, Heart, MessageSquare,
    TrendingUp, Edit3, LogOut, Shield, Camera
} from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

// Stats data
const stats = [
    { label: "Articles Read", value: "24", icon: BookOpen, color: "text-blue-500" },
    { label: "Saved Posts", value: "12", icon: Heart, color: "text-rose-500" },
    { label: "Comments", value: "8", icon: MessageSquare, color: "text-emerald-500" },
    { label: "This Week", value: "+5", icon: TrendingUp, color: "text-amber-500" },
];

// Quick actions
const quickActions = [
    { label: "Edit Profile", icon: Edit3, href: "#" },
    { label: "Notifications", icon: Bell, href: "#", badge: "3" },
    { label: "Privacy", icon: Shield, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
];

// Loading skeleton
function ProfileSkeleton() {
    return (
        <div className="space-y-8">
            {/* Header skeleton */}
            <div className="text-center space-y-4">
                <Skeleton className="w-32 h-32 rounded-full mx-auto" />
                <Skeleton className="h-8 w-48 mx-auto" />
                <Skeleton className="h-4 w-64 mx-auto" />
            </div>
            {/* Stats skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 rounded-xl" />
                ))}
            </div>
        </div>
    );
}

export default function Profile() {
    const { getUser } = useKindeAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await getUser();
                setProfile(user);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile information:", error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, [getUser]);

    if (loading) {
        return (
            <main className="min-h-screen">
                <section className="relative overflow-hidden bg-gradient-to-br from-blue-900/10 via-blue-600/5 to-sky-400/10">
                    <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-16">
                        <ProfileSkeleton />
                    </div>
                </section>
            </main>
        );
    }

    if (!profile) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <Card className="max-w-md w-full mx-4">
                    <CardHeader className="text-center">
                        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-red-500" />
                        </div>
                        <CardTitle>Unable to Load Profile</CardTitle>
                        <CardDescription>
                            We couldn&apos;t load your profile information. Please try again.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Button
                            onClick={() => window.location.reload()}
                            className="bg-gradient-to-r from-blue-700 to-sky-500 text-white"
                        >
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            {/* Hero Header with Profile Info */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-900/10 via-blue-600/5 to-sky-400/10 border-b border-border/50">
                {/* Animated orbs */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

                <div className="relative max-w-screen-xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
                    <div className="text-center space-y-6">
                        {/* Profile Picture */}
                        <div className="relative inline-block">
                            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-background shadow-xl shadow-blue-500/20">
                                {profile.picture ? (
                                    <img
                                        src={profile.picture}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-700 to-sky-500 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-white">
                                            {profile.given_name?.[0] || "U"}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-background border-2 border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors">
                                <Camera className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Name & Badge */}
                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-4xl font-bold">
                                {profile.given_name} {profile.family_name}
                            </h1>
                            <Badge
                                variant="outline"
                                className="px-4 py-1.5 bg-gradient-to-r from-blue-700 to-sky-500 text-white border-0"
                            >
                                <User className="w-4 h-4 mr-2" />
                                Member
                            </Badge>
                        </div>

                        {/* Email */}
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span>{profile.email}</span>
                        </div>

                        {/* Join date placeholder */}
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>Joined January 2026</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-center gap-3 pt-4">
                            <Button className="bg-gradient-to-r from-blue-700 to-sky-500 text-white shadow-lg shadow-blue-500/25">
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit Profile
                            </Button>
                            <Button variant="outline" className="backdrop-blur-sm" asChild>
                                <LogoutLink>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign Out
                                </LogoutLink>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="max-w-screen-xl mx-auto px-4 lg:px-8 -mt-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <Card
                            key={stat.label}
                            className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                        >
                            <CardContent className="pt-6 text-center">
                                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Quick Actions & Activity */}
            <section className="max-w-screen-xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quick Actions */}
                    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                        <CardHeader>
                            <CardTitle className="text-xl">Quick Actions</CardTitle>
                            <CardDescription>
                                Manage your account settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {quickActions.map((action) => (
                                <Button
                                    key={action.label}
                                    variant="ghost"
                                    className="w-full justify-between hover:bg-blue-50 dark:hover:bg-blue-950/20"
                                >
                                    <span className="flex items-center gap-3">
                                        <action.icon className="w-5 h-5 text-muted-foreground" />
                                        {action.label}
                                    </span>
                                    {action.badge && (
                                        <Badge className="bg-gradient-to-r from-blue-700 to-sky-500 text-white border-0 text-xs">
                                            {action.badge}
                                        </Badge>
                                    )}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm border-border/50">
                        <CardHeader>
                            <CardTitle className="text-xl">Recent Activity</CardTitle>
                            <CardDescription>
                                Your reading history and interactions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        action: "Read article",
                                        title: "Getting Started with Next.js 15",
                                        time: "2 hours ago",
                                        icon: BookOpen,
                                    },
                                    {
                                        action: "Saved post",
                                        title: "Advanced TypeScript Patterns",
                                        time: "Yesterday",
                                        icon: Heart,
                                    },
                                    {
                                        action: "Commented on",
                                        title: "Building Responsive UIs with Tailwind",
                                        time: "2 days ago",
                                        icon: MessageSquare,
                                    },
                                    {
                                        action: "Read article",
                                        title: "Modern State Management in React",
                                        time: "3 days ago",
                                        icon: BookOpen,
                                    },
                                ].map((item, index) => (
                                    <div key={index}>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                                                <item.icon className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-muted-foreground">
                                                    {item.action}
                                                </p>
                                                <p className="font-medium truncate">{item.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.time}
                                                </p>
                                            </div>
                                        </div>
                                        {index < 3 && <Separator className="mt-4" />}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Saved Articles Teaser */}
            <section className="bg-gradient-to-br from-blue-900/5 via-blue-500/5 to-sky-400/5 border-y border-border/50">
                <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
                    <div className="text-center space-y-4 mb-8">
                        <Badge variant="outline" className="px-4 py-1.5">
                            <Heart className="w-4 h-4 mr-2" />
                            Your Collection
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold">Saved Articles</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Quick access to articles you&apos;ve saved for later reading.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <Card
                                key={i}
                                className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all hover:-translate-y-1"
                            >
                                <div className="h-24 bg-gradient-to-br from-blue-500/10 to-sky-500/10" />
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg line-clamp-1">
                                        Sample Saved Article {i}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="line-clamp-2">
                                        This is a preview of one of your saved articles that
                                        you can read anytime.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Button
                            variant="outline"
                            className="border-blue-500/20 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                        >
                            View All Saved Articles
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
