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

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdmin(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin created successfully!",
    data: result
  });
});

// Fetch all users (simple)
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const {page, limit, searchTerm, sortBy, sortOrder, role, status} = req.query;

    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 10;

    const users = await UserService.getAllFromDB({page:Number(page), limit: Number(limit), searchTerm, sortBy, sortOrder, role, status});

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users data fetched successfully!",
        data: users
    });
});

// Get single user
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  console.log({userId})
  const user = await UserService.getSingleUser(Number(userId));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully!",
    data: user,
  });
});

// Delete user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id; // string (UUID or number)
  const deletedUser = await UserService.deleteUser(Number(userId));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully!",
    data: deletedUser,
  });
});



export const UserController = {
  createUser,
  createHost,
  createAdmin,
  getAllFromDB,
  getSingleUser,
  deleteUser
};
