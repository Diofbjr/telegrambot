'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth';
import { AuthCard } from './AuthCard';
import { AuthInput } from './AuthInput';
import { AuthError } from './AuthError';
import { LoadingButton } from './LoadingButton';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn(email, password);

      if (result.success) {
        // Redireciona para a página home com o UID como parâmetro
        router.push(`/home?uid=${result.uid}`);
      } else {
        setError(result.error || 'Erro ao fazer login. Tente novamente.');
      }
    } catch {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard title="Login">
      <form onSubmit={handleLogin} className="space-y-4">
        <AuthInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthInput
          id="password"
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <AuthError error={error} />
        <LoadingButton isLoading={isLoading} type="submit">
          Entrar
        </LoadingButton>
      </form>
    </AuthCard>
  );
};