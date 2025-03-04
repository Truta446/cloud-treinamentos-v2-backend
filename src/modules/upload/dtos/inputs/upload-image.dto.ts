import { z } from 'zod';

export const UploadImageSchema = z.object({
  file: z.string(),
});

export type UploadImageDto = z.infer<typeof UploadImageSchema>;
