import { z } from "zod";

export const createUser = z.object({
    password: z.string({ error: "Password is required" }),
    user: z.object({
        name: z.string({ error: "Full name is required" }),
        email: z.string({ error: "Email is required" }),
        contactNumber: z.string({ error: "Email is required" }),
        address: z.string({ error: "Email is required" })
    })
});


export const createHost = z.object({
  password: z.string({
    error: "Password is required",
  }),
  host: z.object({
    name: z.string({ error: "Name is required!" }),
    email: z.string({ error: "Email is required!" }),
    userId: z.number({ error: "User ID is required!" }),
    bio: z.string().optional(),
    rating: z
      .number()
      .min(0, { message: "Rating cannot be negative" })
      .max(5, { message: "Rating cannot exceed 5" })
      .optional(),
    verified: z.boolean().optional(),
    contactNumber: z.string().optional(),
    address: z.string({ error: "Address is required!" }), // required
    profilePhoto: z.string().url().optional(), // optional, must be a URL if provided
  }),
});

export const UserValidation = {
    createUser,
    createHost
};