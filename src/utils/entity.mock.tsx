import { Entity } from "../interfaces/entities.interface";

export const entityMock: Entity = {
    _id:"",
    responsibleIdentity: "",
    contactPerson: "",
    location: "",
    telephone: "",
    email: "",
    topic: "",
    deleted: false,
    deletedDate: new Date(),
    lastUpdate: new Date(),
    creationDate: new Date(),
};