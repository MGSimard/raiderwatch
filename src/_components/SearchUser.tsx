import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/_components/ui/button";
import { Field, FieldError, FieldLabel } from "@/_components/ui/field";
import { Input } from "@/_components/ui/input";

export function SearchUser() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const embarkId = value.trim();
    const [username, discriminator] = embarkId.split("#");

    if (!username || !discriminator || !embarkId.includes("#")) {
      setError("Invalid Embark ID. (e.g. username#1234)");
      return;
    }

    if (!/^[a-zA-Z0-9\-_.]+$/.test(username)) {
      setError("Usernames can only contain letters, numbers, and symbols: - _ .");
      return;
    }

    if (!/^\d{4}$/.test(discriminator)) {
      setError("Discriminator must be exactly 4 digits.");
      return;
    }

    void navigate({ to: `/r/${embarkId.replace("#", "~")}` });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) setError(null);
  };

  const isEmpty = value.trim().length === 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-row w-full">
      <Field className="flex-1" data-invalid={!!error}>
        <FieldLabel htmlFor="search-embark-id" className="sr-only">
          Embark ID <span className="text-muted-foreground text-xs italic">(username#1234)</span>
        </FieldLabel>
        <Input
          id="search-embark-id"
          name="search-embark-id"
          placeholder="username#1234"
          aria-invalid={!!error}
          value={value}
          onChange={handleChange}
          autoComplete="off"
          autoFocus // eslint-disable-line no-autofocus
          required
        />
        {error && <FieldError>{error}</FieldError>}
      </Field>
      <Button type="submit" variant="outline" size="icon" disabled={isEmpty}>
        <MagnifyingGlassIcon className="size-4" aria-hidden />
      </Button>
    </form>
  );
}
