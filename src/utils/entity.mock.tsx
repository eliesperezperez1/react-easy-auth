import { Entity } from "../interfaces/entity.interface";

export const entityMock: Entity = {
  _id: "",
  responsibleIdentity: "",
  contactPerson: "",
  location: "",
  telephone: "",
  email: "",
  topic: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  deleted: false,
};
