import { ResetPassword } from "../../components/ResetPassword";

interface PageProps {
    token: string;
    onSuccess: () => void;
}

export default function ResetPasswordPage({ token, onSuccess }: PageProps) {
    return <ResetPassword token={token} onSuccess={onSuccess} />;
}
