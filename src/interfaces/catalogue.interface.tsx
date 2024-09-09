import { FORMAT } from "../utils/enums/format.enum";
import { GEOGRAPHICAL_INFO } from "../utils/enums/geographical-info.enum";
import { LANGUAGE_FORM } from "../utils/enums/language-form.enum";
import { MINIMUM_VALUE } from "../utils/enums/minimum-value.enum";
import { NO_APPLY } from "../utils/enums/no-apply.enum";
import { ORGANISM } from "../utils/enums/organism.enum";
import { RESPONSIBLE_IDENTITY } from "../utils/enums/responsible-identity.enum";
import { SHARING_LEVEL } from "../utils/enums/sharing-level.enum";
import { TOPIC } from "../utils/enums/topic.enum";
import { UPDATE_FREQUENCY } from "../utils/enums/update-frequency.enum";

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
  keyWords: string[];
  minimumVariables: MINIMUM_VALUE | undefined;
  contactPerson: string;
  masterData: boolean;
  referenceData: boolean;
  highValue: boolean;
  activeAds: boolean; // boolean
  comments: string;
  typeGeo: GEOGRAPHICAL_INFO;
  format: string[];
  genderInfo: NO_APPLY | undefined;
  structuredComments: string;
  associatedApplication: string;
  autoAcess: boolean;
  originComments: string;
  RAT: NO_APPLY | undefined;
  dataProtection: NO_APPLY | undefined;
  dataStandards: NO_APPLY | undefined;
  dataProtectionComments: string;
  dataAnonymize: string[];
  dataQuality: number | null;
  sharingLevel: SHARING_LEVEL;
  sharedData: boolean;
  VLCi: boolean;
  ArcGIS: boolean;
  Pentaho: boolean;
  CKAN: boolean;
  MongoDB: boolean;
  OpenDataSoft: boolean;
  temporarySolution: UPDATE_FREQUENCY;
  chargeStateComments: string;
  productData: string;
  productComments: string;
  deleted: boolean;
  deletedDate: Date;
  verified: boolean;
}

export type CreateCatalogue = Omit<
  Catalogue,
  "_id" | "createdAt" | "updatedAt"
>;

export type UpdateCatalogue = Partial<CreateCatalogue>;
