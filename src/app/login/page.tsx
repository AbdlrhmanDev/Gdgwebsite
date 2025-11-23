import { Login } from "../../components/Login";

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
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
