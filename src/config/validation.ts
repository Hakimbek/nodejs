import { CreateUserDto } from "../dto/users/CreateUserDto";
import Joi from "joi";

export const validateUser = (user: CreateUserDto) => {
  const userSchema = Joi.object({
    login: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    age: Joi.number().greater(5).less(100).required(),
  });

  return userSchema.validate(user);
};
