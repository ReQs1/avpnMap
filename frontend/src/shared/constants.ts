import { MapPin, Pizza, Search, Star, Trophy, Users } from "lucide-react";
import type { LoginFeatureType } from "@/features/login/types/login.types";
import type { NotFoundFeatureCard } from "@/features/not-found/types/not-found.types";

export const naplesCoordinates = {
  lat: 40.85177510196397,
  lon: 14.267890739411412,
};

export const LOGIN_FEATURES: LoginFeatureType[] = [
  {
    icon: MapPin,
    iconColorClass: "text-red-500",
    darkIconColorClass: "text-red-500",
    bgColorClass: "bg-red-100",
    darkBgColorClass: "bg-red-500/8",
    text: "Global Map",
    subText: "Explore pizzerias worldwide",
  },
  {
    icon: Star,
    iconColorClass: "text-yellow-500",
    darkIconColorClass: "text-amber-400",
    bgColorClass: "bg-yellow-100",
    darkBgColorClass: "bg-amber-400/8",
    text: "Rate & Review",
    subText: "Share your experiences",
  },
  {
    icon: Trophy,
    iconColorClass: "text-purple-500",
    darkIconColorClass: "text-violet-400",
    bgColorClass: "bg-purple-100",
    darkBgColorClass: "bg-violet-400/8",
    text: "Achievements",
    subText: "Unlock pizza milestones",
  },
  {
    icon: Users,
    iconColorClass: "text-green-500",
    darkIconColorClass: "text-green-500",
    bgColorClass: "bg-green-100",
    darkBgColorClass: "bg-green-500/8",
    text: "Community",
    subText: "Connect with pizza lovers",
  },
];

export const NOT_FOUND_FEATURES: NotFoundFeatureCard[] = [
  {
    icon: MapPin,
    iconColorClass: "text-red-500",
    darkIconColorClass: "text-red-500",
    bgColorClass: "bg-red-500/10",
    darkBgColorClass: "bg-red-500/8",
    gradientClass: "to-red-500/10",
    hoverBgClass: "group-hover:bg-red-500/20",
    darkHoverBgClass: "group-hover:bg-red-500/15",
    title: "Explore Map",
    description: "Discover AVPN pizzerias worldwide",
    to: "/map",
  },
  {
    icon: Search,
    iconColorClass: "text-green-500",
    darkIconColorClass: "text-green-500",
    bgColorClass: "bg-green-500/10",
    darkBgColorClass: "bg-green-500/8",
    gradientClass: "to-green-500/10",
    hoverBgClass: "group-hover:bg-green-500/20",
    darkHoverBgClass: "group-hover:bg-green-500/15",
    title: "Find Users",
    description: "Connect with pizza enthusiasts",
    to: "/",
  },
  {
    icon: Pizza,
    iconColorClass: "text-blue-500",
    darkIconColorClass: "text-blue-500",
    bgColorClass: "bg-blue-500/10",
    darkBgColorClass: "bg-blue-500/8",
    gradientClass: "to-blue-500/10",
    hoverBgClass: "group-hover:bg-blue-500/20",
    darkHoverBgClass: "group-hover:bg-blue-500/15",
    title: "Start Tracking",
    description: "Begin your pizza journey",
    to: "/login",
  },
];
