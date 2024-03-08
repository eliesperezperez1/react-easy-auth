import { User } from "../interfaces/user.interface";
import { LANGUAGE } from "./enums/language.enum";
import { RESPONSIBLE_IDENTITY } from "./enums/responsible-identity.enum";
import { ROLE } from "./enums/role.enum";

export const userMock: User = {
  _id: "",
  name: "",
  surname: "",
  email: "",
  username: "",
  password: "",
  language: LANGUAGE.CA,
  role: ROLE.SUPER_ADMIN,
  service: RESPONSIBLE_IDENTITY.GENERAL,
  deleted: false,
};
