const strapiEndpoint = import.meta.env.VITE_STRAPI_API_URL;

const API_URL = strapiEndpoint + "/api";

export async function registerUserApi({ username, email, password }) {
    try {
        const res = await fetch(`${API_URL}/auth/local/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error?.message || "Erreur inconnue");

        return data; // contient l'utilisateur créé
    } catch (error) {
        throw new Error(error.message);
    }
}
