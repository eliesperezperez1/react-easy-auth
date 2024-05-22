import { RESPONSIBLE_IDENTITY } from './enums/responsible-identity.enum';
import { LANGUAGE_FORM } from './enums/language-form.enum';
import { Catalogue } from '../interfaces/catalogue.interface';
import { SHARING_LEVEL } from './enums/sharing-level.enum';
import { MINIMUM_VALUE } from './enums/minimum-value.enum';
import { TOPIC } from './enums/topic.enum';
import { ORGANISM } from './enums/organism.enum';
import { GEOGRAPHICAL_INFO } from './enums/geographical-info.enum';

export const catalogueMock: Catalogue = {
  _id: '',
  title: '',
  description: '',
  responsibleIdentity: RESPONSIBLE_IDENTITY.accio_cultural,
  topic: TOPIC.ciencia,
  territorialScope: '',
  temporaryCoverage: '',
  organism: ORGANISM.alcaldia,
  language: LANGUAGE_FORM.val,
  keyWords: '',
  minimumVariables: MINIMUM_VALUE.mo,
  contactPerson: '',
  masterData: false,
  referenceData: false,
  highValue: false,
  activeAds: false, // boolean
  comments: '',
  typeGeo: GEOGRAPHICAL_INFO.barrio,
  genderInfo: false,
  structuredComments: '',
  associatedApplication: '',
  autoAcess: false,
  originComments: '',
  RAT: false,
  dataProtection: false,
  dataStandards: false,
  dataProtectionComments: '',
  dataAnonymize: false,
  dataQuality: 0,
  sharingLevel: SHARING_LEVEL.open,
  sharedData: false,
  VLCi: false,
  ArcGIS: false,
  Pentaho: false,
  CKAN: false,
  MongoDB: false,
  OpenDataSoft: false,
  temporarySolution: '', // ES UNA ENUM PERO NO SABEMOS CUAL
  chargeStateComments: '',
  productData: '',
  productComments: '',
  creationDate: new Date(),
  deleted: false,
  deletedDate: new Date(),
  lastUpdate: new Date(),
};