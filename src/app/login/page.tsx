import { Login } from "../../components/Login";

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onRegister: () => void;
  onForgotPassword: () => void;
}

export default function LoginPage({ onLogin, onRegister, onForgotPassword }: LoginPageProps) {
  return (
    <Login
      onLogin={onLogin}
      onRegister={onRegister}
      onForgotPassword={onForgotPassword}
    />
  );
}
