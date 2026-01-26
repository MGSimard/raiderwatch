import type { searchFilterSchema } from "@/_lib/schemas";
import type { z } from "zod";

export type SearchFilters = z.infer<typeof searchFilterSchema>;
