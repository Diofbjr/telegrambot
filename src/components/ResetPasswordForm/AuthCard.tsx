import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";


interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

export const AuthCard = ({ title, children }: AuthCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};