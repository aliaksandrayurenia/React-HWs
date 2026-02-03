import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase/firebase";

export type AuthContextValue = {
    user: User | null;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
    user: null,
    loading: true,
});

type AuthProviderProps = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
        setUser(u);
        setLoading(false);
        });

        return () => unsub();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
        {children}
        </AuthContext.Provider>
    );
}
