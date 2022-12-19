import { UserType } from "../types/user.type";
import { randomUUID } from "crypto";

export const users: UserType[] = [
  {
    id: randomUUID(),
    login: "hakim",
    password: "123456878",
    age: 23,
    isDeleted: false,
  },
  {
    id: randomUUID(),
    login: "orif",
    password: "123456878",
    age: 15,
    isDeleted: false,
  },
  {
    id: randomUUID(),
    login: "nasiba",
    password: "123456878",
    age: 45,
    isDeleted: false,
  },
  {
    id: randomUUID(),
    login: "hurshida",
    password: "123456878",
    age: 20,
    isDeleted: false,
  },
  {
    id: randomUUID(),
    login: "ali",
    password: "123456878",
    age: 18,
    isDeleted: false,
  },
];
