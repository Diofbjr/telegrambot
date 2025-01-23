import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Variável 'auth' que será exportada
let app: FirebaseApp;
let auth: Auth | undefined;

// Inicialize o Firebase apenas no lado do cliente
if (typeof window !== 'undefined') {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}

// Exportação da variável 'auth' (garantindo que ela só seja exportada uma vez)
export { auth };
