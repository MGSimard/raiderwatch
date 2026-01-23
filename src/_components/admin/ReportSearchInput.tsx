import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { Button } from "@/_components/admin/ui/button";
import { Input } from "@/_components/admin/ui/input";

interface ReportSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function ReportSearchInput({ value, onChange, onClear }: ReportSearchInputProps) {
  const hasValue = value.trim().length > 0;

  return (
    <div className="relative flex items-center">
      <MagnifyingGlassIcon className="pointer-events-none absolute left-2 size-4 text-muted-foreground" aria-hidden />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by ID or Embark ID..."
        className="pl-7 pr-8 w-56"
        aria-label="Search reports"
      />
      {hasValue && (
        <Button variant="ghost" size="icon-xs" onClick={onClear} className="absolute right-1" aria-label="Clear search">
          <XIcon aria-hidden />
        </Button>
      )}
    </div>
  );
}
