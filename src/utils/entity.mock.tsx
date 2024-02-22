import { Entity } from "../interfaces/entity.interface";
import { RESPONSIBLE_IDENTITY } from "./enums/responsible-identity.enum";
import { TOPIC } from "./enums/topic.enum";

export const entityMock: Entity = {
  _id: "",
  responsibleIdentity: RESPONSIBLE_IDENTITY.GENERAL,
  contactPerson: "",
  location: "",
  telephone: "",
  email: "",
  topic: TOPIC.AMBIENT,
  createdAt: new Date(),
  updatedAt: new Date(),
  deleted: false,
};
