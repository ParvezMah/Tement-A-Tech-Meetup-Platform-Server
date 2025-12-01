import { z } from "zod";

export const createUser = z.object({
    password: z.string({ error: "Password is required" }),
    user: z.object({
        fullName: z.string({ error: "Full name is required" }),
        email: z.string({ error: "Email is required" }),
        contactNumber: z.string({ error: "Email is required" }),
        address: z.string({ error: "Email is required" })
    })
});


export const UserValidation = {
    createUser
};