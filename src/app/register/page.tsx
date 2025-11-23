"use client";

import { Register } from "@/components/Register";
import { useGlobal } from "@/contexts/GlobalContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const { register } = useGlobal();
    const router = useRouter();

    return (
        <Register
            onRegister={register}
            onBackToLogin={() => router.push('/login')}
        />
    );
}
