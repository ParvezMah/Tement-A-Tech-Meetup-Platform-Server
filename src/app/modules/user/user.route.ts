import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { fileUploader } from '../../helpers/fileUploader';
import { UserValidation } from './user.validation';
import roleBasedAuth from '../../middlewares/roleBasedAuth';
import { UserRole } from '@prisma/client';


const router = express.Router()


// Get all users (only ADMIN can access)
router.get(
    "/",
    roleBasedAuth(UserRole.ADMIN),
    UserController.getAllFromDB
);

// Get single user
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  return UserController.getSingleUser(req, res, next);
});

// Public user registration
router.post(
    "/create-user",
    roleBasedAuth(...Object.values(UserRole)),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createUser.parse(JSON.parse(req.body.data));
        return UserController.createUser(req, res, next);
    }
);

router.post(
    "/create-host", 
    roleBasedAuth(UserRole.ADMIN), // Only Admin can create host
    fileUploader.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createHost.parse(JSON.parse(req.body.data));
        return UserController.createHost(req, res, next);
    }
);

// Admin creation route (only SUPER_ADMIN or ADMIN can create)
router.post(
  "/create-admin",
  roleBasedAuth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdmin.parse(JSON.parse(req.body.data));
    return UserController.createAdmin(req, res, next);
  }
);

// Delete user
router.delete("/:id",
  roleBasedAuth(...Object.values(UserRole.ADMIN)), 
  (req: Request, res: Response, next: NextFunction) => {
  return UserController.deleteUser(req, res, next);
});



export const UserRoutes = router