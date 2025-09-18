import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import toast from "react-hot-toast";

export function useLogout() {
  const location = useLocation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Sign out failed: ${response.status}`);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      window.location.href = location.pathname;
    },
    onError: (error: Error) => {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out. Please try again.", {
        position: "bottom-center",
      });
    },
  });
}
