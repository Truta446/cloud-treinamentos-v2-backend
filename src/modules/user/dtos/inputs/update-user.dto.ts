import { z } from 'zod';

const UpdateAddressSchema = z
  .object({
    street: z.string().min(1, 'Rua é obrigatória').optional(),
    number: z.string().min(1, 'Número é obrigatório').optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().min(1, 'Cidade é obrigatória').optional(),
    state: z.string().min(1, 'Estado é obrigatório').optional(),
    country: z.string().min(1, 'País é obrigatório').optional(),
    postalCode: z.string().min(8, 'O CEP deve ter 8 caracteres').max(8, 'O CEP deve ter 8 caracteres').optional(),
  })
  .optional();

export const UpdateUserSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos').optional(),
  address: UpdateAddressSchema,
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
