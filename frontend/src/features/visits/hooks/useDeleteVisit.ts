import { useAuth } from "@/features/auth/hooks/useAuth";
import { deleteVisit } from "@/features/visits/api/delete-visit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type UseDeleteVisitOptions = {
  onSuccess?: () => void;
};

export function useDeleteVisit(options?: UseDeleteVisitOptions) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (pizzeriaId: number) => deleteVisit(pizzeriaId),
    onSuccess: async () => {
      const invalidations = [
        queryClient.invalidateQueries({ queryKey: ["pizzerias"] }),
      ];
      if (user) {
        invalidations.push(
          queryClient.invalidateQueries({ queryKey: ["profile", user.id] }),
        );
      }
      await Promise.all(invalidations);
      options?.onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to delete visit. Please try again.", {
        position: "bottom-center",
      });
    },
  });
}
