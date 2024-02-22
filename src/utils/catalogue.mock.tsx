import { Catalogue } from "../interfaces/catalogue.interface";
import { LANGUAGE } from "./enums/language.enum";
import { RESPONSIBLE_IDENTITY } from "./enums/responsible-identity.enum";
import { TOPIC } from "./enums/topic.enum";

export const catalogueMock: Catalogue = {
  _id: "",
  title: "",
  description: "",
  language: LANGUAGE.ES,
  territorialScope: "",
  temporaryCoverage: "",
  updateFrequency: "",
  topic: TOPIC.AMBIENT,
  lastUpdate: new Date(),
  format: "",
  distribution: "",
  sensitiveInformation: "",
  isUsing: "",
  accessType: "",
  internalRelationship: "",
  contactPerson: "",
  structured: "",
  associatedApplication: "",
  georeference: "",
  comments: "",
  timmingEffect: "",
  creationDate: new Date(),
  deleted: false,
  deletedDate: new Date(),
  personalData: "",
  activeAds: "",
  source: "",
  responsibleIdentity: RESPONSIBLE_IDENTITY.GENERAL,
};
