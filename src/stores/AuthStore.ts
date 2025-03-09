import {createStore} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

interface AuthStoreObj {
    loggedIn: boolean;
    token: string | null;
    user: UserObj | null;

    saveCredentials(user: UserObj, token: string): void;

    clearCredentials(): void;
}

const AuthStore = createStore<AuthStoreObj>()(
    persist((set, get) => ({
            loggedIn: false,
            token: null,
            user: null,
            saveCredentials: (user, token) => {
                set(prev => ({...prev, token: token, user: user, loggedIn: true}));
            },
            clearCredentials: () => {
                set(prev => ({...prev, token: null, user: null, loggedIn: false}));
            },
        }),
        {
            name: "auth-store",
            storage: createJSONStorage(() => localStorage),
        }
    ),
)

export default AuthStore;

