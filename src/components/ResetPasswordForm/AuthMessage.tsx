interface AuthMessageProps {
    type: 'error' | 'success';
    message: string;
  }
  
  export const AuthMessage = ({ type, message }: AuthMessageProps) => {
    if (!message) return null;
  
    return (
      <p className={`text-sm ${type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
        {message}
      </p>
    );
  };