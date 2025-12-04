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

export const createHost = async (req: Request) => {
  // 1. Upload the profile photo to Cloudinary if a file is provided
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.host.profilePhoto = uploadResult?.secure_url;
  }

  // 2. Hash the password for security
  const hashPassword = await bcrypt.hash(req.body.password, Number(10)); // or your config salt_round

  // 3. Use a transaction to create both User and Host
  const result = await prisma.$transaction(async (tx) => {
    // Create a record in the User table
    const createdUser = await tx.user.create({
      data: {
        name: req.body.host.name,
        email: req.body.host.email,
        password: hashPassword,
        role: UserRole.HOST,
        needPasswordChange: false,
        profilePhoto: req.body.host.profilePhoto || null,
      },
    });

    // Create a record in the Host table
    const createdHost = await tx.host.create({
      data: {
        userId: createdUser.id,
        name: req.body.host.name,
        email: req.body.host.email,
        bio: req.body.host.bio,
        rating: req.body.host.rating,
        verified: req.body.host.verified || false,
        contactNumber: req.body.host.contactNumber || null, // ← added
        address: req.body.host.address || "", // ✅ Provide a default if missing
      },
    });

    // Return host info (you can also include user info if needed)
    return createdHost;
  });

  return result;
};


const getAllFromDB = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
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
  createHost,
  getAllFromDB
};