import { ForgotPassword } from "../../components/ForgotPassword";

interface PageProps {
    onBack: () => void;
}

export default function ForgotPasswordPage({ onBack }: PageProps) {
    return <ForgotPassword onBack={onBack} />;
}
