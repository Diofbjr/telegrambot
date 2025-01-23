import { LoginForm } from "@/components/LoginForm/LoginForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <LoginForm />
        <p className="text-center">
          Não tem uma conta?{' '}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Cadastre-se
          </Link>
        </p>
        <p className="text-center">
          <Link
            href="/reset-password"
            className="text-blue-500 hover:underline"
          >
            Esqueci a senha
          </Link>
        </p>
      </div>
    </div>
  );
}
