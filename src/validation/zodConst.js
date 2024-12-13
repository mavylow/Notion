import { z } from "zod";
export const Note = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Do not leave empty field "),
  body: z
    .string()
    .trim()
    .min(1, "Do not leave empty field "),
});

export const UserLogin = z.object({
  login: z
    .string()
    .max(10, { message: "Login is too long" }),

  password: z
    .string()
    .min(8, {
      message:
        "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message:
        "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[^A-Za-z0-9]/, {
      message:
        "Password must contain at least one special character",
    }),
});
export const UserEmail = z.object({
  email: z.string().email({ message: "Put correct email" }),

  password: z
    .string()
    .min(8, {
      message:
        "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message:
        "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[^A-Za-z0-9]/, {
      message:
        "Password must contain at least one special character",
    }),
});

export const UserSignUp = z
  .object({
    login: z
      .string()
      .max(10, { message: "Login is too long" }),
    email: z
      .string()
      .email({ message: "Put correct email" }),
    password: z
      .string()
      .min(8, {
        message:
          "Password must be at least 8 characters long",
      })
      .regex(/[A-Z]/, {
        message:
          "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, {
        message:
          "Password must contain at least one number",
      })
      .regex(/[^A-Za-z0-9]/, {
        message:
          "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(8, {
      message:
        "Confirm password should include at least 8 symbols",
    }),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );
