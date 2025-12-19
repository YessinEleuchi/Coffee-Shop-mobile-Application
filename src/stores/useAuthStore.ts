import { create } from "zustand";

type AuthState = {
    login: string;
    password: string;

    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;

    setLogin: (v: string) => void;
    setPassword: (v: string) => void;

    submit: () => Promise<boolean>;
    reset: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
    login: "",
    password: "",

    isLoading: false,
    error: null,
    isAuthenticated: false,

    setLogin: (v) => set({ login: v, error: null }),
    setPassword: (v) => set({ password: v, error: null }),

    reset: () => set({ login: "", password: "", isLoading: false, error: null }),

    submit: async () => {
        const { login, password } = get();

        if (!login.trim() || !password.trim()) {
            set({ error: "Login et mot de passe sont obligatoires." });
            return false;
        }

        set({ isLoading: true, error: null });

        try {
            // ✅ Remplace par ton API (axios/fetch)
            await new Promise((r) => setTimeout(r, 700));

            // fake rule (juste pour tester)
            if (password.length < 4) throw new Error("Identifiants invalides.");

            set({ isAuthenticated: true, isLoading: false });
            return true;
        } catch (e: any) {
            set({ isLoading: false, error: e?.message ?? "Erreur de connexion." });
            return false;
        }
    },
}));
