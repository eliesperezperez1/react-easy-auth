import { RESPONSIBLE_IDENTITY } from "../utils/enums/responsible-identity.enum";
import { TOPIC } from "../utils/enums/topic.enum";

export interface Entity {
  _id: string;
  responsibleIdentity: RESPONSIBLE_IDENTITY;
  contactPerson: string;
  location: string;
  telephone: string;
  email: string;
  topic: TOPIC;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateEntity = Omit<Entity, "_id" | "createdAt" | "updatedAt">;

export type UpdateEntity = Partial<CreateEntity>;
