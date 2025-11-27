import { z } from 'zod';

export const setNewPasswordSchema = z.object({
  oldPassword: z.string().nonempty('Old password is required'),
  newPassword: z.string()
    .min(8)
    .regex(/[0-9]/, 'Password must contain at least one digit')
    .regex(/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().nonempty('Confirm password is required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type SetNewPasswordSchema = z.infer<typeof setNewPasswordSchema>