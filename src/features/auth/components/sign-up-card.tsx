import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";

import { useAuthActions } from "@convex-dev/auth/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { SignInFlow } from "../types";

interface SignUpCardProps {
  setState(state: SignInFlow): void;
}

export function SignUpCard({ setState }: SignUpCardProps) {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const handleClick = () => {
    setState('signIn');
  };

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Senhas não se conhecidem');
      return;
    }

    setPending(true);
    signIn('password', { email, password, flow: "signUp" })
      .catch(() => {
        setError('Ocorreu um erro ao criar sua conta');
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignUp = (value: 'google' | 'facebook') => {
    setPending(true);
    signIn(value)
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className="w-full h-full p-8 animate-rotateY">
      <CardHeader className="px-0 pt-0">
        <CardTitle>
          Entre para continuar
        </CardTitle>

        <CardDescription>
          Use seu e-mail ou outro serviço para continuar
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            required
          />

          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
            required
          />

          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
            type="password"
            required
          />

          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continuar
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => onProviderSignUp('google')}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue com Google
          </Button>

          <Button
            disabled={pending}
            onClick={() => onProviderSignUp('facebook')}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaFacebook className="size-5 absolute top-3 left-2.5" />
            Continue com Facebook
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Já tem uma conta? <span onClick={handleClick} className="text-sky-700 hover:underline cursor-pointer">Clique aqui, e continue sua jornada</span>
        </p>
      </CardContent>
    </Card>
  );
}
