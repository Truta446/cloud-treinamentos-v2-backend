import { z } from 'zod';

const AddressSchema = z
  .object({
    street: z.string().min(3, 'A rua deve ter pelo menos 3 caracteres'),
    number: z.string().min(1, 'O número não pode estar vazio'),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().min(2, 'A cidade deve ter pelo menos 2 caracteres'),
    state: z.string().min(2, 'O estado deve ter pelo menos 2 caracteres'),
    country: z.string().min(2, 'O país deve ter pelo menos 2 caracteres'),
    postalCode: z
      .string()
      .min(8, 'O CEP deve ter 8 caracteres')
      .max(8, 'O CEP deve ter 8 caracteres'),
  })
  .optional();

export const CreateUserSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'O telefone deve ter pelo menos 10 dígitos'),
  address: AddressSchema,
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
