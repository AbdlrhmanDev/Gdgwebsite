"use client";

import { Login } from "@/components/Login";
import { useGlobal } from "@/contexts/GlobalContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login } = useGlobal();
    const router = useRouter();

    return (
        <Login
            onLogin={login}
            onRegister={() => router.push('/register')}
        />
    );
}
