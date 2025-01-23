'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isUserAuthenticated, logout } from '@/lib/auth'; // Importe a função logout

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isUserAuthenticated();
      if (!authenticated) {
        router.push('/');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  // Função para fazer logout
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.push('/');
    } else {
      console.error('Erro ao fazer logout:', result.error);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>; // Componente de carregamento
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">ENTROU</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Sair
      </button>
    </div>
  );
}