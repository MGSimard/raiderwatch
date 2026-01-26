import { Button } from "@/_components/admin/ui/button";
import { Input } from "@/_components/admin/ui/input";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

interface ReportsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ReportsSearch({ value, onChange }: ReportsSearchProps) {
  const hasValue = value.trim().length > 0;

  return (
    <div className="relative flex items-center">
      <MagnifyingGlassIcon className="pointer-events-none absolute left-2 size-4 text-muted-foreground" aria-hidden />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by ID or Embark ID..."
        className="w-56 pr-8 pl-7"
        aria-label="Search reports"
      />
      {hasValue && (
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => onChange("")}
          className="absolute right-1"
          aria-label="Clear search">
          <XIcon aria-hidden />
        </Button>
      )}
    </div>
  );
}
