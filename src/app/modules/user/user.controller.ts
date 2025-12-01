import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";
import httpStatus from "http-status";





// USER creation
const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createUser(req);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User created successfully!",
        data: result
    });
});


export const UserController = {
    createUser
};