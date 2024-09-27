import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { SignInFlow } from "../types";

interface SignUpCardProps {
  setState(state: SignInFlow): void;
}

export function SignUpCard({ setState }: SignUpCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>
          Entre para continuar
        </CardTitle>

        <CardDescription>
          Use seu e-mail ou outro serviço para continuar
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            required
          />

          <Input
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
            required
          />

          <Input
            disabled={false}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
            type="password"
            required
          />

          <Button type="submit" className="w-full" size="lg" disabled={false}>
            Continuar
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={false}
            onClick={() => {}}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue com Google
          </Button>

          <Button
            disabled={false}
            onClick={() => {}}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaFacebook className="size-5 absolute top-3 left-2.5" />
            Continue com Facebook
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Já tem uma conta? <span onClick={() => setState('signIn')} className="text-sky-700 hover:underline cursor-pointer">Clique aqui, e continue sua jornada</span>
        </p>
      </CardContent>
    </Card>
  );
}
