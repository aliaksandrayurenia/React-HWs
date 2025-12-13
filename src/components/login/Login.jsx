import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import styles from "./Login.module.css";
import Button from '../button/Button';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const redirectTo = location.state?.from || "/order";

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate(redirectTo, { replace: true });
        } catch (err) {
        setError(err.message);
        }
    };

    const onCancel = () => {
        setEmail("");
        setPassword("");
        setError("");
    };

    return (
        <section className={styles.login}>
        <h1 className={styles.title}>Log in</h1>

        <div className={styles.card}>
            <form onSubmit={onSubmit}>
            <div className={styles.row}>
                <label className={styles.label}>User name</label>
                <input
                className={styles.input}
                placeholder="test@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                />
            </div>

            <div className={styles.row}>
                <label className={styles.label}>Password</label>
                <input
                className={styles.input}
                placeholder="123456"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                />
            </div>

            <div className={styles.actions}>
                <Button type="submit" className={styles.submit}>
                    Submit
                </Button>

                <Button type="button" className={styles.cancel}>
                    Cancel
                </Button>
            </div>

            </form>

            {error && <p className={styles.error}>{error}</p>}
        </div>
        </section>
    );
}
