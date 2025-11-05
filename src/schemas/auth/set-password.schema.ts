import {z} from "zod";

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8)
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  accepted: z.boolean().refine((val) => val, {
    message: "Accept the terms and privacy policy",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type PasswordSchema = z.infer<typeof passwordSchema>