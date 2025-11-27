import { z } from 'zod';

export const editProfileSchema = z.object({
  fullName: z.string().min(4, 'Min 4 characters'),
  userName: z.string()
    .min(4, 'Min 4 characters')
    .max(12, 'Max 12 characters')
    .regex(/^[a-zA-Z0-9_]+$/),
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, 'Invalid phone number'),
}).partial();

export type EditProfileSchema = z.infer<typeof editProfileSchema>