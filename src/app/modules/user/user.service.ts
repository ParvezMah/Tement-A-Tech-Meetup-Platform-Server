
import bcrypt from "bcryptjs";
import config from "../../../config";
import prisma from "../../shared/prisma";
import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import { AdminAction, UserRole } from "@prisma/client";



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

export const createAdmin = async (req: Request) => {
  // Upload profile photo if file exists
  if (req.file) {
    const uploadedImage = await fileUploader.uploadToCloudinary(req.file);
    req.body.admin.profilePhoto = uploadedImage?.secure_url;
  }

  // Hash password
  const hashPassword = await bcrypt.hash(req.body.password, Number(config.salt_round));

  // Transaction: create User and Admin together
  const result = await prisma.$transaction(async (tx) => {
    // Create User
    const createdUser = await tx.user.create({
      data: {
        name: req.body.admin.name,
        email: req.body.admin.email,
        password: hashPassword,
        role: UserRole.ADMIN,
        needPasswordChange: false,
        profilePhoto: req.body.admin.profilePhoto || null,
      },
    });

    // Create Admin log (optional: depends if you want separate table or not)
    const createdAdmin = await tx.adminLog.create({
      data: {
        name: req.body.admin.name,
        email: req.body.admin.email,
        profilePhoto: req.body.admin.profilePhoto || null,
        contactNumber: req.body.admin.contactNumber || null,
        adminId: createdUser.id,
        action: AdminAction.CREATE_USER, // Or your AdminAction enum
      },
    });

    return { user: createdUser, adminLog: createdAdmin };
  });

  return result;
};

const getAllFromDB = async ({page, limit}: {page:number, limit:number}) => {
    const skip = (page-1)*limit;
    const result = await prisma.user.findMany({skip, take: limit});

    return result;
};

// Get single user by ID
const getSingleUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      userStatus: true,
      profilePhoto: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Delete user by ID
const deleteUser = async (userId : number) => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Delete user
  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });

  return deletedUser;
};


export const UserService = {
  createUser,
  createHost,
  createAdmin,
  getAllFromDB,
  getSingleUser,
  deleteUser
};