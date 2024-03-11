import { LANGUAGE } from "../utils/enums/language.enum";
import { RESPONSIBLE_IDENTITY } from "../utils/enums/responsible-identity.enum";
import { TOPIC } from "../utils/enums/topic.enum";

export interface Catalogue {
  _id: string;
  title: string;
  description: string;
  language: LANGUAGE;
  territorialScope: string;
  temporaryCoverage: string;
  updateFrequency: string;
  topic: TOPIC;
  lastUpdate: Date;
  format: string;
  distribution: string;
  sensitiveInformation: string;
  isUsing: string;
  accessType: string;
  internalRelationship: string;
  contactPerson: string;
  structured: string;
  associatedApplication: string;
  georeference: string;
  comments: string;
  timmingEffect: string;
  creationDate: Date;
  deleted: boolean;
  deletedDate: Date;
  personalData: string;
  activeAds: string;
  source: string;
  responsibleIdentity: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateCatalogue = Omit<
  Catalogue,
  "_id" | "createdAt" | "updatedAt"
>;

export type UpdateCatalogue = Partial<CreateCatalogue>;
