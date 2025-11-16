// src/components/Inscription.ts
import { ref } from 'vue';
import { registerUserApi } from '../apis/InscriptionApi';

export const username = ref('');
export const email = ref('');
export const password = ref('');
export const confirmPassword = ref('');
export const message = ref('');

export async function registerUser() {
    if (password.value !== confirmPassword.value) {
        message.value = "❌ Les mots de passe ne correspondent pas.";
        return;
    }

    if (!username.value || !email.value || !password.value) {
        message.value = "⚠️ Tous les champs sont obligatoires.";
        return;
    }

    try {
        const data = await registerUserApi({
            username: username.value,
            email: email.value,
            password: password.value,
        });

        message.value = `✅ Inscription réussie ! Bienvenue ${data.user.username}`;
    } catch (error: any) {
        if (
            error.message.includes("Email") ||
            error.message.includes("Username")
        ) {
            message.value = "❌ Cet email ou nom d'utilisateur est déjà utilisé.";
        } else {
            message.value = "⚠️ Erreur : " + error.message;
        }
    }
}
