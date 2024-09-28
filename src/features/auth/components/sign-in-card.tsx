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

interface SignInCardProps {
  setState(state: SignInFlow): void;
}

export function SignInCard({ setState }: SignInCardProps) {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);
    signIn('password', { email, password, flow: "signIn" })
      .catch(() => {
        setError('E-mail ou senha inválido(s)');
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignIn = (value: 'google' | 'facebook') => {
    setPending(true);
    signIn(value)
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className="w-full h-full p-8 animate-rotateY">
      <CardHeader className="px-0 pt-0 animate-rotateY">
        <CardTitle>
          Faça o login para continuar
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

      <CardContent className="space-y-5 px-0 pb-0 animate-rotateY">
        <form onSubmit={onPasswordSignIn} className="space-y-2.5">
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

          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continuar
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn('google')}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue com Google
          </Button>

          <Button
            disabled={pending}
            onClick={() => onProviderSignIn('facebook')}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaFacebook className="size-5 absolute top-3 left-2.5 text-blue-600" />
            Continue com Facebook
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Não tem uma conta? <span onClick={() => setState('signUp')} className="hover:text-sky-700 hover:underline cursor-pointer">Clique aqui, e comece sua jornada</span>
        </p>
      </CardContent>
    </Card>
  );
}
