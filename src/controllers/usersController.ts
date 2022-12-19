import express, { Request, Response } from "express";
import { users } from "../db/users";
import {
  RequestWithBody,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "../types/request.type";
import { QueryUsersDto } from "../dto/users/QueryUsersDto";
import { CreateUserDto } from "../dto/users/CreateUserDto";
import { ApiResult } from "../dto/ApiResult";
import { validateUser } from "../config/validation";
import { UpdateUserDto } from "../dto/users/UpdateUserDto";
import { UserViewDto } from "../dto/users/UserViewDto";
import { randomUUID } from "crypto";

const usersController = express.Router();

// Get all users
usersController.get("/users", (req: Request, res: Response<UserViewDto[]>) => {
  const usersList = users
    .filter((user) => !user.isDeleted)
    .map((user) => {
      return {
        id: user.id,
        login: user.login,
        age: user.age,
      };
    });
  res.status(200).send(usersList);
});

// Get users filtered by query param
usersController.get(
  "/getAutoSuggestUsers",
  (req: RequestWithQuery<QueryUsersDto>, res: Response<UserViewDto[]>) => {
    const { limit, loginSubstring } = req.query;
    const autoSuggestedUsers = users
      .filter((user) => user.login.includes(loginSubstring) && !user.isDeleted)
      .sort((a, b) => a.login.localeCompare(b.login))
      .slice(0, +limit)
      .map((user) => {
        return {
          id: user.id,
          login: user.login,
          age: user.age,
        };
      });
    res.status(200).json(autoSuggestedUsers);
  }
);

// Get user by id
usersController.get(
  "/users/:id",
  (req: Request<{ id: string }>, res: Response<ApiResult>) => {
    const id = req.params.id;
    users.forEach((user) => {
      if (user.id === id && !user.isDeleted) {
        return res.status(200).json({
          success: true,
          message: `User with id=${id} is found`,
          data: {
            id: user.id,
            login: user.login,
            age: user.age,
          },
        });
      }
    });

    return res.status(404).json({
      success: false,
      message: `User with id=${id} is not found`,
    });
  }
);

// Add user
usersController.post(
  "/users",
  (req: RequestWithBody<CreateUserDto>, res: Response<ApiResult>) => {
    const valid = validateUser(req.body);

    if (valid.error != null) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        data: valid.error.message,
      });
      return;
    }

    const { login, password, age } = req.body;
    users.push({
      id: randomUUID(),
      login,
      password,
      age,
      isDeleted: false,
    });
    res.status(201).json({
      success: true,
      message: "User successfully added",
    });
  }
);

// Delete user
usersController.delete(
  "/users/:id",
  (req: Request<{ id: string }>, res: Response<ApiResult>) => {
    users.find((user) => {
      if (user.id === req.params.id) {
        if (user.isDeleted) {
          return res.status(404).json({
            success: false,
            message: "User already deleted",
          });
        }

        user.isDeleted = true;
        return res.status(200).json({
          success: true,
          message: "User deleted successfully",
        });
      }
      return res.status(404).json({
        success: false,
        message: `User with id=${req.params.id} not found`,
      });
    });
  }
);

// Edit user
usersController.put(
  "/users/:id",
  (
    req: RequestWithParamsAndBody<{ id: string }, UpdateUserDto>,
    res: Response<ApiResult>
  ) => {
    const valid = validateUser(req.body);

    if (valid.error != null) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        data: valid.error.message,
      });
    }

    const { login, password, age } = req.body;
    const id = req.params.id;
    users.forEach((user) => {
      if (user.id === id) {
        if (user.isDeleted) {
          return res.status(404).json({
            success: false,
            message: "User already deleted",
          });
        }

        user.login = login;
        user.password = password;
        user.age = age;
        return res.status(200).json({
          success: true,
          message: "User successfully edited",
        });
      }
    });

    res.status(404).json({
      success: false,
      message: `User with id=${id} not found`,
    });
  }
);

export default usersController;
