import { create } from "zustand";

type User = {
	username: string | undefined;
	setUsername: (username: string) => void;
};

export const useUserStore = create<User>((set) => ({
	username: undefined,
	setUsername: (username: string) => set(() => ({ username })),
}));
