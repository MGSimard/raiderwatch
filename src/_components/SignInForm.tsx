import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/_components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/_components/admin/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/_components/ui/field";
import { Input } from "@/_components/ui/input";
import { authClient } from "@/_auth/auth-client";

export function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Form cannot be empty.");
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Invalid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await authClient.signIn.email({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (response.error) {
        setError(response.error.message ?? "Invalid credentials.");
        setIsLoading(false);
        return;
      }

      void navigate({ to: "/dashboard" });
    } catch (err) {
      setError("An error occurred during authentication. View console for more details.");
      setIsLoading(false);
      console.error("Authentication error:", err);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(null);
  };

  return (
    <Card className="w-full max-w-sm relative">
      <CardHeader>
        <CardTitle>
          <h1>AUTHORIZATION</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                autoComplete="email"
                required
              />
            </Field>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="•••••••••••••••"
                disabled={isLoading}
                autoComplete="current-password"
                required
              />
            </Field>
            {error && (
              <Field>
                <FieldError>{error}</FieldError>
              </Field>
            )}
            <Field>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
