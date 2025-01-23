import { Button } from "../ui/button";


interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export const LoadingButton = ({ isLoading, children, type = 'submit' }: LoadingButtonProps) => {
  return (
    <Button type={type} disabled={isLoading}>
      {isLoading ? 'Carregando...' : children}
    </Button>
  );
};