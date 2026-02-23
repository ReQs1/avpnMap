import { useAuth } from "@/features/auth/hooks/useAuth";
import { WifiOff } from "lucide-react";

export default function ApiStatusIndicator() {
  const { error } = useAuth();

  if (!error) return null;

  return (
    <div
      className="flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-red-600"
      title="Server unavailable"
      role="status"
      aria-label="Server connection error"
    >
      <WifiOff size={16} aria-hidden="true" />
      <span className="hidden text-xs font-medium sm:inline">Offline</span>
    </div>
  );
}
