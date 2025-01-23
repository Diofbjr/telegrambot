'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth';
import { Button } from '../ui/button';
import { AuthCard } from './AuthCard';
import { AuthInput } from './AuthInput';
import { PasswordRequirements } from './PasswordRequirements';

export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const passwordRequirements = validatePassword(password, confirmPassword);
    const isPasswordValid = passwordRequirements.every((req) => req.isValid);

    if (!isPasswordValid) {
      setError('Por favor, atenda a todos os requisitos da senha.');
      return;
    }

    const result = await signUp(email, password);

    if (result.success) {
      router.push('/home');
    } else {
      setError(result.error || 'Erro ao criar conta. Tente novamente.');
    }
  };

  const validatePassword = (password: string, confirmPassword: string) => {
    return [
      {
        text: 'Ter mais de 8 caracteres',
        isValid: password.length >= 8,
      },
      {
        text: 'Ter pelo menos 1 caractere especial',
        isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      },
      {
        text: 'Ter pelo menos 1 letra maiúscula',
        isValid: /[A-Z]/.test(password),
      },
      {
        text: 'As senhas coincidem',
        isValid: password === confirmPassword && password !== '',
      },
    ];
  };

  const passwordRequirements = validatePassword(password, confirmPassword);

  return (
    <AuthCard title="Criar Conta">
      <form onSubmit={handleSignUp} className="space-y-4">
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
        <AuthInput
          id="confirmPassword"
          label="Confirmar Senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <PasswordRequirements requirements={passwordRequirements} />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Criar Conta</Button>
      </form>
    </AuthCard>
  );
};