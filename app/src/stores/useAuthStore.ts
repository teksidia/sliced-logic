import { create } from 'zustand';

export interface ClientPrincipal {
    userId: string;
    userDetails: string;
    userRoles: string[];
    claims: { typ: string; val: string }[];
    identityProvider: string;
}

export interface Me {
    clientPrincipal: ClientPrincipal;
}

interface AuthState {
    user: Me | null;
    loading: boolean;
    hasChecked: boolean;
    checkAuth: () => Promise<void>;
    logout: () => void;
}

// see: https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-authorization



// npm install -g @azure/static-web-apps-cli
// nvm install 20.14.0
// nvm use 20.14.0
// swa start http://127.0.0.1:5173 --api-location http://127.0.0.1:5160


// curl -H "x-ms-client-principal: eyJ1c2VySWQiOiJmYWtlLXVzZXIiLCJ1c2VyRm9sZXMiOlsiYWRtaW4iXX0=" http://localhost:5160/api/hello
// curl -v http://localhost:5160/api/hello


export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    loading: false,
    hasChecked: false,

    checkAuth: async () => {
        if (get().user) return;

        set({ loading: true });

        try {
            const response = await fetch('/.auth/me', {
                method: 'GET',
                credentials: 'include', // Send HttpOnly cookie
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }

            const user = (await response.json()) as Me | null;

            if (!user?.clientPrincipal) {
                // Not authenticated - redirect to .NET challenge endpoint
                const frontendUrl = window.location.href;
                window.location.replace(`/.auth/login/aad?post_login_redirect_uri=${encodeURIComponent(frontendUrl)}`);
                return;
            }

            set({ user, loading: false, hasChecked: true });
        } catch (error) {
            console.error('Auth check failed:', error);
            set({ user: null, loading: false, hasChecked: true });
        }
    },

    logout: () => {
        set({ user: null, hasChecked: false });
        window.location.replace(`/.auth/logout`);
    },
}));
