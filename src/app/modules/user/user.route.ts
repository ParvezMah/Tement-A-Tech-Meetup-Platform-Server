import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { fileUploader } from '../../helpers/fileUploader';
import { UserValidation } from './user.validation';


const router = express.Router()


// Get all users (only ADMIN can access)
router.get(
    "/",
    UserController.getAllFromDB
);


// Public user registration
router.post(
    "/create-user",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createUser.parse(JSON.parse(req.body.data));
        return UserController.createUser(req, res, next);
    }
);

router.post(
    "/create-host", // Only Admin can create host
    fileUploader.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createHost.parse(JSON.parse(req.body.data));
        return UserController.createHost(req, res, next);
    }
);


export const UserRoutes = router