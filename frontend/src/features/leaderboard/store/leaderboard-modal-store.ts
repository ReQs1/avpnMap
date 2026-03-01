import { create } from "zustand";
import type {
  PizzeriaModalData,
  UserModalData,
} from "../types/leaderboard.types";

type ModalState =
  | { type: "user"; data: UserModalData }
  | { type: "pizzeria"; data: PizzeriaModalData }
  | null;

type LeaderboardModalStore = {
  modal: ModalState;
  openUserModal: (data: UserModalData) => void;
  openPizzeriaModal: (data: PizzeriaModalData) => void;
  close: () => void;
};

export const useLeaderboardModalStore = create<LeaderboardModalStore>(
  (set) => ({
    modal: null,
    openUserModal: (data) => set({ modal: { type: "user", data } }),
    openPizzeriaModal: (data) => set({ modal: { type: "pizzeria", data } }),
    close: () => set({ modal: null }),
  }),
);
