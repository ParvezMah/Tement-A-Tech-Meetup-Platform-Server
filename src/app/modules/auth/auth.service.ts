

import bcrypt from "bcryptjs";
import prisma from "../../shared/prisma";
import { UserStatus } from "@prisma/client";

const login = async (payload: { email: string, password: string }) => {
    const user = await prisma.user.findFirstOrThrow({
        where: {
            email: payload.email,
            userStatus: UserStatus.ACTIVE
        }
    })

    const isCorrectPassword = await bcrypt.compare(payload.password, user.password);
    if (!isCorrectPassword) {
        throw new Error("Password is incorrect!")
    }
}

export const AuthService = {
    login
}