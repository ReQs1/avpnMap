import { MapPin, Pizza, Search, Star, Trophy, Users } from "lucide-react";
import type { LoginFeatureType, NotFoundFeatureCard } from "@/lib/types";

export const naplesCoordinates = {
  lat: 40.85177510196397,
  lon: 14.267890739411412,
};

export const LOGIN_FEATURES: LoginFeatureType[] = [
  {
    icon: MapPin,
    mainColor: "#ef4444",
    bgColor: "bg-red-100",
    text: "Global Map",
    subText: "Explore pizzerias worldwide",
  },
  {
    icon: Star,
    mainColor: "#eab308",
    bgColor: "bg-yellow-100",
    text: "Rate & Review",
    subText: "Share your experiences",
  },
  {
    icon: Trophy,
    mainColor: "#8b5cf6",
    bgColor: "bg-purple-100",
    text: "Achievements",
    subText: "Unlock pizza milestones",
  },
  {
    icon: Users,
    mainColor: "#22c55e",
    bgColor: "bg-green-100",
    text: "Community",
    subText: "Connect with pizza lovers",
  },
];

export const NOT_FOUND_FEATURES: NotFoundFeatureCard[] = [
  {
    icon: MapPin,
    iconColorClass: "text-red-500",
    bgColorClass: "bg-red-500/10",
    gradientClass: "to-red-500/10",
    hoverBgClass: "group-hover:bg-red-500/20",
    title: "Explore Map",
    description: "Discover AVPN pizzerias worldwide",
    to: "/map",
  },
  {
    icon: Search,
    iconColorClass: "text-green-500",
    bgColorClass: "bg-green-500/10",
    gradientClass: "to-green-500/10",
    hoverBgClass: "group-hover:bg-green-500/20",
    title: "Find Users",
    description: "Connect with pizza enthusiasts",
    to: "/",
  },
  {
    icon: Pizza,
    iconColorClass: "text-blue-500",
    bgColorClass: "bg-blue-500/10",
    gradientClass: "to-blue-500/10",
    hoverBgClass: "group-hover:bg-blue-500/20",
    title: "Start Tracking",
    description: "Begin your pizza journey",
    to: "/login",
  },
];
