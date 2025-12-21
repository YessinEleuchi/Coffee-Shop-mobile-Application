import axios, { AxiosError } from "axios";

export const BASE_URL = "http://172.20.10.2:3000";

export const http = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
});

// Fonction utilitaire pour extraire un message d'erreur clair
function getErrorMessage(err: unknown): string {
    const e = err as AxiosError<any>;

    if (axios.isAxiosError(e)) {
        const data = e.response?.data;
        if (typeof data === "string") return data;
        if (data?.message) return String(data.message);
        if (data?.error) return String(data.error);
        return `HTTP ${e.response?.status ?? "unknown"}`.trim() || "Network error";
    }

    return (err as any)?.message || "Unknown error";
}

// ==================== PUBLIC ====================

/** GET public (sans auth) */
export async function apiGet<T>(path: string): Promise<T> {
    try {
        const res = await http.get<T>(path);
        return res.data;
    } catch (err) {
        throw new Error(getErrorMessage(err));
    }
}

/** POST public (sans auth) */
export async function apiPost<T>(path: string, body?: any, token?: string): Promise<T> {
    try {
        const res = await http.post<T>(path, body ?? {});
        return res.data;
    } catch (err) {
        throw new Error(getErrorMessage(err));
    }
}

// ==================== AUTHENTIFIÉES ====================

/** GET avec token */
export async function apiGetAuth<T>(path: string, token: string): Promise<T> {
    try {
        const res = await http.get<T>(path, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        throw new Error(getErrorMessage(err));
    }
}

/** POST avec token */
export async function apiPostAuth<T>(path: string, body: any, token: string): Promise<T> {
    try {
        const res = await http.post<T>(path, body ?? {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        throw new Error(getErrorMessage(err));
    }
}

/** PUT avec token (mise à jour complète) */
export async function apiPutAuth<T>(path: string, body: any, token: string): Promise<T> {
    try {
        const res = await http.put<T>(path, body ?? {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        throw new Error(getErrorMessage(err));
    }
}

/** DELETE avec token (et body optionnel) */
export async function apiDeleteAuth<T>(path: string, token: { ProduitId: string }, body?: any): Promise<T> {
    try {
        const res = await http.delete<T>(path, {
            headers: { Authorization: `Bearer ${token}` },
            data: body,
        });
        return res.data;
    } catch (err) {
        throw new Error(getErrorMessage(err));
    }
}