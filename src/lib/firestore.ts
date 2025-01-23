import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ProfileData } from '@/types/profile';

/**
 * Função para salvar os dados do perfil no Firestore.
 */
export async function saveProfileData(userId: string, profileData: ProfileData) {
  try {
    console.log('Tentando salvar perfil para o usuário:', userId);
    await setDoc(doc(db, 'profiles', userId), profileData, { merge: true });
    console.log('Perfil salvo com sucesso!');
    return { success: true };
  } catch (error) {
    console.error('Erro ao salvar perfil:', error);
    return { success: false, error: (error as Error).message };
  }
}