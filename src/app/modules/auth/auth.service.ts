

import bcrypt from "bcryptjs";
import prisma from "../../shared/prisma";
import { UserStatus } from "@prisma/client";
import { jwtHelper } from "../../helpers/jwtHelpers";
import config from "../../../config";

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

    
    const accessToken = jwtHelper.generateToken({ email: user.email, role: user.role }, config.jwt.jwt_secret as string, config.jwt.expires_in as string);

    const refreshToken = jwtHelper.generateToken({ email: user.email, role: user.role }, config.jwt.refresh_token_secret as string, config.jwt.reset_pass_token_expires_in as string);

    return {
        accessToken,
        refreshToken,
        needPasswordChange: user.needPasswordChange
    }
}


const getMe = async (userSesstion: any) => {
    const email = userSesstion.email;
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            needPasswordChange: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    if (!user) {
        throw new Error("User not found!");
    }

    return user;
};


export const AuthService = {
    login,
    getMe
}