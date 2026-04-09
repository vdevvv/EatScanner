import { z } from 'zod';

export const editProfileSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, 'Min 2 characters')
    .max(60, 'Max 60 characters')
    .regex(/^(?=.{2,60}$)[\p{L}]+(?:[\s'-][\p{L}]+)*$/u, 'Only letters, spaces, apostrophes and hyphens are allowed'),
  userName: z.string()
    .trim()
    .min(4, 'Min 4 characters')
    .max(12, 'Max 12 characters')
    .regex(/^[a-zA-Z0-9_]+(?: [a-zA-Z0-9_]+)*$/, 'Only letters, numbers, underscores and single spaces are allowed'),
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, 'Invalid phone number'),
}).partial();

export type EditProfileSchema = z.infer<typeof editProfileSchema>
