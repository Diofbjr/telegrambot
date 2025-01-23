'use client';

import { useState } from 'react';
import { resetPassword } from '@/lib/auth';
import { AuthCard } from './AuthCard';
import { AuthInput } from './AuthInput';
import { AuthMessage } from './AuthMessage';
import { Button } from '../ui/button';
import Link from 'next/link';

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const result = await resetPassword(email);

    if (result.success) {
      setSuccessMessage('Email de redefinição de senha enviado com sucesso!');
    } else {
      setError(result.error || 'Erro ao enviar email de redefinição de senha.');
    }
  };

  return (
    <AuthCard title="Recuperar Senha">
      <form onSubmit={handleResetPassword} className="space-y-4">
        <AuthInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthMessage type="error" message={error} />
        <AuthMessage type="success" message={successMessage} />
        <Button type="submit">Enviar Email</Button>
        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-blue-500 hover:underline">
            Voltar para o Login
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};