import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
        setUser(u);
        setLoading(false);
        });

        return () => unsub();
    }, []);

    if (loading) return <p style={{ padding: 24 }}>Loading...</p>;

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return children;
}
