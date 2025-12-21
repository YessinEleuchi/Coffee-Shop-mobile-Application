import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiGetAuth, apiPost } from "../lib/api";
import type { LoginResponse, User } from "../lib/types";

const TOKEN_KEY = "token";

type AuthStore = {
    login: string;
    password: string;

    token: string | null;
    user: User | null;
    isHydrated: boolean;

    isLoading: boolean;
    error: string | null;

    setLogin: (v: string) => void;
    setPassword: (v: string) => void;

    hydrate: () => Promise<void>;
    logout: () => Promise<void>;

    submit: () => Promise<boolean>;
    fetchMe: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
    login: "",
    password: "",

    token: null,
    user: null,
    isHydrated: false,

    isLoading: false,
    error: null,

    setLogin: (v) => set({ login: v, error: null }),
    setPassword: (v) => set({ password: v, error: null }),

    hydrate: async () => {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        set({ token, isHydrated: true });

        if (token) {
            try {
                await get().fetchMe();
            } catch (e) {
                // token invalid / me failed => logout clean
                await get().logout();
            }
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
        set({ token: null, user: null });
    },

    fetchMe: async () => {
        const token = get().token;
        if (!token) return;

        // ✅ protected
        const me = await apiGetAuth<User>("/users/me", token);
        set({ user: me });
    },

    submit: async () => {
        const { login, password } = get();

        if (!login || !password) {
            set({ error: "Email et mot de passe sont obligatoires." });
            return false;
        }

        try {
            set({ isLoading: true, error: null });

            // ✅ public
            const data = await apiPost<LoginResponse>("/auth/login", {
                email: login,
                password,
            });

            await AsyncStorage.setItem(TOKEN_KEY, data.token);
            set({ token: data.token });

            // ✅ get user
            await get().fetchMe();

            set({ isLoading: false });
            return true;
        } catch (e: any) {
            set({ isLoading: false, error: e?.message || "Erreur de connexion" });
            return false;
        }
    },
}));
