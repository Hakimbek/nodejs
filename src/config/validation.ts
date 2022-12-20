import { CreateUserDto } from "../dto/users/CreateUserDto";
import Joi from "joi";

export const validateUser = (user: CreateUserDto) => {
  const userSchema = Joi.object({
    login: Joi.string().min(3).required(),
    password: Joi.string()
      .min(8)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    age: Joi.number().greater(4).less(130).required(),
  });

  return userSchema.validate(user);
};
