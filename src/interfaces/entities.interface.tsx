export interface Entity{
    _id: string;
    responsibleIdentity: string;
    contactPerson: string;
    location: string;
    telephone: string;
    email: string;
    topic: string;
    deleted: boolean;
    deletedDate: Date;
    lastUpdate: Date;
    creationDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
    
}

export type CreateEntity = Omit<
  Entity,
  "_id" | "createdAt" | "updatedAt"
>;

export type UpdateEntity = Partial<CreateEntity>;