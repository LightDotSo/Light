import { z } from "zod";

export const ensResolveNameQueryQuerySchema = z.object({
  name: z.string(),
});

export const ensResolveNameQuerySchema = z.object({
  domains: z.array(
    z.object({
      name: z.string(),
      resolvedAddress: z.object({
        id: z.string(),
      }),
    }),
  ),
});

export type EnsResolveNameQuery = z.infer<typeof ensResolveNameQuerySchema>;
