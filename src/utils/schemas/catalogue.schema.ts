import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LANGUAGE } from '../enums/language.enum';
import { RESPONSIBLE_IDENTITY } from '../enums/responsible-identity.enum';

export type CatalogueDocument = Catalogue & Document;

@Schema({
  timestamps: true,
})
export class Catalogue {
  @Prop()
  _id: string;
  @Prop({ required: true })
  title: string;
  @Prop()
  description: string;
  @Prop()
  responsibleIdentity: RESPONSIBLE_IDENTITY;
  @Prop()
  topic: string;
  @Prop()
  territorialScope: string;
  @Prop()
  temporaryCoverage: string;
  @Prop()
  organism: string;
  @Prop({ required: true })
  language: LANGUAGE;
  @Prop()
  keyWords: string;
  @Prop()
  minimumVariables: string;
  @Prop()
  contactPerson: string;
  @Prop()
  masterData: boolean;
  @Prop()
  referenceData: boolean;
  @Prop()
  highValue: boolean;
  @Prop()
  activeAds: string; // boolean
  @Prop()
  comments: string;
  @Prop()
  typeGeo: string;
  @Prop()
  genderInfo: boolean;
  @Prop()
  structuredComments: string;
  @Prop()
  associatedApplication: string;
  @Prop()
  autoAcess: boolean;
  @Prop()
  originComments: string;
  @Prop()
  RAT: boolean;
  @Prop()
  dataProtection: boolean;
  @Prop()
  dataStandards: boolean;
  @Prop()
  dataProtectionComments: string;
  @Prop()
  dataAnonymize: boolean;
  @Prop()
  dataQuality: number;
  @Prop()
  sharingLevel: string;
  @Prop()
  sharedData: boolean;
  @Prop()
  VLCi: boolean;
  @Prop()
  ArcGIS: boolean;
  @Prop()
  Pentaho: boolean;
  @Prop()
  CKAN: boolean;
  @Prop()
  MongoDB: boolean;
  @Prop()
  OpenDataSoft: boolean;
  @Prop()
  temporarySolution: string; // ES UNA ENUM PERO NO SABEMOS CUAL
  @Prop()
  chargeStateComments: string;
  @Prop()
  productData: string;
  @Prop()
  productComments: string;
  @Prop()
  creationDate: Date;
  @Prop()
  deleted: boolean;
  @Prop()
  deletedDate: Date;
  @Prop()
  lastUpdate: Date;
  /*   @Prop()
  timmingEffect: string;
  @Prop()
  updateFrequency: string;
  @Prop()
  lastUpdate: Date;
  @Prop()
  format: string;
  @Prop({ required: true, lowercase: true })
  distribution: string;
  @Prop()
  sensitiveInformation: string;
  @Prop()
  isUsing: string;
  @Prop()
  accessType: string;
  @Prop()
  internalRelationship: string;
  @Prop()
  structured: string;
  @Prop()
  georeference: string;
  @Prop()
  creationDate: Date;
  @Prop()
  deleted: boolean;
  @Prop()
  deletedDate: Date;
  @Prop()
  personalData: string;
  @Prop()
  source: string; */
}

export const CatalogueSchema = SchemaFactory.createForClass(Catalogue);