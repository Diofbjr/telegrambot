interface AuthErrorProps {
    error: string;
  }
  
  export const AuthError = ({ error }: AuthErrorProps) => {
    if (!error) return null;
  
    return <p className="text-red-500">{error}</p>;
  };