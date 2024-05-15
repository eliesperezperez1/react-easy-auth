import { LANGUAGE } from "../utils/enums/language.enum";
import { RESPONSIBLE_IDENTITY } from "../utils/enums/responsible-identity.enum";
import { TOPIC } from "../utils/enums/topic.enum";

export interface Catalogue {
  _id: string;
  title: string;
  description: string;
  responsibleIdentity: RESPONSIBLE_IDENTITY;
  topic: string;
  territorialScope: string;
  temporaryCoverage: string;
  organism: string;
  language: LANGUAGE;
  keyWords: string;
  minimumVariables: string;
  contactPerson: string;
  masterData: boolean;
  referenceData: boolean;
  highValue: boolean;
  activeAds: string; // boolean
  comments: string;
  typeGeo: string;
  genderInfo: boolean;
  structuredComments: string;
  associatedApplication: string;
  autoAcess: boolean;
  originComments: string;
  RAT: boolean;
  dataProtection: boolean;
  dataStandards: boolean;
  dataProtectionComments: string;
  dataAnonymize: boolean;
  dataQuality: number;
  sharingLevel: string;
  sharedData: boolean;
  VLCi: boolean;
  ArGIS: boolean;
  Pentaho: boolean;
  CKAN: boolean;
  MongoDB: boolean;
  OpenDataSoft: boolean;
  temporarySolution: string; // ES UNA ENUM PERO NO SABEMOS CUAL
  chargeStateComments: string;
  productData: string;
  productComments: string;
  creationDate: Date;
  deleted: boolean;
  deletedDate: Date;
  lastUpdate: Date;

  /*language: LANGUAGE;
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
  updatedAt?: Date;*/
}

export type CreateCatalogue = Omit<
  Catalogue,
  "_id" | "createdAt" | "updatedAt"
>;

export type UpdateCatalogue = Partial<CreateCatalogue>;
