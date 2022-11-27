import { Role } from "../models/Role";

export class User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    creationDate: Date;
    email: string;
    roles: Role[];
}
