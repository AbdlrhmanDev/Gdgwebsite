import { Login } from "../../components/Login";
import { type UserRole } from "../../App";

interface LoginPageProps {
  onLogin: (email: string, password: string, role: UserRole) => void;
  onRegisterClick: () => void;
}

export default function LoginPage({ onLogin, onRegisterClick }: LoginPageProps) {
  return (
    <Login
      onLogin={onLogin}
      onRegister={onRegisterClick}
    />
  );
}
