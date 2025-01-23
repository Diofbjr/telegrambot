// src/lib/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '../../firebase';

/**
 * Função para cadastrar um novo usuário.
 */
export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Função para autenticar um usuário existente.
 */
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { 
      success: true, 
      user: userCredential.user,
      uid: userCredential.user.uid, // Adiciona o UID ao retorno
    };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Função para enviar email de redefinição de senha.
 */
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Função para fazer logout do usuário.
 */
export async function logout() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Função para verificar se o usuário está autenticado.
 */
export async function isUserAuthenticated() {
  return new Promise<boolean>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(!!user);
      unsubscribe();
    });
  });
}

/**
 * Função para recuperar o usuário atual.
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Função para observar mudanças no estado de autenticação.
 * Útil para atualizar a UI em tempo real.
 */
export function onAuthStateChangedListener(
  callback: (user: User | null) => void,
) {
  return onAuthStateChanged(auth, callback);
}