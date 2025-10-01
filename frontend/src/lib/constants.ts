import { MapPin, Star, Trophy, Users } from "lucide-react";
import type { FeaturesType } from "@/lib/types";

export const naplesCoordinates = {
  lat: 40.85177510196397,
  lon: 14.267890739411412,
};

export const LOGIN_FEATURES: FeaturesType[] = [
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
