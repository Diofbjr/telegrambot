'use client';

import { useEffect, useState } from 'react';
import { useRouter} from 'next/navigation';
import { isUserAuthenticated } from '@/lib/auth';
import { Spinner } from '@/components/Spinner/Spinner';
import Header from '@/components/Header/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isUserAuthenticated();
      if (!authenticated) {
        router.push('/'); // Redireciona para a página inicial se não estiver autenticado
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Função para enviar código para o telefone
  const handlePhoneSubmit = () => {
    console.log('Enviando código para o telefone:', phone);
    // Adicione a lógica para enviar o código aqui
  };

  // Função para validar o código recebido
  const handleCodeSubmit = () => {
    console.log('Código inserido:', code);
    // Adicione a lógica para validar o código aqui
  };

  // Função para realizar login com a conta selecionada
  const handleAccountLogin = () => {
    console.log('Conta selecionada para login:', selectedAccount);
    // Adicione a lógica para realizar login com a conta selecionada aqui
  };

  // Exibe um spinner enquanto a autenticação está sendo verificada
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à Home</h1>

        {/* Menu de Login */}
        <div className="flex space-x-4">
          {/* Modal de Login com Conta */}
          <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Login com Conta</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Login com Conta</DialogTitle>
              <DialogDescription>Escolha sua conta para realizar o login.</DialogDescription>
              
              {/* Select para escolher a conta */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Escolha sua conta</label>
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conta1">Conta 1</SelectItem>
                    <SelectItem value="conta2">Conta 2</SelectItem>
                    <SelectItem value="conta3">Conta 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Botão para realizar login com a conta selecionada */}
              <Button onClick={handleAccountLogin} disabled={!selectedAccount} className="mt-4">
                Realizar Login
              </Button>

              <DialogFooter>
                <Button onClick={() => setIsLoginModalOpen(false)}>Fechar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal de Login via Telefone */}
          <Dialog open={isPhoneModalOpen} onOpenChange={setIsPhoneModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Novo Login</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Novo Login</DialogTitle>
              <DialogDescription>Digite seu número de telefone e envie o código.</DialogDescription>
              
              {/* Input para o telefone */}
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+5588977776666"
                className="mb-4"
              />
              <Button onClick={handlePhoneSubmit}>Enviar Código</Button>

              {/* Input para o código recebido */}
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Código"
                className="mt-4 mb-4"
              />
              <Button onClick={handleCodeSubmit}>Realizar Login</Button>

              <DialogFooter>
                <Button onClick={() => setIsPhoneModalOpen(false)}>Fechar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}