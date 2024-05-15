import { RESPONSIBLE_IDENTITY } from './enums/responsible-identity.enum';
import { Catalogue } from './schemas/catalogue.schema';
import { LANGUAGE } from './enums/language.enum';

export const catalogueMock: Catalogue = {
  /*   title: '',
  description: '',
  language: LANGUAGE.ES,
  territorialScope: '',
  temporaryCoverage: '',
  updateFrequency: '',
  topic: '',
  lastUpdate: new Date(),
  format: '',
  distribution: '',
  sensitiveInformation: '',
  isUsing: '',
  accessType: '',
  internalRelationship: '',
  contactPerson: '',
  structured: '',
  associatedApplication: '',
  georeference: '',
  comments: '',
  timmingEffect: '',
  creationDate: new Date(),
  deleted: false,
  deletedDate: new Date(),
  personalData: '',
  activeAds: '',
  source: '',
  responsibleIdentity: RESPONSIBLE_IDENTITY.GENERAL, */
  title: '',
  description: '',
  responsibleIdentity: RESPONSIBLE_IDENTITY.ACTIVITATS,
  topic: '',
  territorialScope: '',
  temporaryCoverage: '',
  organism: '',
  language: LANGUAGE.CA,
  keyWords: '',
  minimumVariables: '',
  contactPerson: '',
  masterData: false,
  referenceData: false,
  highValue: false,
  activeAds: '', // boolean
  comments: '',
  typeGeo: '',
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
  sharingLevel: '',
  sharedData: false,
  VLCi: false,
  ArGIS: false,
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