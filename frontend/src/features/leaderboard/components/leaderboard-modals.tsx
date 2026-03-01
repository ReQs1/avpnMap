import { useLeaderboardModalStore } from "../store/leaderboard-modal-store";
import LeaderboardUserModal from "./leaderboard-user-modal";
import LeaderboardPizzeriaModal from "./leaderboard-pizzeria-modal";

export default function LeaderboardModals() {
  const modal = useLeaderboardModalStore((s) => s.modal);
  const close = useLeaderboardModalStore((s) => s.close);

  return (
    <>
      {modal?.type === "user" && (
        <LeaderboardUserModal isOpen onClose={close} user={modal.data} />
      )}

      {modal?.type === "pizzeria" && (
        <LeaderboardPizzeriaModal
          isOpen
          onClose={close}
          pizzeria={modal.data}
        />
      )}
    </>
  );
}
