import { GEOGRAPHICAL_INFO } from "../utils/enums/geographical-info.enum";
import { LANGUAGE_FORM } from "../utils/enums/language-form.enum";
import { MINIMUM_VALUE } from "../utils/enums/minimum-value.enum";
import { ORGANISM } from "../utils/enums/organism.enum";
import { RESPONSIBLE_IDENTITY } from "../utils/enums/responsible-identity.enum";
import { SHARING_LEVEL } from "../utils/enums/sharing-level.enum";
import { TOPIC } from "../utils/enums/topic.enum";

export interface Catalogue {
  _id: string;
  title: string;
  description: string;
  responsibleIdentity: RESPONSIBLE_IDENTITY;
  topic: TOPIC;
  territorialScope: string;
  temporaryCoverage: string;
  organism: ORGANISM;
  language: LANGUAGE_FORM;
  keyWords: string;
  minimumVariables: MINIMUM_VALUE;
  contactPerson: string;
  masterData: boolean;
  referenceData: boolean;
  highValue: boolean;
  activeAds: boolean; // boolean
  comments: string;
  typeGeo: GEOGRAPHICAL_INFO;
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
  sharingLevel: SHARING_LEVEL;
  sharedData: boolean;
  VLCi: boolean;
  ArcGIS: boolean;
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
}

export type CreateCatalogue = Omit<
  Catalogue,
  "_id" | "createdAt" | "updatedAt"
>;

export type UpdateCatalogue = Partial<CreateCatalogue>;
