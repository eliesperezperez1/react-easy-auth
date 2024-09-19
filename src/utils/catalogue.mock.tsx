import { RESPONSIBLE_IDENTITY } from './enums/responsible-identity.enum';
import { LANGUAGE_FORM } from './enums/language-form.enum';
import { Catalogue } from '../interfaces/catalogue.interface';
import { SHARING_LEVEL } from './enums/sharing-level.enum';
import { MINIMUM_VALUE } from './enums/minimum-value.enum';
import { NO_APPLY } from "../utils/enums/no-apply.enum";
import { TOPIC } from './enums/topic.enum';
import { ORGANISM } from './enums/organism.enum';
import { GEOGRAPHICAL_INFO } from './enums/geographical-info.enum';
import { UPDATE_FREQUENCY } from './enums/update-frequency.enum';
import { FORMAT } from './enums/format.enum';

export const catalogueMock: Catalogue = {
  _id: '',
  title: '',
  description: '',
  responsibleIdentity: RESPONSIBLE_IDENTITY.accio_cultural,
  topic: TOPIC.ciencia,
  temporaryCoverage: '',
  organism: ORGANISM.alcaldia,
  language: LANGUAGE_FORM.caES,
  keyWords: [],
  minimumVariables: MINIMUM_VALUE.false,
  contactPerson: '',
  masterData: false,
  referenceData: false,
  highValue: false,
  activeAds: false, // boolean
  comments: '',
  typeGeo: GEOGRAPHICAL_INFO.barrio,
  format: [],
  genderInfo: NO_APPLY.false,
  structuredComments: '',
  associatedApplication: '',
  autoAcess: false,
  originComments: '',
  RAT: NO_APPLY.false,
  dataProtection: NO_APPLY.false,
  dataStandards: NO_APPLY.false,
  dataProtectionComments: '',
  dataAnonymize: [],
  dataQuality: 0,
  sharingLevel: SHARING_LEVEL.open,
  sharedData: false,
  VLCi: false,
  ArcGIS: false,
  Pentaho: false,
  CKAN: false,
  MongoDB: false,
  OpenDataSoft: false,
  temporarySolution: UPDATE_FREQUENCY.daily,
  chargeStateComments: '',
  productData: '',
  productComments: '',
  deleted: false,
  deletedDate: new Date(),
  verified: false,
};