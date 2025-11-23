import { Register } from "../../components/Register";

interface RegisterPageProps {
  onRegister: (email: string, password: string, name: string, studentId: string) => void;
  onBackToLogin: () => void;
}

export default function RegisterPage({ onRegister, onBackToLogin }: RegisterPageProps) {
  return (
    <Register
      onRegister={onRegister}
      onBackToLogin={onBackToLogin}
    />
  );
}
