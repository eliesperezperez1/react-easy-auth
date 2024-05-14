import { User } from "../interfaces/user.interface";
import { LANGUAGE } from "../utils/enums/language.enum";
import { RESPONSIBLE_IDENTITY } from "../utils/enums/responsible-identity.enum";
import { ROLE } from "../utils/enums/role.enum";
import { THEMEAPP } from "./enums/themeApp.enum";

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
  themeApp: THEMEAPP.LI,
  deleted: false,
};
