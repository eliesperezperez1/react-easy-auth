export interface Catalogue {
  _id: string;
  title: string;
  description: string;
  language: string;
  territorialScope: string;
  temporaryCoverage: string;
  updateFrequency: string;
  topic: string;
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
  deleteDate: Date;
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
