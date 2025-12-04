import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";



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


const createHost = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createHost(req);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Host created successfully!",
        data: result
    });
});

// Fetch all users (simple)
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const users = await UserService.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users data fetched successfully!",
        data: users
    });
});



export const UserController = {
    createUser,
    createHost,
    getAllFromDB
};