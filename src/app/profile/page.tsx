// app/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isUserAuthenticated, getCurrentUser } from '@/lib/auth';
import { saveProfileData } from '@/lib/firestore';
import { ProfileData } from '@/types/profile';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/Spinner/Spinner';
import Header from '@/components/Header/header';

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    photo: '',
    fullName: '',
    phone: '',
    cep: '',
    street: '',
    city: '',
    neighborhood: '',
    state: '',
    houseNumber: '',
    complement: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isUserAuthenticated();
      if (!authenticated) {
        router.push('/');
      } else {
        const user = getCurrentUser();
        if (user) {
          setUserEmail(user.email);
          // Aqui você pode carregar os dados do perfil do usuário, se existirem
        }
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Função para buscar dados do CEP na API dos Correios
  const fetchAddressByCEP = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setProfileData((prev) => ({
          ...prev,
          street: data.logradouro,
          city: data.localidade,
          neighborhood: data.bairro,
          state: data.uf,
        }));
      } else {
        alert('CEP não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Erro ao buscar CEP. Tente novamente.');
    }
  };

  // Função para lidar com mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));

    // Busca automática do endereço ao digitar o CEP
    if (name === 'cep' && value.length === 8) {
      fetchAddressByCEP(value);
    }
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getCurrentUser();
    if (user) {
      console.log('Usuário autenticado. UID:', user.uid);
      const result = await saveProfileData(user.uid, profileData);
      if (result.success) {
        alert('Perfil atualizado com sucesso!');
      } else {
        alert('Erro ao salvar perfil. Tente novamente.');
      }
    } else {
      alert('Usuário não autenticado.');
    }
  };

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
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <Card className="w-full max-w-5xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Meu Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {userEmail && (
              <p className="text-gray-700 mb-6">Email: {userEmail}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Foto de Perfil */}
              <div>
                <Label>Foto de Perfil</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {profileData.photo ? (
                      <Image
                        src={profileData.photo}
                        alt="Foto de Perfil"
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">Sem foto</span>
                    )}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setProfileData((prev) => ({
                            ...prev,
                            photo: reader.result as string,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Nome Completo e Número do Celular */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Nome Completo</Label>
                  <Input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Número do Celular</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* CEP e Número da Casa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>CEP</Label>
                  <Input
                    type="text"
                    name="cep"
                    value={profileData.cep}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Número da Casa</Label>
                  <Input
                    type="text"
                    name="houseNumber"
                    value={profileData.houseNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Rua e Complemento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Rua</Label>
                  <Input
                    type="text"
                    name="street"
                    value={profileData.street}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Complemento</Label>
                  <Input
                    type="text"
                    name="complement"
                    value={profileData.complement}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Cidade, Bairro e Estado */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Cidade</Label>
                  <Input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Bairro</Label>
                  <Input
                    type="text"
                    name="neighborhood"
                    value={profileData.neighborhood}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Estado</Label>
                  <Input
                    type="text"
                    name="state"
                    value={profileData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Botão de Enviar */}
              <Button type="submit" className="w-full">
                Salvar Perfil
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}