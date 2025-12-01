import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import config from "../../../config";
import prisma from "../../shared/prisma";
import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";



// Create public USER
const createUser = async (req: Request) => {
    const file = req.file;
    const { user, password } = req.body;

    if (file) {
        const uploadedImage = await fileUploader.uploadToCloudinary(file);
        user.profilePhoto = uploadedImage?.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.salt_round));

    const createdUser = await prisma.user.create({
        data: {
            ...user,
            password: hashedPassword,
            role: UserRole.USER,
            needPasswordChange: false
        }
    });

    return createdUser;
};

const getAllFromDB = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            userStatus: true,
            profilePhoto: true, // postman e profilePhoto astese, so lal batti joluk
            createdAt: true,
            updatedAt: true
        }
    });

    return users;
};




export const UserService = {
  createUser,
  getAllFromDB
};